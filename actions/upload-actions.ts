"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPDFText } from "@/lib/langchain";
import { generatePDFSummaryFromOpenAI } from "@/lib/openai";

type UploadResponse = {
  serverData: {
    userId: string;
    fileUrl: string;
    fileName: string;
  };
};

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

      return {
        success: true,
        message: "Summary generated successfully",
        data: {
          userId,
          fileName,
          pdfUrl,
          summary,
        },
      };
    } catch (error) {
      console.error("OpenAI error:", error);
      if (
        error instanceof Error &&
        error.message === "RATE_LIMIT_EXCEEDED"
      ) {
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
            geminiError
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
