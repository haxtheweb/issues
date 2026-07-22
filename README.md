[![Community Support](https://badgen.net/badge/support/community/cyan?icon=awesome)](/SUPPORT.md)
[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](/CODE_OF_CONDUCT.md)
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/EKYJAjqGhf)
[![#HAXTheWeb](https://img.shields.io/badge/-HAXTheWeb-999999FF?style=flat&logo=data:image/svg%2bxml;base64,PHN2ZyBpZD0iZmVhMTExZTAtMjEwZC00Y2QwLWJhMWQtZGZmOTQyODc0Njg1IiBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE4NC40IDEzNS45NyI+PGRlZnM+PHN0eWxlPi5lMWJjMjAyNS0xODAwLTRkYzItODc4NS1jNDZlZDEwM2Y0OTJ7ZmlsbDojMjMxZjIwO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iZTFiYzIwMjUtMTgwMC00ZGMyLTg3ODUtYzQ2ZWQxMDNmNDkyIiBkPSJNNzguMDcsODMuNDVWNTVIODYuMnY4LjEzaDE2LjI2djQuMDdoNC4wN1Y4My40NUg5OC40VjY3LjE5SDg2LjJWODMuNDVaIi8+PHBvbHlnb24gcG9pbnRzPSIxNTMuMTMgNjMuNyAxNTMuMTMgNTEuMzkgMTQwLjU0IDUxLjM5IDE0MC41NCAzOS4wOSAxMjcuOTUgMzkuMDkgMTI3Ljk1IDI2Ljc5IDEwMi43OCAyNi43OSAxMDIuNzggMzkuMDkgMTE1LjM2IDM5LjA5IDExNS4zNiA1MS4zOSAxMjcuOTUgNTEuMzkgMTI3Ljk1IDYzLjcgMTQwLjU0IDYzLjcgMTQwLjU0IDc2IDEyNy4zNiA3NiAxMjcuMzYgODguMyAxMTQuNzggODguMyAxMTQuNzggMTAwLjYxIDEwMi4xOSAxMDAuNjEgMTAyLjE5IDExMi45MSAxMjcuMzYgMTEyLjkxIDEyNy4zNiAxMDAuNjEgMTM5Ljk1IDEwMC42MSAxMzkuOTUgODguMyAxNTIuNTQgODguMyAxNTIuNTQgNzYgMTY1LjcyIDc2IDE2NS43MiA2My43IDE1My4xMyA2My43Ii8+PHBvbHlnb24gcG9pbnRzPSIzMy4xMyA2My43IDMzLjEzIDUxLjM5IDQ1LjcyIDUxLjM5IDQ1LjcyIDM5LjA5IDU4LjMxIDM5LjA5IDU4LjMxIDI2Ljc5IDgzLjQ4IDI2Ljc5IDgzLjQ4IDM5LjA5IDcwLjg5IDM5LjA5IDcwLjg5IDUxLjM5IDU4LjMxIDUxLjM5IDU4LjMxIDYzLjcgNDUuNzIgNjMuNyA0NS43MiA3NiA1OC44OSA3NiA1OC44OSA4OC4zIDcxLjQ4IDg4LjMgNzEuNDggMTAwLjYxIDg0LjA3IDEwMC42MSA4NC4wNyAxMTIuOTEgNTguODkgMTEyLjkxIDU4Ljg5IDEwMC42MSA0Ni4zMSAxMDAuNjEgNDYuMzEgODguMyAzMy43MiA4OC4zIDMzLjcyIDc2IDIwLjU0IDc2IDIwLjU0IDYzLjcgMzMuMTMgNjMuNyIvPjwvc3ZnPg==)](https://haxtheweb.org/)

# HAXTheWeb Issues

The unified issue queue for the entire HAXTheWeb ecosystem. Instead of filing bugs and feature requests across dozens of separate repositories, everything lands here in one place — making it easy to search, triage, and track work across HAX, HAXcms, and related projects.

## Why a unified queue?

HAXTheWeb spans many repositories (`webcomponents`, `create`, `haxcms-php`, `haxcms-nodejs`, `desktop`, `open-apis`, `docs`, and more). A single issue queue means:

- **One place to search** — no guessing which repo a bug lives in
- **Cross-project visibility** — related work across repos stays connected
- **Easier triage** — maintainers see the whole backlog in one view
- **Simpler contribution** — contributors file and follow issues without learning each repo's conventions

When you open an issue, the templates ask which project it relates to so it can be routed and labeled correctly.

## Projects covered

This queue tracks issues for projects across the ecosystem, including:

- **webcomponents** — 250+ LitElement web components, themes, and the DDD design system
- **create** — the `hax` CLI for scaffolding components and HAXsites
- **haxcms-php** / **haxcms-nodejs** — HAXcms backends (content management + APIs)
- **desktop** — Electron-based local development environment
- **open-apis** — microservice APIs and shared infrastructure
- **docs** — official documentation site
- **hax11ty**, **json-outline-schema**, **hax-schema**, and other supporting repos

## Filing an issue

Before opening a new issue:

1. **Search existing issues** — someone may have already reported it
2. **Check the [documentation](https://haxtheweb.org/documentation)**
3. **Ask on [Discord](https://discord.gg/EKYJAjqGhf)** if you're unsure whether it's a bug

Then pick a template:

- **🐛 Bug report** — something is broken. Includes a project selector, reproduction steps, and context.
- **✨ Feature request** — suggest a new capability. Includes a project selector and the problem it solves.

> Tip: clearly identify which project your issue relates to. The project dropdown helps us route and label it correctly.

For **security vulnerabilities**, do not open a public issue — see [SECURITY.md](/SECURITY.md) for private reporting via GitHub Security Advisories.

## Getting involved

| Channel | Use it for |
| --- | --- |
| [Discord](https://discord.gg/EKYJAjqGhf) | Real-time help, discussion, and community support |
| [Documentation](https://haxtheweb.org/documentation) | Guides, tutorials, and developer resources |
| [hax.cloud playground](https://hax.cloud/magicscript.html) | Try HAX components and HAXcms live in the browser |
| [LinkedIn](http://linkedin.com/company/haxtheweb) | Professional updates and networking |
| [X (@haxtheweb)](https://x.com/haxtheweb) | Project updates |

See [SUPPORT.md](/SUPPORT.md) for more on getting help, and [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md) for our community standards.

## Tooling

This repository also ships tools for working with the issue data locally.

### Issue data tools

- **`fetch_issues.sh`** — downloads all issues (open + closed) via the GitHub CLI into a local JSON cache under `issues_data/`.
- **`query_issues.sh`** — search and filter the local cache: stats, keyword search, by number/state/author/label, and recent issues.

```bash
# Pull the latest issues locally
./fetch_issues.sh

# Search, filter, and get stats
./query_issues.sh stats
./query_issues.sh search "accessibility"
./query_issues.sh label bug
./query_issues.sh recent 20
```

See [README_ISSUES.md](/README_ISSUES.md) for full usage details.

### LinkedIn productivity automation

Optional automation that turns issue activity into weekly LinkedIn/X posts.

```bash
node setup-linkedin.js    # one-time OAuth setup
node post-to-linkedin.js  # generate + post (use --dry-run to preview)
./weekly-post.sh          # full fetch + post wrapper
```

See [README_LINKEDIN_AUTOMATION.md](/README_LINKEDIN_AUTOMATION.md) for setup and customization.

## Repository contents

```
issues/
├── .github/ISSUE_TEMPLATE/   # Bug report + feature request templates
├── fetch_issues.sh           # Download issues to a local cache
├── query_issues.sh           # Search/filter the local issue cache
├── post-to-linkedin.js       # LinkedIn productivity post generator
├── setup-linkedin.js         # LinkedIn OAuth setup (one-time)
├── weekly-post.sh            # Fetch + post automation wrapper
├── issues_data/              # Local issue cache (gitignored)
├── SUPPORT.md                # Getting help
├── CODE_OF_CONDUCT.md        # Community standards
├── SECURITY.md               # Vulnerability reporting
├── AGENTS.md                 # Guidance for AI coding agents
└── LICENSE                   # Apache 2.0
```

`issues_data/` and credential files (`linkedin-config.json`, `*.config.json`) are gitignored — the cache and secrets stay local.

## Maintainers & license

- **Primary maintainer**: Bryan Ollendyke ([@btopro](https://github.com/btopro)), Penn State University
- **License**: [Apache 2.0](/LICENSE)
- **Copyright**: © 2015–present The Pennsylvania State University

## Related

- [HAXTheWeb.org](https://haxtheweb.org/) — project home and documentation
- [hax.cloud](https://hax.cloud/) — CDN and live playground
- [Discord](https://discord.gg/EKYJAqGhf) — join the community
