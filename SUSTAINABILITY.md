# HAX Sustainability

How the HAX ecosystem is resourced, what free community support does and does not cover, and who owns the infrastructure the project depends on. Companion to GOVERNANCE.md.

## Funding model

- **Institutional employment and student interns.** Core maintenance is funded through Penn State: the primary maintainer is employed by The Pennsylvania State University (maintaining HAX is part of that role), and student interns carry part of the maintenance load. Penn State also holds the copyright and provides the institutional stewardship described in GOVERNANCE.md.
- **Hosting partnerships.** Reclaim Hosting and Reclaim.cloud support hosting installs of HAXcms (including 1-click installs; see each repo's README).
- **Grants.** Grants regularly come through to fund additional development on HAX (new features, integrations, and project work); they do not fund core maintenance.
- **Community contributions.** Issues, PRs, reviews, docs, and translations from the broader community.

There is currently no paid support tier and no membership program. If that changes, this document changes with it.

## What free community support covers — and does not

- **Covers**: issue triage and bug fixes in the unified queue, help on Discord, documentation and tutorials on haxtheweb.org, and security response per SECURITY.md.
- **Does not cover**: guaranteed response times, custom feature work, operating or hosting an adopter's sites, or SLAs of any kind.

Adopters needing those should budget their own staff, contract with a hosting partner (Reclaim Hosting/Reclaim.cloud), or work with campus IT — the HAXcms deployment profiles (single-site, self-hosted-multi-site, haxiam-managed) are designed for exactly that split.

## Resource needs

Ongoing needs beyond feature work, in rough priority order:

- Security response and dependency updates (dependabot/renovate land changes; review and release capacity is the human bottleneck)
- Documentation upkeep on haxtheweb.org and in each repo's README
- Release management across the ecosystem's repos
- Community triage in the unified issue queue

Contributions that reduce these loads (dependency PRs, doc fixes, issue triage) are as valuable as features.

## Infrastructure inventory

| Asset | Where | Notes |
| --- | --- | --- |
| Repositories | GitHub org `haxtheweb` | Org-owned; each repo has CODEOWNERS (primary + backup) |
| Published packages | npm org `@haxtheweb` | Package list: npmjs.com/org/haxtheweb |
| CLA signatures | `haxtheweb/cla` repo | Written by the CLA Assistant workflow (`signatures/version1/cla.json`) |
| Promotion | hax.cloud | An alternative location for promotion of the project (demos, magic-script playground) |
| Docs site | haxtheweb.org | Built from the `docs` repo (a HAXcms site itself) |

Access to these assets is administered by the primary maintainer with the institutional steward as the continuity backstop; succession details are in GOVERNANCE.md. Verify current access lists during the annual governance review.
