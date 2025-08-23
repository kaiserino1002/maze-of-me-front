export function generateCloudPath(width: number, height: number): string {
  const steps = 16
  const angleStep = (2 * Math.PI) / steps
  const radiusX = width / 2
  const radiusY = height / 2

  let points: { x: number; y: number }[] = []

  for (let i = 0; i < steps; i++) {
    const angle = i * angleStep
    const jitterX = radiusX * (0.9 + Math.random() * 0.2)
    const jitterY = radiusY * (0.9 + Math.random() * 0.2)
    const x = Math.cos(angle) * jitterX
    const y = Math.sin(angle) * jitterY
    points.push({ x, y })
  }

  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)} `
  for (let i = 0; i < points.length; i++) {
    const p0 = points[(i - 1 + points.length) % points.length]
    const p1 = points[i]
    const p2 = points[(i + 1) % points.length]
    const p3 = points[(i + 2) % points.length]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    path += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `
  }
  path += "Z"

  return path
}
