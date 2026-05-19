/**
 * GrainOverlay.tsx
 *
 * Philosophical Reasoning:
 * The grain is the difference between a screen render and a photograph.
 * Flat digital surfaces feel synthetic — a subtle noise texture adds
 * the organic imperfection that signals human craft. It lives at
 * z-index 9999 so it sits above everything, unified across the entire
 * viewport. position:fixed + will-change:transform composites it onto
 * the GPU once — zero scroll repaint cost. opacity:0.035 is the exact
 * threshold where you feel it without consciously seeing it.
 *
 * This component renders nothing to the DOM tree — it is pure atmosphere.
 */

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="
        fixed inset-0
        pointer-events-none
        z-9999
        will-change-transform
      "
      style={{
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "300px 300px",
      }}
    />
  );
}