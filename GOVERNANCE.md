# HAX Governance

This is the governance model for the HAX ecosystem (`haxtheweb/*`): who holds what role, how decisions are made and recorded, how maintainers come and go, and how institutional and vendor participation stays fair. Every repo in the org points here (the same pattern as SECURITY.md).

## Roles

- **Primary maintainer** — @btopro (Bryan Ollendyke, Penn State). Holds the `*` slot in each repo's CODEOWNERS, merges changes, cuts releases, and is the tiebreaker when consensus is unclear.
- **Backup owner** — @WilliamMRose (Bill Rose), the second name in each repo's CODEOWNERS. Assumes merges and releases if the primary maintainer is unavailable for an extended period.
- **Institutional steward** — The Pennsylvania State University employs the primary maintainer, holds the copyright, and provides continuity for the ecosystem's infrastructure (see SUSTAINABILITY.md).
- **Contributors** — anyone who files issues, submits PRs, reviews, writes docs or translations, or helps in the community. Code contributions are accepted under the project's Apache-2.0 + CLA workflow (each repo runs CLA Assistant; signatures live in the `haxtheweb/cla` repo).

## How decisions are made

1. Anyone can open an issue in the unified issue queue (`haxtheweb/issues`) describing a problem, need, or proposal. Repo-specific work gets an issue here too — this queue is the single source of truth for the ecosystem.
2. Discussion happens in the issue. Larger efforts get a written plan posted as an issue comment, labeled `Plan Created`, so plans are findable later.
3. Work lands through pull requests that reference the issue they resolve (`fixes #XXXX` in the PR body, per CONTRIBUTING.md).
4. Ecosystem-wide or breaking changes are called out in the issue before merge and again in release notes.

Decisions made in private channels (Discord, email, hallway conversations at Penn State) are recorded back into an issue so the public record stays complete.

## Maintainer lifecycle

- **Adding a maintainer**: a contributor with a track record of merged, well-reviewed PRs asks to take ownership of an area (or the primary maintainer invites them). The primary maintainer adds them to the affected repo's CODEOWNERS. Maintainership is earned through contribution, not granted by affiliation.
- **Review**: the maintainer roster is reviewed during the annual governance review (below).
- **Retiring**: a maintainer inactive for six months or more (no merges, reviews, or issue activity) is thanked and removed from CODEOWNERS. Retiring is not a demotion — contributors can return through the same path.

## Succession

Each repo's CODEOWNERS names a primary maintainer and a backup owner. If the primary maintainer becomes unavailable, the backup owner takes over merges and releases while the institutional steward (Penn State) helps name a successor. The critical assets — repositories, the npm org, and the CLA signatures repo — are held at the GitHub-org level rather than by personal accounts, so no single personal account is a single point of failure for the project.

## Conflicts of interest and vendor participation

- Vendor and institutional participation (hosting partners, campus IT, commercial builders) is welcome. HAX is built on the idea that campuses and vendors benefit from shared infrastructure.
- Affiliations should be stated in issues and PRs where they could affect the outcome (for example, a vendor proposing a change that favors their hosting product).
- Vendors influence the roadmap the way everyone does — through issues and merged contributions. Vendor participation does not grant merge authority; that flows only through the maintainer lifecycle above.
- The primary maintainer recuses from decisions where Penn State employment creates a direct conflict and records the recusal in the issue.

## Governance review

Once a year, the primary maintainer with the community reviews this document against reality: is the decision record accurate, are CODEOWNERS slots current, are the succession assumptions still true? Changes merge with rationale and a dated review note (filed as an issue with the `Documentation` label).

Questions or proposals: open an issue in the unified queue.
