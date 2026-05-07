export function formatFileNameAsTitle(fileName: string): string {
  // Remove extension
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");

  const withSpaces = withoutExtension
    .replace(/[_-]+/g, " ") // Replace dashes/underscores
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Space between camelCase

  // Title Case
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .trim();
}
