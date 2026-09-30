# HAX Incident Response

How the HAX ecosystem handles operational incidents — security, availability, and data — beyond the initial vulnerability report. Reporting itself is covered by SECURITY.md (private advisories; never public issues for unpatched vulnerabilities).

## Severity

- **SEV1 — active harm.** Active exploitation, data exposure, or a critical outage affecting sites running supported releases in the wild. The core team engages immediately; fix and disclosure work in parallel.
- **SEV2 — vulnerable release, no known exploitation.** A vulnerability in a supported release. Fix within days; coordinated disclosure after the fix lands unless users must act to protect themselves first.
- **SEV3 — hardening / security-adjacent.** Misconfigurations, defense-in-depth gaps, or security-adjacent bugs. Handled through the normal unified issue queue with the `Performance & Security` label.

## Response flow

1. **Report arrives** via private advisory (haxtheweb/issues/security/advisories/new), hax@psu.edu, or private Discord contact with the core team.
2. **Triage.** The core maintainer assigns severity, confirms affected repos and releases, and decides whether the issue needs coordination with downstream hosts (Reclaim, campus deployments).
3. **Fix.** Patches land through normal PRs referencing the incident issue; the CLA and CI checks apply as usual. Affected repos get patched releases.
4. **Communicate.**
   - Release notes state what was fixed without exposing details that would help attacks against unpatched installs.
   - A public post-incident issue is filed in the unified queue once the fix is released.
   - Incidents affecting site owners (e.g. action required to stay safe) also get a Discord announcement and a note on haxtheweb.org.

## Post-incident review

For SEV1 and SEV2, write a short blameless note in the post-incident issue: what happened, the timeline, the root cause, and what changed (tests, docs, tooling, process). Follow-up work from the review is filed as issues and tracked like any other work — the security best-practices report / post-fix re-audit reports in the repos are the precedent for this loop.

## Scope

This process covers the HAX ecosystem's repositories and releases. Deployments built on HAX (campus sites, hosted platforms) follow their own institutional incident processes; this project's responsibility ends at its published artifacts.
