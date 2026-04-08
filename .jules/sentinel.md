## 2025-05-15 - Improving Placeholder Links and Security
**Vulnerability:** Use of placeholder `#` for external links and missing security attributes (`target="_blank"`, `rel="noopener noreferrer"`) on external links.
**Learning:** Placeholder `#` links are poor UX and can be confusing. Missing security attributes on external links can lead to security vulnerabilities like tabnabbing.
**Prevention:** Always use valid placeholder URLs and include proper security attributes for all external links during development.

## 2026-04-04 - Missing HTTP Security Headers
**Vulnerability:** The application was missing critical HTTP security headers (CSP, HSTS, X-Frame-Options, etc.), leaving it vulnerable to XSS, Clickjacking, and other web-based attacks.
**Learning:** Next.js doesn't enable all security headers by default. They must be explicitly configured in `next.config.ts` using the `headers` function.
**Prevention:** Always include a comprehensive set of security headers in `next.config.ts` for every Next.js project.

## 2026-04-07 - Missing Security Attributes on External Links
**Vulnerability:** External links in `Portfolio.tsx` were missing `target="_blank"` and `rel="noopener noreferrer"`.
**Learning:** External links should always use these attributes to prevent tabnabbing and improve UX.
**Prevention:** Always include proper security attributes for all external links during development.
