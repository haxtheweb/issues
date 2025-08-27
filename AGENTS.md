AGENTS.md
This file provides instructions for AI coding agents working with a project in the HAX ecosystem, using the HAX CLI (@haxtheweb/create) to create web components or HAXsites. Follow these guidelines to set up, develop, test, and contribute to this project.
Project Overview
This project leverages the HAX CLI to build HAX-compatible web components (based on LitElement) and HAXsites (static, file-backed websites using HAXcms). The HAX ecosystem emphasizes rapid development, accessibility, and adherence to the DDD design system. For more details, refer to the HAX CLI documentation and HAXTheWeb.
Setup Commands

Install HAX CLI globally:npm install @haxtheweb/create --global


Install project dependencies (run from the project root):npm install


Start interactive CLI (for web components or HAXsites):hax start


Launches an interactive CLI with ASCII art (via Clack).


Start development server (for HAXsites):hax serve


Launches the site in development mode at http://localhost.


Create a new web component:hax webcomponent my-element --y


Creates a LitElement-based web component with DDD design system and i18n support.
In a monorepo, places the component in the correct location and inherits settings.


Create a new HAXsite:hax site mysite --y


Generates a HAXcms-based static site with templated files.


Update HAX CLI:hax update


Alternative usage (one-time execution without global install):npx @haxtheweb/create

ornpm init @haxtheweb


Windows-specific setup:
If issues occur, set a custom npm cache path:npm config set cache C:\tmp\nodejs\npm-cache --global


For PowerShell, check execution policy to allow scripts:Get-ExecutionPolicy

Adjust if needed using Set-ExecutionPolicy (see Microsoft documentation).



Code Style

Language: JavaScript with LitElement for web components.
TypeScript: Optional but encouraged for strict type checking in new components.
Formatting:
Use single quotes (').
Avoid semicolons where possible.
Prefer functional programming patterns.


Design System: Adhere to the DDD (HAX design system) for consistent styling.
Use provided CSS variables for theming (included via DDDSuper class).
Reference .dddignore file to exclude irrelevant files during audits.


HAX Properties: Include haxProperties in web components for HAX compatibility (use --writeHaxProperties flag when creating components).
File Structure:
Web components: Place source files in src/ or lib/ directories.
HAXsites: Pages in pages/, themes in theme/, assets in assets/.


Internationalization (i18n): Use provided i18n wiring for web components (automatically included with hax webcomponent).
Naming:
Web component names should be hyphenated (e.g., my-element).
Package names in package.json should match the component/site name.



Testing Instructions

Run tests (from project or component root):npm test


Audit web components for DDD compliance:hax audit


Checks CSS and structure against DDD design system standards.
Ignores files listed in .dddignore (e.g., /node_modules, *.md).
Run from the root of a component project for accurate results.


Linting:npm run lint


Ensures code style compliance before committing.


Fix issues:
Address test or audit failures before submitting changes.
Update or add tests in test/ directory to cover new or modified code.


Monorepo testing:npm run test --filter <component_name>


Runs tests for a specific component in a monorepo.


Example .dddignore template:/node_modules
/dist
/build
/public
/test
/.github
/.vscode
/.idea
/locales
LICENSE
.dddignore
.editorconfig
.gitignore
.npmignore
*.md
*.yml
*.json
*.png
*.svg



Pull Request Instructions

PR Title Format: [<project_name>] <Descriptive Title>
Example: [my-element] Add dynamic property binding


Pre-commit checks:
Run npm test to ensure all tests pass.
Run npm run lint to verify code style.
Run hax audit for web components to confirm DDD compliance.


Commit Guidelines:
Use clear, descriptive commit messages (e.g., "Add i18n support to my-element").
Include relevant changes to tests or documentation.


HAXsite PRs:
Test locally with hax serve to verify page rendering.
Ensure new pages or content updates align with site.json and JSON Outline Schema.



CLI Command Options
The HAX CLI supports various options for fine-tuned control. Use hax help, hax webcomponent --help, or hax site --help for details. Key options include:

--v: Verbose output.
--debug: Developer-focused output.
--format <char>: Output format (json, yaml; default: json).
--path <char>: Directory to perform operation.
--name <char>: Project or component name.
--npm-client <char>: Package manager (npm, yarn, pnpm; default: npm).
--y or --auto: Auto-accept all prompts.
--skip: Skip animations for faster execution.
--quiet: Suppress console logging.
--no-i: Prevent interactive sub-processes (ideal for scripting).
--to-file <char>: Redirect output to a file.
--no-extras: Skip automatic command processing.
--root <char>: Root directory for command execution.
--org <char>: Organization for package.json.
--author <char>: Author for site or package.json.
--writeHaxProperties: Write haxProperties for web components.
--import-site <char>: URL of site to import.
--import-structure <char>: Import method (e.g., pressbooksToSite, htmlToSite).
--custom-theme-name <char>: Custom theme name for HAXsites.
--custom-theme-template <char>: Theme template (base, polaris-flex, polaris-sidebar).
--repos <char...>: Repositories to clone.

Additional Instructions

Monorepo Support:
Place additional AGENTS.md files in subproject folders (e.g., elements/my-element/AGENTS.md) for component-specific instructions.
The closest AGENTS.md to the edited file takes precedence.


Importing Sites:
Import content from external sources:hax site --import-site https://example.com --import-structure htmlToSite

Supported methods: pressbooksToSite, elmslnToSite, haxcmsToSite, notionToSite, gitbookToSite, evolutionToSite, htmlToSite, docxToSite.


Theme Development:
Create custom themes:hax site --custom-theme-name my-theme --custom-theme-template base


Supported templates: base, polaris-flex, polaris-sidebar.


Site Management:
Add a page:hax site --title "New Page" --content "<p>Content</p>" --slug "new-page"


Specify additional options like --parent, --order, --theme, or --hide-in-menu.


Community Engagement:
Run hax party to join the HAX community and explore involvement opportunities.
Join the HAX Discord: https://bit.ly/hax-discord.
Report issues: https://github.com/haxtheweb/issues/issues.
Use “Issue” in HAX spaces to start a report via Merlin.


Manual Access (Linux/macOS):
Run man hax for detailed CLI documentation.



Security Considerations

Dependencies: Keep dependencies updated before running npm install.
Sensitive Data: Avoid committing API keys or sensitive data to package.json, site.json, or public files.
Site Imports: Validate source URLs when using --import-site to prevent malicious content.
File Permissions: Ensure scripts like aiHax.sh have correct execution permissions (chmod +x aiHax.sh).

