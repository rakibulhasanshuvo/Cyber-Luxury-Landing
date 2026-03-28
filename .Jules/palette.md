## 2026-03-28 - Missing ARIA labels and focus states on icon-only interactive elements
**Learning:** Found a pattern where interactive elements like the mobile menu toggle and 'back to top' link are missing crucial accessibility attributes ('aria-label') and visible focus states for keyboard users.
**Action:** When adding icon-only buttons or links, always include an 'aria-label' describing the action and ensure 'focus-visible' styles exist for keyboard navigation.
