/**
 * Scribble Hub Formatter Utility
 * Formats Apocrypha DXD: ForeverWorlds chapter manuscripts for direct pasting
 * into Scribble Hub's chapter editor (supporting Rich Text / HTML, BBCode, and Clean Plain Text).
 */

export interface ScribbleHubChapterPackage {
  chapterTitle: string;
  topAuthorNote: string;
  bodyHtml: string;
  bodyBBCode: string;
  bodyCleanText: string;
  bottomAuthorNote: string;
  wordCount: number;
  readingTimeMinutes: number;
}

/**
 * Converts chapter markdown into clean Scribble Hub HTML, BBCode, and Plain Text.
 */
export function formatForScribbleHub(
  title: string,
  rawContent: string,
  chapterNumber?: number | string
): ScribbleHubChapterPackage {
  // Clean markdown or plain chapter headers at top if already in title
  let content = rawContent.trim();
  content = content.replace(/^#?\s*Chapter\s+\d+.*?\n+/i, '');

  const words = content.split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.round(words / 250));

  // Top Author's Note template
  const numStr = chapterNumber !== undefined ? `Chapter ${chapterNumber}` : title;
  const topAuthorNote = `${numStr} of Apocrypha DXD: ForeverWorlds.\nThank you for reading and for your patience. Enjoy the chapter!`;

  // Bottom Author's Note template
  const bottomAuthorNote = `---
Word count: ${words.toLocaleString()} words (~${readingTimeMinutes} min read).
Thank you for reading Apocrypha DXD: ForeverWorlds on Scribble Hub!
If you enjoyed this chapter, please consider leaving a rating, adding the story to your library, or sharing your thoughts in the comments below.`;

  // Process paragraphs & scene dividers
  const rawSections = content.split(/\n\s*\*\*\*\s*\n|\n\s*---\s*\n/);

  // 1. Generate Scribble Hub HTML
  const htmlSections = rawSections.map((section) => {
    const paragraphs = section
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    return paragraphs
      .map((p) => {
        // Convert markdown italics (*text* or _text_) to <em>text</em>
        let formatted = p.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/_([^_]+)_/g, '<em>$1</em>');
        // Convert bold (**text**) to <strong>text</strong>
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return `<p>${formatted}</p>`;
      })
      .join('\n');
  });

  const bodyHtml = htmlSections.join(
    '\n<p style="text-align: center; margin: 2rem 0; font-weight: bold; letter-spacing: 0.2em;">* * *</p>\n'
  );

  // 2. Generate Scribble Hub BBCode
  const bbcodeSections = rawSections.map((section) => {
    const paragraphs = section
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    return paragraphs
      .map((p) => {
        let formatted = p.replace(/\*([^*]+)\*/g, '[i]$1[/i]');
        formatted = formatted.replace(/_([^_]+)_/g, '[i]$1[/i]');
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '[b]$1[/b]');
        return formatted;
      })
      .join('\n\n');
  });

  const bodyBBCode = bbcodeSections.join('\n\n[center][b]* * *[/b][/center]\n\n');

  // 3. Generate Clean Web-Novel Plain Text
  const bodyCleanText = rawSections
    .map((section) => {
      const paragraphs = section
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean);
      return paragraphs.join('\n\n');
    })
    .join('\n\n        * * *\n\n');

  return {
    chapterTitle: title,
    topAuthorNote,
    bodyHtml,
    bodyBBCode,
    bodyCleanText,
    bottomAuthorNote,
    wordCount: words,
    readingTimeMinutes,
  };
}
