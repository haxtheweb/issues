# Issue Queue Audit — Findings for #2683

> Audit of 188 open issues in haxtheweb/issues, identifying duplicates, related issues not cross-referencing each other, and issues that may already be resolved.

---

## 🔴 Likely Duplicate Issues

These pairs/groups appear to describe the **same problem or task**:

### 1. New page shows old page's content (same bug filed twice)
- **#2588** — "adding a page can cause content of the current page to show as the default entry" *(Feb 3, 2026)*
- **#2672** — "Clean up that new page starts with old pages content bug..." *(Apr 23, 2026)*

Both describe the same scenario: creating a new page causes the previous page's content to appear. #2672 even says "Have replicated it before." **Recommend: close #2672 as duplicate of #2588** (or vice versa — #2588 has more detail and was filed first).

---

## 🟡 Related Issues Not Referencing Each Other

### 2. Skeleton system (5 issues — no single thread connecting them)
- **#2569** — ability to send skeletons back into local config/skeletons directory *(base feature)*
- **#2570** — skeleton-maker.hax.cloud *(frontend for creating skeletons, references #2569 ✓)*
- **#2610** — endpoint to save skeletons *(API side, references #2569 ✓)*
- **#2612** — skeleton on nodejs version in _config folder doesn't work *(bug, doesn't reference above)*
- **#2560** — smart-collection items don't transfer into skeleton correctly *(downstream bug, doesn't reference skeleton issues)*

**Suggest:** #2612 should reference #2569/#2570; #2560 should reference the skeleton cluster.

### 3. YouTube captions (3 related issues, only loosely connected)
- **#1038** — [googleapis] Download caption using oAuth2 *(original, 2022)*
- **#1911** — YouTube closed captions toggle button in our player *(2024, references #1725 but not #1038)*
- **#2117** — Auto-snagging YouTube captions *(2024, btopro commented #1038 but body doesn't reference it)*

These three address different aspects of the same problem (YouTube caption accessibility). **Suggest:** all three should cross-reference each other; #1911 and #2117 should reference #1038 in their bodies.

### 4. Custom/organizational component registries (4 issues)
- **#1896** — config style support for organizations to define own components/themes *(2024)*
- **#1943** — Add area in haxcms to autoload own local themes/elements *(2024, references wc-registry but not #1896)*
- **#2205** — haxcms/haxiam custom registry for sideloading *(2024, doesn't reference #1896 or #1943)*
- **#2402** — Support multiple registries and priorities *(2025, doesn't reference any of the above)*

All four describe variations of the same capability: allowing custom/org-level component and theme registries. **Suggest:** these should all cross-reference each other as a cluster.

### 5. Mobile + admin UI cleanup (6 issues all created Apr 23, 2026 — none cross-reference)
- **#2669** — Another pass on admin theme UIs for cleanup
- **#2671** — Mobile admin UIs collapse but don't open fully
- **#2676** — Hide welcome menu on mobile
- **#2678** — Better organize Merlin results
- **#2681** — Reports need design and dark mode clean up
- **#2682** — Use [grid layout] for mobile mode on dashboard

These appear to be a coordinated cleanup sprint. **Suggest:** add cross-references between them, possibly under a parent/tracking issue.

### 6. Embed element wrappers (4 issues — partially connected)
- **#2041** — Make a linkedin-embed element *(base, 2024)*
- **#2068** — facebook-embed widget *(references #2041 ✓)*
- **#2090** — stripe-buy-button wrapper *(references #2041 and #2068 ✓)*
- **#1758** — Add HAX wiring for tableau webcomponent *(2023 — does NOT reference #2041 or the embed cluster)*

**Suggest:** #1758 should reference the embed elements cluster (#2041, #2068, #2090).

### 7. HAX site import / migrate content (6 issues — partially connected)
- **#1124** — import via screen scrape *(2023)*
- **#1452** — Scraping Pressbooks format via address *(2023)*
- **#1455** — site from HTML *(2023)*
- **#1208** — import page and structure from 1 space to another *(2023, btopro commented #2443 ✓)*
- **#2443** — Magic link to support HAX site import content *(2025)*
- **#2608** — Provide Examples to Import a Hax Site *(2026)*

**Suggest:** #1124, #1452, #1455 should reference each other and the newer #2443 and #2608.

### 8. PDF-related services (4 issues)
- **#1460** — PDF merge tool *(2023)*
- **#1621** — Full PDF of lesson and entire course *(2023)*
- **#1708** — Make a PDF to HTML service for import *(2023)*
- **#2633** — PPTX to HTML microservice *(2026)*

The first three are all PDF microservices that would likely live in the same endpoint area. **Suggest:** #1460, #1621, #1708 should cross-reference each other. #2633 (PPTX) is related but distinct.

### 9. AI/Merlin features (3 issues — not connected)
- **#2121** — Add web component connection to AI API using HAX Schema *(2024)*
- **#2142** — Connecting AI for suggestion generation *(2024)*
- **#2310** — Implement AI Agent *(2025, only references #1948)*

These all converge on the AI/Merlin integration. **Suggest:** cross-reference all three.

### 10. Video/marketing content updates (3 issues)
- **#2134** — Update the haxtheweb.org video work *(2024)*
- **#2155** — [video] 7 HAX Features in under 7 minutes *(2024)*
- **#2598** — Update "the future" video and page *(2026)*

None reference each other. **Suggest:** at minimum #2155 should reference #2134 as context.

