import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async () => {
      const { userId } = await auth();
      console.log("✓ Middleware: userId =", userId);

      if (!userId) {
        throw new UploadThingError("You must be logged in to upload files");
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("✓ onUploadComplete: Starting");
        console.log("  userId:", metadata.userId);
        console.log("  fileUrl:", file.ufsUrl);
        console.log("  fileName:", file.name);

        const result = {
          userId: metadata.userId,
          fileUrl: file.ufsUrl,
          fileName: file.name,
          fileSize: file.size,
        };

        console.log("✓ onUploadComplete: Returning", result);
        return result;
      } catch (err) {
        console.error("✗ onUploadComplete error:", err);
        throw err;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;