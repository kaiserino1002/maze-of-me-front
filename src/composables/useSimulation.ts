import * as d3 from "d3"

export function useSimulation() {
  let simulation: d3.Simulation<any, any> | null = null
  let nodes: any[] = []
  let links: any[] = []

  function init(rawNodes: any[], rawLinks: any[], onTick: (nodes:any[])=>void) {
    nodes = rawNodes.map(n => ({ ...n }))
    links = rawLinks.map(l => ({ ...l }))

    // デフォ固定
    nodes.forEach((n,i) => { n.fx = n.x; n.fy = n.y })

    simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d:any)=>d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(400,300))
      .alphaDecay(0.05)
      .on("tick", () => onTick(nodes))

    simulation.alpha(0).stop()
    return { nodes, links }
  }

  function addEmotionForces(getCenter:(n:any)=>{x:number;y:number}) {
    simulation
      ?.force("emotionX", d3.forceX((d:any)=>getCenter(d).x).strength(0.06))
      .force("emotionY", d3.forceY((d:any)=>getCenter(d).y).strength(0.06))
  }

  async function relaxSubset(filter:(n:any)=>boolean, maxTicks=120, minAlpha=0.03) {
    if (!simulation) return
    nodes.forEach(n => { if (filter(n)) { n.fx=null; n.fy=null } else { n.fx=n.x; n.fy=n.y } })
    simulation.alpha(1)
    for (let i=0;i<maxTicks && (simulation.alpha()??0)>minAlpha;i++) simulation.tick()
    nodes.forEach(n => { n.fx=n.x; n.fy=n.y })
    simulation.stop()
  }

  function stop(){ simulation?.stop() }

  return { init, addEmotionForces, relaxSubset, stop }
}
