#!/bin/bash
# post_cross_references.sh
#
# Posts cross-reference comments to related issue clusters identified in the audit (#2683).
# Run this with a GitHub PAT that has issues:write scope:
#
#   GH_TOKEN=<your_pat> ./post_cross_references.sh
#
# Or set GH_TOKEN in your environment before running.

set -e

REPO="haxtheweb/issues"

if [ -z "$GH_TOKEN" ]; then
  echo "❌ GH_TOKEN not set. Export a GitHub PAT with issues:write scope."
  echo "   Usage: GH_TOKEN=<pat> ./post_cross_references.sh"
  exit 1
fi

post_comment() {
  local issue_number="$1"
  local body="$2"
  echo "  → Posting to #${issue_number}..."
  gh issue comment "$issue_number" --repo "$REPO" --body "$body"
}

echo "🔗 Posting cross-reference comments to related issue clusters..."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "📦 Skeleton system (#2569, #2570, #2610, #2612, #2560)"
post_comment 2569 "Related skeleton issues: #2570 (skeleton-maker.hax.cloud frontend), #2610 (API endpoint to save skeletons), #2612 (bug: skeletons not loading in _config on nodejs), #2560 (bug: smart-collection items not mapping correctly in skeletons)."
post_comment 2570 "Related skeleton issues: #2569 (ability to send skeletons to local config, base feature), #2610 (API endpoint to save skeletons), #2612 (bug: skeletons not loading in _config on nodejs), #2560 (bug: smart-collection items not mapping correctly in skeletons)."
post_comment 2610 "Related skeleton issues: #2569 (ability to send skeletons to local config, base feature), #2570 (skeleton-maker.hax.cloud frontend), #2612 (bug: skeletons not loading in _config on nodejs), #2560 (bug: smart-collection items not mapping correctly in skeletons)."
post_comment 2612 "Related skeleton issues: #2569 (ability to send skeletons to local config, base feature), #2570 (skeleton-maker.hax.cloud frontend), #2610 (API endpoint to save skeletons), #2560 (bug: smart-collection items not mapping correctly in skeletons)."
post_comment 2560 "Related skeleton issues: #2569 (ability to send skeletons to local config, base feature), #2570 (skeleton-maker.hax.cloud frontend), #2610 (API endpoint to save skeletons), #2612 (bug: skeletons not loading in _config on nodejs)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "🎬 YouTube captions (#1038, #1911, #2117)"
post_comment 1038 "Related YouTube caption issues: #1911 (toggle YouTube closed captions button in our player), #2117 (auto-snagging YouTube captions)."
post_comment 1911 "Related YouTube caption issues: #1038 ([googleapis] download caption using oAuth2, original issue), #2117 (auto-snagging YouTube captions)."
post_comment 2117 "Related YouTube caption issues: #1038 ([googleapis] download caption using oAuth2, original issue), #1911 (toggle YouTube closed captions button in our player)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "🗂️ Custom/org component registries (#1896, #1943, #2205, #2402)"
post_comment 1896 "Related custom registry issues: #1943 (autoload own local themes/elements in haxcms filesystem), #2205 (haxcms/haxiam custom registry for sideloading), #2402 (support multiple registries and priorities)."
post_comment 1943 "Related custom registry issues: #1896 (config style support for organizations to define own components/themes), #2205 (haxcms/haxiam custom registry for sideloading), #2402 (support multiple registries and priorities)."
post_comment 2205 "Related custom registry issues: #1896 (config style support for organizations to define own components/themes), #1943 (autoload own local themes/elements in haxcms filesystem), #2402 (support multiple registries and priorities)."
post_comment 2402 "Related custom registry issues: #1896 (config style support for organizations to define own components/themes), #1943 (autoload own local themes/elements in haxcms filesystem), #2205 (haxcms/haxiam custom registry for sideloading)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "📱 Mobile + Admin UI cleanup (#2669, #2671, #2676, #2678, #2681, #2682)"
post_comment 2669 "Part of the April 2026 mobile/admin UI cleanup sprint: #2671 (mobile admin UIs collapse but don't open fully), #2676 (hide welcome menu on mobile), #2678 (better organize Merlin results), #2681 (reports need design and dark mode clean up), #2682 (mobile dashboard layout)."
post_comment 2671 "Part of the April 2026 mobile/admin UI cleanup sprint: #2669 (admin theme UI cleanup pass), #2676 (hide welcome menu on mobile), #2678 (better organize Merlin results), #2681 (reports need design and dark mode clean up), #2682 (mobile dashboard layout)."
post_comment 2676 "Part of the April 2026 mobile/admin UI cleanup sprint: #2669 (admin theme UI cleanup pass), #2671 (mobile admin UIs collapse but don't open fully), #2678 (better organize Merlin results), #2681 (reports need design and dark mode clean up), #2682 (mobile dashboard layout)."
post_comment 2678 "Part of the April 2026 mobile/admin UI cleanup sprint: #2669 (admin theme UI cleanup pass), #2671 (mobile admin UIs collapse but don't open fully), #2676 (hide welcome menu on mobile), #2681 (reports need design and dark mode clean up), #2682 (mobile dashboard layout)."
post_comment 2681 "Part of the April 2026 mobile/admin UI cleanup sprint: #2669 (admin theme UI cleanup pass), #2671 (mobile admin UIs collapse but don't open fully), #2676 (hide welcome menu on mobile), #2678 (better organize Merlin results), #2682 (mobile dashboard layout)."
post_comment 2682 "Part of the April 2026 mobile/admin UI cleanup sprint: #2669 (admin theme UI cleanup pass), #2671 (mobile admin UIs collapse but don't open fully), #2676 (hide welcome menu on mobile), #2678 (better organize Merlin results), #2681 (reports need design and dark mode clean up)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "🔌 Embed element wrappers (#1758, #2041, #2068, #2090)"
post_comment 1758 "Related embed element wrapper issues: #2041 (linkedin-embed element), #2068 (facebook-embed widget), #2090 (stripe-buy-button wrapper)."
post_comment 2041 "Related embed element wrapper issues: #1758 (HAX wiring for tableau webcomponent), #2068 (facebook-embed widget), #2090 (stripe-buy-button wrapper)."
post_comment 2068 "Related embed element wrapper issues: #1758 (HAX wiring for tableau webcomponent), #2041 (linkedin-embed element), #2090 (stripe-buy-button wrapper)."
post_comment 2090 "Related embed element wrapper issues: #1758 (HAX wiring for tableau webcomponent), #2041 (linkedin-embed element), #2068 (facebook-embed widget)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "📥 HAX site import/migrate (#1124, #1452, #1455, #1208, #2443, #2608)"
post_comment 1124 "Related site import/migration issues: #1452 (scraping Pressbooks format via address), #1455 (site from HTML), #1208 (import page and structure from 1 space to another), #2443 (magic link to support HAX site import content), #2608 (provide examples to import a HAX site)."
post_comment 1452 "Related site import/migration issues: #1124 (import via screen scrape), #1455 (site from HTML), #1208 (import page and structure from 1 space to another), #2443 (magic link to support HAX site import content), #2608 (provide examples to import a HAX site)."
post_comment 1455 "Related site import/migration issues: #1124 (import via screen scrape), #1452 (scraping Pressbooks format via address), #1208 (import page and structure from 1 space to another), #2443 (magic link to support HAX site import content), #2608 (provide examples to import a HAX site)."
post_comment 1208 "Related site import/migration issues: #1124 (import via screen scrape), #1452 (scraping Pressbooks format via address), #1455 (site from HTML), #2443 (magic link to support HAX site import content), #2608 (provide examples to import a HAX site)."
post_comment 2443 "Related site import/migration issues: #1124 (import via screen scrape), #1452 (scraping Pressbooks format via address), #1455 (site from HTML), #1208 (import page and structure from 1 space to another), #2608 (provide examples to import a HAX site)."
post_comment 2608 "Related site import/migration issues: #1124 (import via screen scrape), #1452 (scraping Pressbooks format via address), #1455 (site from HTML), #1208 (import page and structure from 1 space to another), #2443 (magic link to support HAX site import content)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "📄 PDF/document microservices (#1460, #1621, #1708, #2633)"
post_comment 1460 "Related PDF microservice issues: #1621 (full PDF of lesson and entire course), #1708 (PDF to HTML service for import), #2633 (PPTX to HTML microservice)."
post_comment 1621 "Related PDF microservice issues: #1460 (PDF merge tool), #1708 (PDF to HTML service for import), #2633 (PPTX to HTML microservice)."
post_comment 1708 "Related PDF microservice issues: #1460 (PDF merge tool), #1621 (full PDF of lesson and entire course), #2633 (PPTX to HTML microservice)."
post_comment 2633 "Related document conversion microservice issues: #1460 (PDF merge tool), #1621 (full PDF of lesson and entire course), #1708 (PDF to HTML service for import)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "🤖 AI/Merlin features (#2121, #2142, #2310)"
post_comment 2121 "Related AI/Merlin integration issues: #2142 (connecting AI for suggestion generation), #2310 (implement AI agent)."
post_comment 2142 "Related AI/Merlin integration issues: #2121 (add web component connection to AI API using HAX Schema), #2310 (implement AI agent)."
post_comment 2310 "Related AI/Merlin integration issues: #2121 (add web component connection to AI API using HAX Schema), #2142 (connecting AI for suggestion generation)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "🎥 Video/marketing content (#2134, #2155, #2598)"
post_comment 2134 "Related video/marketing content issues: #2155 ([video] 7 HAX features in under 7 minutes), #2598 (update 'the future' video and page)."
post_comment 2155 "Related video/marketing content issues: #2134 (update the haxtheweb.org video work), #2598 (update 'the future' video and page)."
post_comment 2598 "Related video/marketing content issues: #2134 (update the haxtheweb.org video work), #2155 ([video] 7 HAX features in under 7 minutes)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "🧮 Math rendering (#2146, #2648)"
post_comment 2146 "Related math rendering issue: #2648 (MathML \`<math>\` component request — complementary math authoring capability)."
post_comment 2648 "Related math rendering issue: #2146 (improve UX of la-tex element — complementary math authoring capability)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "📋 Smart collection (#1820, #1823, #2049, #2560)"
post_comment 1820 "Related smart collection issues: #1823 (smart-collection-list with remote load capability), #2049 (smart collection output as different visuals), #2560 (bug: smart-collection items don't transfer into skeleton and map correctly)."
post_comment 1823 "Related smart collection issues: #1820 (future smart list enhancements), #2049 (smart collection output as different visuals), #2560 (bug: smart-collection items don't transfer into skeleton and map correctly)."
post_comment 2049 "Related smart collection issues: #1820 (future smart list enhancements), #1823 (smart-collection-list with remote load capability), #2560 (bug: smart-collection items don't transfer into skeleton and map correctly)."
post_comment 2560 "Related smart collection issues: #1820 (future smart list enhancements), #1823 (smart-collection-list with remote load capability), #2049 (smart collection output as different visuals)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "👤 HAXiam user management (#2474, #2479, #2604)"
post_comment 2474 "Related HAXiam user management issues: #2479 (user permissions in HAXiam context), #2604 (option in haxiam to email user on site creation)."
post_comment 2479 "Related HAXiam user management issues: #2474 (user data storage specific to site apps), #2604 (option in haxiam to email user on site creation)."
post_comment 2604 "Related HAXiam user management issues: #2474 (user data storage specific to site apps), #2479 (user permissions in HAXiam context)."
echo ""

# ──────────────────────────────────────────────────────────────────────────────
echo "🆘 Help/support desk (#1591, #2392)"
post_comment 1591 "Related help/support issues: #2392 (create a standard way of contacting a help desk) — the 'helpdesk style email with browser data' concept in this issue is directly complementary."
post_comment 2392 "Related help/support issues: #1591 (magic link option for email — describes a helpdesk-style email that pre-populates browser/platform data, directly complementary to this issue)."
echo ""

echo "✅ All 49 cross-reference comments posted across 13 clusters!"
