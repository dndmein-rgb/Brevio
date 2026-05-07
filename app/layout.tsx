import type { Metadata } from "next";
import { Source_Sans_3 as FontSans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "Brevio - AI-Powered PDF Summarization",
  description: "Save hours of reading time. Transform lenghty PDFs into clear, accurate summaries in seconds with our advanced AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className="relative min-h-full flex flex-col">
        <Header  />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" />
        </body>
    </html>
    </ClerkProvider>
  );
}
