# Contributing to HAXTheWeb

> **This is the single source of truth for onboarding a new developer to the HAX ecosystem.** Every HAX repo's README points here. If you were sent a link to get started, you're in the right place.
>
> Readable version: [Developer onboarding tutorial site](https://learn-hax-developer-onboarding.surge.sh)

HAX is open source, but many of the people working on it do so as their day job. In order to avoid forcing people to be "at work" effectively 24/7, we want to establish some semi-formal protocols around development. Hopefully these rules make things go more smoothly.

As a potential contributor, your changes and ideas are welcome at any hour of the day or night, weekdays, weekends, and holidays. Please do not ever hesitate to ask a question or send a pull request.

## What is HAX

HAX (Headless Authoring eXperience) is an authoring experience that enables rapid creation of fast, static, file-backed websites. It seeks to be the smallest possible back-end CMS to make the HAX editor work and be able to build websites with it. Leveraging JSON Outline Schema, HAX authors multiple pages and writes them onto the file system, so a slim server layer is only needed for basic authentication, saving files, and placing them in version control. Get all the details at [haxtheweb.org](https://haxtheweb.org/).

## The ecosystem at a glance

HAX is an ecosystem of many repos. The core three below are what you clone to get started; the rest are listed so you know what's out there.

- **haxcms-nodejs** — the Node.js backend for HAXcms (content management + APIs), and the engine wrapped by the desktop app. Usually the fastest way to see HAX running.
- **webcomponents** — the heart of HAX: a monorepo of 250+ LitElement web components, themes, and the DDD design system. This is where most component work happens.
- **create** (`@haxtheweb/create`) — the `hax` CLI for scaffolding web components and HAXsites and managing the dev workflow.
- **haxcms-php** *(optional)* — the PHP backend for HAXcms; same capabilities, different stack (PHP 8.3+ / Apache). For those who prefer the PHP stack.
- **docs** — the official documentation site (a HAXcms site itself), at [haxtheweb.org](https://haxtheweb.org/).
- **issues** — this repo. The unified issue queue for the entire ecosystem, plus this onboarding doc.
- **hax11ty**, **json-outline-schema**, **hax-schema** — supporting repos (11ty integration, content schema, HAX property schema).

## Prerequisites

- **OS**: macOS or Linux need nothing special. **Windows** developers should use **WSL 2 with Ubuntu** (open WSL in the Microsoft Store and select Install/Update, or run `wsl --update` in PowerShell). Some Windows editions ship an outdated WSL 2.
- **Git** and a **GitHub account** (you'll fork repos and open pull requests).
- **Node.js 22 or higher**. We recommend **fnm** as a cross-platform Node version manager (`fnm install --lts --use`). nvm works too.
- **npm** (ships with Node) and **yarn** (`npm install -g yarn`) — the webcomponents monorepo uses yarn; the other repos use npm.
- **Windows extra**: enable **Developer Mode** (Windows Settings → For developers → Developer Mode) so symlinks work without running as Administrator. The webcomponents monorepo uses symlinks to emulate a live HAXsite locally.

## haxcms-nodejs

The Node.js backend for HAXcms. Usually the quickest way to get HAX running locally.

**Fork and clone** (replace `YOUR_USERNAME`):
```bash
mkdir -p ~/Documents/git/haxtheweb
cd ~/Documents/git/haxtheweb
git clone https://github.com/YOUR_USERNAME/haxcms-nodejs.git
cd haxcms-nodejs
git remote add upstream https://github.com/haxtheweb/haxcms-nodejs.git
```

**Install and start:**
```bash
npm install
npm start
```
Visit http://localhost:3000 (it usually opens automatically). You should see the HAXcms interface load. That confirms the backend is running.

## webcomponents

The monorepo of 250+ LitElement web components, themes, and the DDD design system. This is where most component contributions happen.

**Fork and clone:**
```bash
cd ~/Documents/git/haxtheweb
git clone https://github.com/YOUR_USERNAME/webcomponents.git
cd webcomponents
git remote add upstream https://github.com/haxtheweb/webcomponents.git
```

**Install (uses yarn, from repo root):**
```bash
yarn install
```

**Start the dev server:**
```bash
yarn start
```
Open http://localhost:8000/elements/haxcms-elements/demo/ — you should see the HAX development interface. To work on a single component, open another terminal and run `cd elements/<ELEMENTNAME> && yarn run dev`, which watches and rebuilds that element while the dev server is still running.

For monorepo-specific detail (build commands, Lerna, DDD audits, testing, troubleshooting, theme development), see [`webcomponents/CONTRIBUTING.md`](https://github.com/haxtheweb/webcomponents/blob/master/CONTRIBUTING.md).

## create

The `hax` CLI for scaffolding web components and HAXsites.

**Fork and clone:**
```bash
cd ~/Documents/git/haxtheweb
git clone https://github.com/YOUR_USERNAME/create.git
cd create
git remote add upstream https://github.com/haxtheweb/create.git
```

**Install:**
```bash
npm install
```

**Get the `hax` command globally** so it's available everywhere:
```bash
npm install @haxtheweb/create --global
```

**Verify:** run `hax start` — you should see the interactive CLI (ASCII art via Clack) that scaffolds components and HAXsites. To work on the CLI source itself: `npm run build && node ./dist/create.js`.

## haxcms-php (optional)

The PHP backend for HAXcms — same capabilities as the Node.js version, different stack. Skip this unless you want to run the PHP backend.

**Fork and clone:**
```bash
cd ~/Documents/git/haxtheweb
git clone https://github.com/YOUR_USERNAME/haxcms-php.git
cd haxcms-php
git remote add upstream https://github.com/haxtheweb/haxcms-php.git
```

**Prerequisites (one of two paths):**

*Native PHP:*
- PHP 8.3 or higher with the `curl`, `zip`, `gd`, and `xml` modules installed
- Apache 2.4

*Container-based (recommended for most):*
- A container runtime — [Docker](https://docs.docker.com/get-started/get-docker/), [DDEV](https://ddev.readthedocs.io/), [docksal](https://docksal.io/), [lando](https://docs.devwithlando.io/), or [vagrant](https://www.vagrantup.com/)

**Quick install (script):**
```bash
curl -fsSL https://raw.githubusercontent.com/haxtheweb/haxcms-php/master/scripts/haxcmsme.sh -o haxcmsme.sh && sh haxcmsme.sh
```

**Container path (DDEV example):**
```bash
ddev start
```
Open the URL DDEV prints. Log in with `admin` / `admin` to confirm the CMS is working. For other runtimes use `fin init` (docksal), `lando start && lando magic` (lando), or `vagrant up` (vagrant).

For full PHP/container install instructions, see [`haxcms-php/README.md`](https://github.com/haxtheweb/haxcms-php/blob/master/README.md).

## Where to find issues

All HAX ecosystem bugs and features live in one unified queue:

- **Issue queue**: https://github.com/haxtheweb/issues/issues
- New contributors: look for the **`new here`** and **`good first issue`** labels.
- Documentation issues are often beginner-friendly.

Before starting work on an issue, comment on it saying you'd like to work on it and wait for a maintainer acknowledgment to avoid duplicate work.

## Join the community

- **Discord** (real-time help + discussion): https://discord.gg/EKYJAjqGhf
- **YouTube** (tutorials): https://www.youtube.com/@haxtheweb

## Next steps

- **Repo-specific contributing detail** (monorepo workflow, code standards, testing, troubleshooting, PR conventions for the webcomponents monorepo): [`webcomponents/CONTRIBUTING.md`](https://github.com/haxtheweb/webcomponents/blob/master/CONTRIBUTING.md)
- **Readable onboarding walkthrough** (this doc, presented as a tutorial site): https://learn-hax-developer-onboarding.surge.sh
- **Full documentation**: https://haxtheweb.org/
- **Scaffold your first component**: `hax webcomponent my-element --y`
- **Scaffold your first HAXsite**: `hax site mysite --y`
- **Run `hax party`** to see ways to get more involved.

## Contributing conventions

We work primarily with pull requests from forks.

- Fork the repo you want to contribute to; open a PR pointing at the associated issue.
- **Reference the issue** your PR resolves in the PR body (e.g. `fixes #123`). Do **not** put `@mentions` or `fixes` keywords in commit messages — put them in the PR body.
- Write clear commit messages; squash small PRs (typos, style) into a single commit.
- **Code style**: pure JavaScript (no TypeScript), single quotes, avoid semicolons, use `globalThis` over `window`, ES module imports. Code is auto-formatted with Prettier on commit.
- **Web components**: use `hax webcomponent <name> --y` to create new elements (never hand-create elements — the CLI ensures uniform packaging). Adhere to the DDD design system; run `hax audit` from a component root before submitting.
- **Testing**: run `yarn test` (webcomponents) or `npm test` per repo before opening a PR.
- For deep monorepo detail (build commands, Lerna, DDD audits, troubleshooting, theme development), see [`webcomponents/CONTRIBUTING.md`](https://github.com/haxtheweb/webcomponents/blob/master/CONTRIBUTING.md).

## Security

If you discover what you deem to be a critical security issue, reach out on our Discord channel privately to discuss whether it should be resolved in the open or whether disclosure should happen after a solution has been crafted. Do not open a public issue for security vulnerabilities.
