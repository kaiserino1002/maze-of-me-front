import type { Node, Link } from "@/stores/node"

// 時系列リンク
function generateChronologicalLinks(nodes: Node[]): Link[] {
  const sorted = [...nodes].sort(
    (a, b) =>
      new Date(a.created_at ?? "").getTime() -
      new Date(b.created_at ?? "").getTime()
  )
  const links: Link[] = []
  for (let i = 0; i < sorted.length - 1; i++) {
    links.push({ source: sorted[i].id, target: sorted[i + 1].id })
  }
  return links
}

// 感情リンク
function generateEmotionLinks(nodes: Node[]): Link[] {
  const links: Link[] = []
  const grouped: Record<string, Node[]> = {}

  nodes.forEach((n) => {
    const emo = n.analysis?.dominantEmotion ?? "neutral"
    if (!grouped[emo]) grouped[emo] = []
    grouped[emo].push(n)
  })

  Object.values(grouped).forEach((group) => {
    group.sort(
      (a, b) =>
        new Date(a.created_at ?? "").getTime() -
        new Date(b.created_at ?? "").getTime()
    )
    for (let i = 0; i < group.length - 1; i++) {
      links.push({ source: group[i].id, target: group[i + 1].id })
    }
  })

  return links
}

export function useLinkGenerator(nodes: Node[]): Link[] {
  const chronoLinks = generateChronologicalLinks(nodes)
  const emoLinks = generateEmotionLinks(nodes)
  return [...chronoLinks, ...emoLinks]
}
