# HAX Security Policy

## Source of truth

This document is the source of truth for security policy across everything in `haxtheweb/*`.
Repository-level `SECURITY.md` files should point back to this policy.

## Scope

This policy applies to all HAX ecosystem repositories under `haxtheweb/*`, including `webcomponents`, `haxcms-php`, `haxcms-nodejs`, `create`, and `open-apis`.

## Supported versions

Security fixes are prioritized for:

- the default branch of each repository
- the latest stable release line(s)

Older releases may receive upgrade guidance instead of backported patches.

## Reporting a vulnerability

Please report vulnerabilities privately using GitHub Security Advisories in the `haxtheweb/issues` repository:
https://github.com/haxtheweb/issues/security/advisories/new

Please do not open public issues for unpatched vulnerabilities.

Include as much of the following as possible:

- affected repository/repositories
- affected versions, tags, or commit SHAs
- reproduction steps or proof of concept
- expected behavior vs actual behavior
- impact assessment (confidentiality, integrity, availability)

## Need to discuss first?

If you need to discuss a potential issue with the core team before filing an advisory, contact us via:

- Discord: https://discord.gg/qGBZMBnHc
- Email: hax@psu.edu

## Response expectations

- initial acknowledgement target: within 3 business days
- triage and severity assessment target: within 10 business days
- remediation timelines vary based on severity and cross-repo impact

## Coordinated disclosure

The core team investigates reports privately, coordinates fixes across affected repositories, and publishes disclosure details after patches are available.

## Safe harbor

We support good-faith security research and coordinated disclosure under this policy.
