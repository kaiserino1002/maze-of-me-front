// ランダムな雲っぽいパスを生成
export function generateRandomBlobPath(x: number, y: number, r: number, points = 12): string {
  const angleStep = (Math.PI * 2) / points
  let path = ""
  let firstX = 0, firstY = 0
  let prevX = 0, prevY = 0

  for (let i = 0; i <= points; i++) {
    const angle = i * angleStep
    const radius = r * (0.8 + Math.random() * 0.4)
    const px = x + Math.cos(angle) * radius
    const py = y + Math.sin(angle) * radius

    if (i === 0) {
      path += `M ${px.toFixed(1)} ${py.toFixed(1)} `
      firstX = px
      firstY = py
    } else {
      const cx = (prevX + px) / 2
      const cy = (prevY + py) / 2
      path += `Q ${prevX.toFixed(1)} ${prevY.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)} `
    }
    prevX = px
    prevY = py
  }
  path += `Q ${prevX.toFixed(1)} ${prevY.toFixed(1)} ${firstX.toFixed(1)} ${firstY.toFixed(1)} Z`
  return path
}
