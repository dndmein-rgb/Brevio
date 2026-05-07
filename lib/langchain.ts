export async function fetchAndExtractPDFText(fileUrl: string) {
  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Simple PDF text extraction - look for text streams in PDF
    const text = extractTextFromPDFBuffer(uint8Array);

    if (!text || text.trim().length === 0) {
      throw new Error("No content extracted from PDF");
    }

    return text;
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw error;
  }
}

function extractTextFromPDFBuffer(buffer: Uint8Array): string {
  try {
    // Convert buffer to string
    const str = new TextDecoder("latin1").decode(buffer);

    // Extract text between BT and ET operators (PDF text operators)
    const textRegex = /BT[\s\S]*?ET/g;
    const matches = str.match(textRegex) || [];

    let extractedText = "";

    for (const match of matches) {
      // Extract text from Tj and TJ operators
      const textMatches = match.match(/\((.*?)\)/g) || [];
      for (const textMatch of textMatches) {
        const cleanText = textMatch
          .slice(1, -1)
          .replace(/\\/g, "")
          .replace(/[^\x20-\x7E\n\r\t]/g, "");
        extractedText += cleanText + " ";
      }
    }

    return extractedText || "Unable to extract text from PDF";
  } catch (error) {
    console.error("Text extraction error:", error);
    return "Unable to extract text from PDF";
  }
}