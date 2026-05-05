"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-from-input";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File must be lessa than 20MB ",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF",
    ),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading");
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      return;
    }

    toast.loading("📄Uploading PDF", {
      description: "Hang tight! Our AI is reading through your document!✨",
    });

    //upload the file to uploadthing
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Something went wrong", {
        description: "Please use a different file",
      });
      return;
    }
    toast.loading("📄Uploading PDF", {
      description: "We are uploading your PDF!✨",
    });
  };
  return (
    <div className="flex flex-col w-full gap-8 max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