### 11. LaTeX/Math rendering (2 issues — already bridged in comments but not body)
- **#2146** — Improve UX of la-tex element *(2024)*
- **#2648** — MathML `<math>` component *(2026, btopro commented pointing to #2146 ✓)*

btopro already noted the relationship in comments. **Suggest:** update the body of both issues to formally cross-reference each other since they address complementary math authoring needs.

### 12. Smart collection enhancements (4 issues)
- **#1820** — future smart list enhancements *(2023)*
- **#1823** — smart-collection-list with remote load capability *(2023)*
- **#2049** — Smart collection output as different visuals *(2024, 1/3 checkboxes done)*
- **#2560** — smart-collection items don't transfer into skeleton correctly *(2026, bug)*

**Suggest:** #1820, #1823, and #2049 should all reference each other; #2560 is a downstream bug that should reference the main feature issues.

### 13. HAXiam user management (3 issues)
- **#2474** — user data storage specific to site apps *(2025)*
- **#2479** — user permissions in HAXiam context *(2025)*
- **#2604** — option in haxiam to email user on site creation *(2026)*

These converge on the HAXiam user experience. **Suggest:** cross-reference all three.

### 14. Help/Support (2 issues with overlap)
- **#1591** — magic link option for email (including "helpdesk style email" with browser data) *(2023)*
- **#2392** — create a standard way of contacting a help desk *(2025)*

The helpdesk-style email with browser data in #1591 directly complements the help desk integration in #2392. **Suggest:** #2392 should reference #1591.

---

## 🟢 Issues That May Already Be Resolved / Superseded

### 15. #827 — remove iron-ajax from haxcms/theme layer *(2021)*
Opened in the Polymer/iron-ajax era. HAX has since fully migrated to LitElement and fetch-based patterns. Worth verifying if `iron-ajax` still appears in the haxcms/theme layer code — this may already be done as part of the LitElement migration.

### 16. #994 — Replace polymer build w/ an esbuild variation *(2022)*
HAX has since moved to its own build system (gulp + custom tooling). The Polymer build this referred to is long gone. **Worth checking if this is superseded/resolved.**

### 17. #1208 — import page and structure from 1 space to another *(2023)*
2 of 6 checkboxes are checked. The basic endpoint exists. Remaining work is the UI/UX layer. Still open but partially complete.

### 18. #1717 — page-node relationship view output type *(2023)*
4 of 11 checkboxes are checked. Significant partial completion — worth reviewing if the unchecked items are still relevant or have been superseded.

### 19. #2049 — Smart collection output as different visuals *(2024)*
1 of 3 checkboxes checked (default cards done). Still has "list of links" and another view type outstanding.

### 20. #2192 — advanced/additional CLI commands to add *(2024)*
1 of 6 checkboxes checked (#2434 done). Several remaining CLI commands to implement.

### 21. #1343 — support training ID/URL in haxcms/haxiam *(2023)*
2 of 5 checkboxes checked. Partial completion.

### 22. #1185 — [lrndesign-timeline] use progressive enhancement to fix array bloat *(2023)*
1 of 3 checkboxes checked. Partial completion worth reviewing.

---

## Posting Cross-Reference Comments

A script [`post_cross_references.sh`](post_cross_references.sh) is included that will post all 49 cross-reference comments across the 13 clusters automatically. Run it with a GitHub PAT that has `issues:write` scope:

```bash
GH_TOKEN=<your_pat> ./post_cross_references.sh
```

---

## Summary Table

| Category | Issues | Suggested Action |
|----------|--------|-----------------|
| 🔴 Likely Duplicate | #2588 ↔ #2672 | Close #2672 as duplicate of #2588 |
| 🟡 Need cross-refs | Skeletons: #2569, #2570, #2610, #2612, #2560 | Add cross-references |
| 🟡 Need cross-refs | YT Captions: #1038, #1911, #2117 | Add cross-references |
| 🟡 Need cross-refs | Registries: #1896, #1943, #2205, #2402 | Add cross-references |
| 🟡 Need cross-refs | Mobile/Admin UI: #2669, #2671, #2676, #2678, #2681, #2682 | Add cross-references or parent issue |
| 🟡 Need cross-refs | Embed wrappers: #1758, #2041, #2068, #2090 | Add #1758 to cluster |
| 🟡 Need cross-refs | Import/migrate: #1124, #1452, #1455, #1208, #2443, #2608 | Add cross-references |
| 🟡 Need cross-refs | PDF services: #1460, #1621, #1708, #2633 | Add cross-references |
| 🟡 Need cross-refs | AI/Merlin: #2121, #2142, #2310 | Add cross-references |
| 🟡 Need cross-refs | Videos: #2134, #2155, #2598 | Add cross-references |
| 🟡 Need cross-refs | Math: #2146 ↔ #2648 | Add to issue bodies |
| 🟡 Need cross-refs | Smart collection: #1820, #1823, #2049, #2560 | Add cross-references |
| 🟡 Need cross-refs | HAXiam user mgmt: #2474, #2479, #2604 | Add cross-references |
| 🟡 Need cross-refs | Help desk: #1591, #2392 | #2392 should reference #1591 |
| 🟢 May be resolved | #827, #994 | Verify if superseded by LitElement/new build migration |
| 🟢 Partially done | #1208, #1185, #1343, #1717, #2049, #2192 | Review remaining checkboxes for relevance |
