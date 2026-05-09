export const parseSelection = (section: string): { title: string; points: string[] } => {
  const lines = section.split("\n").map(l => l.trim()).filter(Boolean);

  const title = lines[0].startsWith("#") ? lines[0].replace(/^#+\s*/, '') : "Section";

  const points = lines.slice(1);

  return { title, points };
};


export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);

  // Replace the Unicode property escape with a simpler emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;

  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}
export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[•]\s*/, "").trim();

  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}