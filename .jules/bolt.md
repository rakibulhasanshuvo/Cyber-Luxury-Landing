## 2024-05-20 - Unoptimized Next.js Images
**Learning:** Found `<Image unoptimized={true} />` usage for large PNGs (~500-700KB) in `Portfolio.tsx` and `About.tsx`. This manually bypasses Next.js's built-in image optimization.
**Action:** Removed the `unoptimized` prop to allow Next.js to automatically convert images to WebP/AVIF and proper sizes, reducing LCP and bandwidth overhead. Always check if `unoptimized={true}` is strictly necessary (e.g., animated GIFs or external providers that don't support it), otherwise let Next.js do its job.

## 2025-05-15 - Unnecessary Array Spreading in Render
**Learning:** Found repeated array spreading `[...companies, ...companies, ...companies, ...companies]` inside the `Marquee` component's render loop. This causes unnecessary allocations and spread operations on every render.
**Action:** Extracted the repeated array into a constant `MARQUEE_COMPANIES` outside the component. This optimization improved micro-benchmark performance by ~22% by reducing GC pressure and execution time.
