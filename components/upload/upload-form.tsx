"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-from-input";
import { z } from "zod";
import { toast } from "sonner";
import {
  generatePDFSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File must be less than 20MB ",
    )
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Upload error:", err);
      toast.error("Error occurred while uploading", {
        description: err.message || "Please try again",
      });
    },
    onUploadBegin: (fileName: string) => {
      console.log("Upload has begun for", fileName);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;
      //validating the file
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error("❌Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid File",
        });
        setIsLoading(false);
        return;
      }

      toast("📄Uploading PDF...", {
        description: "We are uploading your PDF!✨",
      });

      //upload the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }
      toast("Processing PDF", {
        description: "Hang tight! Our AI is reading through your document!✨",
      });
      //parse the pdf using lang chain
      const result = await generatePDFSummary(resp);
      console.log({ result });
      const { data = null, message = null, success = false } = result || {};
      if (success && data) {
        toast.success("✨ Summary generated!", {
          description: "Your PDF has been processed successfully!",
        });

        let storeResult: any = null;
        if (data?.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: resp[0].serverData.fileUrl,
            title: data.fileName,
            fileName: file.name,
            userId: data.userId,
          });

          if (storeResult?.success && storeResult?.id) {
            toast.success("✨ Summary saved!", {
              description: "Your PDF has been processed and saved!",
            });
            formRef.current?.reset();
            router.push(`/summaries/${storeResult.id}`);
          } else {
            toast.warning("Summary generated but not saved", {
              description: "You can still view your summary",
            });
            formRef.current?.reset();
          }
        }
      } else {
        toast.error("Failed to generate summary", {
          description: message || "Please try again",
        });
        formRef.current?.reset();
      }

      setIsLoading(false);
    } catch (error) {
      formRef.current?.reset();
      setIsLoading(false);
      console.error("Error occurred", error);
      toast.error("An error occurred", {
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full gap-8 max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
