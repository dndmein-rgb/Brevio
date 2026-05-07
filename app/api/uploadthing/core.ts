import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();



export const ourFileRouter = {
  // Define a route for PDF uploads
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    // Middleware runs on your server before the upload happens
    .middleware(async () => {
      const { userId } = await auth();

      console.log("userId:", userId);

      if (!userId) {
        throw new UploadThingError("You must be logged in to upload files");
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after the upload is successful
      console.log("Upload completed for user id:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      // Return value is sent to the client-side onClientUploadComplete callback
     return {     userId: metadata.userId,
    fileUrl: file.ufsUrl,
    fileName: file.name,
    fileSize: file.size,
 };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;