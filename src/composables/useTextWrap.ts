// テキストを折り返して配列に
export function wrapText(text: string, maxChars = 12): string[] {
  const result: string[] = []
  for (let i = 0; i < text.length; i += maxChars) {
    result.push(text.slice(i, i + maxChars))
  }
  return result
}