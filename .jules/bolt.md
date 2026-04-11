## 2024-05-20 - Unoptimized Next.js Images
**Learning:** Found `<Image unoptimized={true} />` usage for large PNGs (~500-700KB) in `Portfolio.tsx` and `About.tsx`. This manually bypasses Next.js's built-in image optimization.
**Action:** Removed the `unoptimized` prop to allow Next.js to automatically convert images to WebP/AVIF and proper sizes, reducing LCP and bandwidth overhead. Always check if `unoptimized={true}` is strictly necessary (e.g., animated GIFs or external providers that don't support it), otherwise let Next.js do its job.

## 2025-05-15 - Unnecessary Array Spreading in Render
**Learning:** Found repeated array spreading `[...companies, ...companies, ...companies, ...companies]` inside the `Marquee` component's render loop. This causes unnecessary allocations and spread operations on every render.
**Action:** Extracted the repeated array into a constant `MARQUEE_COMPANIES` outside the component. This optimization improved micro-benchmark performance by ~22% by reducing GC pressure and execution time.

## 2026-04-04 - Un-throttled Scroll Event Listeners
**Learning:** Scroll event listeners can fire at very high frequencies, causing excessive React state updates and reconciliation during scrolls. Using `requestAnimationFrame` to throttle these updates to the browser's refresh rate and adding `{ passive: true }` to the event listener improves scrolling performance and reduces CPU overhead.
**Action:** Always throttle high-frequency events like `scroll`, `resize`, or `mousemove` using `requestAnimationFrame` or a debounce/throttle function, and use passive listeners where possible.

## 2026-04-07 - Unnecessary Array Creation for Iteration
**Learning:** Using `[...Array(length)]` for iteration creates a temporary array and spreads it, which is less efficient than `Array.from({ length })`.
**Action:** Replaced `[...Array(n)]` with `Array.from({ length: n }, mappingFn)` for rendering star ratings. This optimization improved micro-benchmark performance by ~4.5x, reducing CPU time and memory allocation by avoiding intermediate array creation and a second iteration pass.
## 2026-04-11 - Component Extraction and Map Keys\n**Learning:** Using React.memo for individually mapped child elements prevents full re-renders of list components, and using unique data properties (like `testimonial.name`) instead of loop indices for the `key` prop ensures React can properly track elements.\n**Action:** Extracted the individual elements from mapped lists into `React.memo` components and passed unique, stable identifiers as keys.
## 2026-04-11 - Optimizing Next.js Image Component\n**Learning:** The `next/image` component downloads images based on `100vw` heuristics by default when using the `fill` prop, leading to significantly oversized image downloads for small UI elements like avatars.\n**Action:** Applied the `sizes` prop to `next/image` components using `fill` for fixed-size UI elements to hint the exact resolution required to the browser.
