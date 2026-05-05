import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Mock function for getting the current user - replace with your actual auth logic (e.g., Clerk, NextAuth)
const currentUser = async () => ({ id: "fake-user-id" }); 

export const ourFileRouter = {
  // Define a route for PDF uploads
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    // Middleware runs on your server before the upload happens
    .middleware(async ({ req }) => {
      const user = await currentUser();

      // If no user is found, throw an error to prevent the upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after the upload is successful
      console.log("Upload completed for user id:", metadata.userId);
      console.log("File URL:", file.ufsUrl);

      // Return value is sent to the client-side onClientUploadComplete callback
     return { userId: metadata.userId, file } as any;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;