"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPDFText } from "@/lib/langchain";
import { generatePDFSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type UploadResponse = {
  serverData: {
    userId: string;
    fileUrl: string;
    fileName: string;
  };
};
interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  fileName: string;
  summary: string;
  title: string;
}

export async function generatePDFSummary(uploadResponse: UploadResponse[]) {
  if (!uploadResponse?.length) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: { userId, fileUrl: pdfUrl, fileName },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "No URL provided",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPDFText(pdfUrl);

    if (!pdfText || pdfText.trim().length === 0) {
      return {
        success: false,
        message: "No text content found in PDF",
        data: null,
      };
    }

    console.log({ pdfText });
    let summary;

    try {
      summary = await generatePDFSummaryFromOpenAI(pdfText);

      if (!summary) {
        throw new Error("Empty summary from OpenAI");
      }

      console.log({ summary });
      const formattedFileName = formatFileNameAsTitle(fileName);

      return {
        success: true,
        message: "Summary generated successfully",
        data: {
          userId,
          fileName,
          pdfUrl,
          summary,
          formattedFileName,
        },
      };
    } catch (error) {
      console.error("OpenAI error:", error);
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);

          if (!summary) {
            throw new Error("Empty summary from Gemini");
          }

          return {
            success: true,
            message: "Summary generated successfully (via Gemini)",
            data: {
              userId,
              fileName,
              pdfUrl,
              summary,
            },
          };
        } catch (geminiError) {
          console.error(
            "Gemini API failed after OpenAI quota exceeded",
            geminiError,
          );
          return {
            success: false,
            message: "Failed to generate summary with available AI providers",
            data: null,
          };
        }
      }
      throw error;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("PDF processing error:", errorMessage, error);

    return {
      success: false,
      message: `Failed to process PDF: ${errorMessage}`,
      data: null,
    };
  }
}


async function savePdfSummary({
  userId,
  fileUrl,
  fileName,
  summary,
  title,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    const result = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING id,summary_text
    `;

    return {
      success: true,
      data: { summary, title, id: result[0]?.id },
    };
  } catch (error) {
    console.error("Error saving PDF summary", error);
    throw error;
  }
}
export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const { userId: authUserId } = await auth();

    if (!authUserId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const cleanTitle = fileName.replace(/\.[^/.]+$/, "");
    const savedSummary = await savePdfSummary({
      userId: authUserId,
      fileUrl,
      summary,
      title:cleanTitle,
      fileName,
    });

    if (!savedSummary.success) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again",
      };
    }

    revalidatePath(`/summaries/${savedSummary.data.id}`);

    return {
      success: true,
      message: "PDF summary saved successfully",
      id: savedSummary.data.id,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }
}
