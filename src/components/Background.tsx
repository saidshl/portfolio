const nodes = [
  { x: 10, y: 20 }, { x: 30, y: 65 }, { x: 50, y: 30 },
  { x: 70, y: 70 }, { x: 90, y: 25 }, { x: 60, y: 90 },
]
const links = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 4], [1, 5], [3, 5]]

// Event-driven motif: services (nodes) linked by flowing event lines.
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <svg className="absolute inset-0 h-full w-full text-brand-cyan" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.15"
            strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke"
            className="animate-flow"
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <span
          key={i}
          className="animate-pulse-dot absolute size-2 rounded-full bg-brand-cyan"
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.4}s` }}
        />
      ))}
      <div className="absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand-blue/30 blur-3xl animate-float" />
    </div>
  )
}
