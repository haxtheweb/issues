// Weekly ecosystem report (haxtheweb/issues#3262), run by
// .github/workflows/weekly-report.yml. Plain scripting, no AI, flag-only:
// it reads public GitHub data and posts one comment. It never closes,
// labels, edits or deletes anything.
//
//   GITHUB_TOKEN=... node scripts/weekly-report.mjs            post the comment
//   GITHUB_TOKEN=... node scripts/weekly-report.mjs --dry-run  print it instead
//
// Sections:
// - open issues in haxtheweb/issues with no activity for 90+ days
// - open PRs across the HAX repos with merge conflicts, failing checks or no
//   activity for 14+ days
// - branches whose pull request was merged or closed and that have no new
//   commits since (left over)
// - scheduled workflows whose latest run in the past week failed
//
// Titles and branch names come from other people, so they are data: they are
// only written as plain text with mentions, references and HTML neutralized.
// Node built-ins only.
import { Buffer } from "node:buffer";
import fs from "node:fs";
import https from "node:https";
import process from "node:process";
import { setTimeout as sleep } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const OWNER = "haxtheweb";
const ISSUES_REPO = "issues";
const REPORT_ISSUE = 3262;
const REPOS = [
  "webcomponents",
  "haxcms-nodejs",
  "haxcms-php",
  "create",
  "praw",
  "haxcms-mcp",
];
const STALE_ISSUE_DAYS = 90;
const STALE_PR_DAYS = 14;
const MAX_ROWS = 60;
const FAILED = new Set(["failure", "timed_out", "startup_failure"]);
const DAY = 24 * 60 * 60 * 1000;

const env = process.env;

function request(method, url, body) {
  const token = env.GITHUB_TOKEN || "";
  const payload = body ? JSON.stringify(body) : "";
  const target = url.startsWith("https://")
    ? new URL(url)
    : new URL(`https://api.github.com${url}`);
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: target.hostname,
        path: target.pathname + target.search,
        method,
        headers: Object.assign(
          {
            accept: "application/vnd.github+json",
            "x-github-api-version": "2022-11-28",
            "user-agent": "hax-weekly-report",
            "content-type": "application/json",
            "content-length": Buffer.byteLength(payload),
          },
          token ? { authorization: `Bearer ${token}` } : {},
        ),
      },
      (res) => {
        let text = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          text += chunk;
        });
        res.on("end", () => {
          if (res.statusCode < 200 || res.statusCode > 299) {
            reject(
              new Error(
                `${method} ${target.pathname} -> ${res.statusCode}: ${text.slice(0, 300)}`,
              ),
            );
            return;
          }
          try {
            resolve({ data: text ? JSON.parse(text) : {} });
          } catch (error) {
            reject(error);
          }
        });
      },
    );
    req.on("error", reject);
    req.end(payload);
  });
}

async function get(url) {
  return (await request("GET", url)).data;
}

// every page of a list endpoint (url has per_page=100); stop(item) ends
// early for lists sorted for it. Pages by number, so it stays on
// repos/{owner}/{repo} paths.
async function getAll(url, stop) {
  const out = [];
  for (let page = 1; page <= 100; page++) {
    const data = await get(`${url}&page=${page}`);
    const items = Array.isArray(data)
      ? data
      : data.workflow_runs || data.check_runs || [];
    for (const item of items) {
      if (stop && stop(item)) return out;
      out.push(item);
    }
    if (items.length < 100) break;
  }
  return out;
}

// plain text for markdown: no mentions, no #refs, no HTML, no table breaks
export function plain(value, max = 100) {
  let text = String(value === undefined || value === null ? "" : value)
    .replace(/[\r\n\t]+/g, " ")
    .trim();
  if (text.length > max) text = text.slice(0, max - 1) + "…";
  return text
    .replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c])
    .replace(/@/g, "@⁠") // word joiner: shown as @, never a mention
    .replace(/#/g, "#⁠") // never an issue reference
    .replace(/\|/g, "¦"); // a "|" would split the table cell
}

// text for inside a code span: one line, no backticks, no table breaks
function codeText(value, max = 80) {
  return String(value)
    .replace(/[\r\n\t]+/g, " ")
    .slice(0, max)
    .replace(/`/g, "'")
    .replace(/\|/g, "\u00a6");
}

function age(iso, now) {
  return Math.floor((now - Date.parse(iso)) / DAY);
}

function table(header, rows) {
  if (!rows.length) return ["None."];
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
  ];
  for (const row of rows.slice(0, MAX_ROWS))
    lines.push(`| ${row.join(" | ")} |`);
  if (rows.length > MAX_ROWS)
    lines.push("", `…and ${rows.length - MAX_ROWS} more.`);
  return lines;
}

async function staleIssues(now) {
  const cutoff = now - STALE_ISSUE_DAYS * DAY;
  const items = await getAll(
    `/repos/${OWNER}/${ISSUES_REPO}/issues?state=open&sort=updated&direction=asc&per_page=100`,
    (item) => Date.parse(item.updated_at) >= cutoff,
  );
  return items
    .filter((item) => !item.pull_request)
    .map((item) => [
      `[${OWNER}/${ISSUES_REPO}#${item.number}](${item.html_url})`,
      plain(item.title),
      `${age(item.updated_at, now)} days`,
    ]);
}

async function mergeState(repo, number) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const pr = await get(`/repos/${OWNER}/${repo}/pulls/${number}`);
    if (pr.mergeable !== null) return pr;
    await sleep(3000); // GitHub computes mergeability on first request
  }
  return get(`/repos/${OWNER}/${repo}/pulls/${number}`);
}

async function failingChecks(repo, sha) {
  const failing = [];
  const runs = await getAll(
    `/repos/${OWNER}/${repo}/commits/${sha}/check-runs?per_page=100`,
  );
  for (const run of runs)
    if (FAILED.has(run.conclusion)) failing.push(run.name);
  const status = await get(`/repos/${OWNER}/${repo}/commits/${sha}/status`);
  for (const s of status.statuses || [])
    if (s.state === "failure" || s.state === "error") failing.push(s.context);
  return Array.from(new Set(failing));
}

async function repoReport(repo, now) {
  const info = await get(`/repos/${OWNER}/${repo}`);
  const full = `${OWNER}/${repo}`;
  const open = await getAll(`/repos/${full}/pulls?state=open&per_page=100`);
  const prRows = [];
  const openRefs = new Set();
  for (const pr of open) {
    if (pr.head && pr.head.repo && pr.head.repo.full_name === full)
      openRefs.add(pr.head.ref);
    const flags = [];
    const detail = await mergeState(repo, pr.number);
    if (detail.mergeable === false || detail.mergeable_state === "dirty")
      flags.push("merge conflict");
    const failing = await failingChecks(repo, pr.head.sha);
    if (failing.length)
      flags.push(`failing: ${failing.map((n) => plain(n, 40)).join(", ")}`);
    const idle = age(pr.updated_at, now);
    if (idle >= STALE_PR_DAYS) flags.push(`no activity ${idle} days`);
    if (flags.length) {
      prRows.push([
        `[${full}#${pr.number}](${pr.html_url})${pr.draft ? " (draft)" : ""}`,
        plain(pr.title),
        flags.join("; "),
      ]);
    }
  }

  // newest closed PR per head branch of this repo
  const closedByRef = new Map();
  const closed = await getAll(
    `/repos/${full}/pulls?state=closed&sort=updated&direction=desc&per_page=100`,
  );
  for (const pr of closed) {
    if (!pr.head || !pr.head.repo || pr.head.repo.full_name !== full) continue;
    if (!closedByRef.has(pr.head.ref)) closedByRef.set(pr.head.ref, pr);
  }
  const branches = await getAll(`/repos/${full}/branches?per_page=100`);
  const branchRows = [];
  for (const branch of branches) {
    if (
      branch.name === info.default_branch ||
      branch.protected ||
      openRefs.has(branch.name)
    )
      continue;
    const pr = closedByRef.get(branch.name);
    // only when the branch has nothing newer than what the PR had
    if (!pr || pr.head.sha !== branch.commit.sha) continue;
    // the branch is linked; the PR is plain text, so a weekly list of old
    // PRs does not add a "mentioned this" event to each of them
    const tree = `https://github.com/${full}/tree/${branch.name
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/")}`;
    branchRows.push({
      closed: Date.parse(pr.closed_at || pr.updated_at),
      row: [
        `[\`${codeText(branch.name)}\`](${tree})`,
        `\`${full}#${pr.number}\` ${pr.merged_at ? "merged" : "closed unmerged"}`,
        `${age(pr.closed_at || pr.updated_at, now)} days ago`,
      ],
    });
  }
  branchRows.sort((x, y) => x.closed - y.closed);

  // latest scheduled run per workflow in the past week
  const since = new Date(now - 7 * DAY).toISOString().slice(0, 10);
  const runs = await getAll(
    `/repos/${full}/actions/runs?event=schedule&created=%3E%3D${since}&per_page=100`,
  );
  const latest = new Map();
  for (const run of runs) {
    const prev = latest.get(run.workflow_id);
    if (!prev || Date.parse(run.created_at) > Date.parse(prev.created_at))
      latest.set(run.workflow_id, run);
  }
  const scheduleRows = [];
  for (const run of latest.values()) {
    if (FAILED.has(run.conclusion)) {
      scheduleRows.push([
        `${full}`,
        `[${plain(run.name, 60)}](${run.html_url})`,
        run.conclusion,
        run.created_at.slice(0, 10),
      ]);
    }
  }
  return { prRows, branchRows: branchRows.map((b) => b.row), scheduleRows };
}

export async function buildReport(now = Date.now()) {
  const lines = [];
  const errors = [];
  const day = new Date(now).toISOString().slice(0, 10);
  lines.push(`## Weekly report, ${day}`);
  lines.push("");
  lines.push(
    "Flag-only and scripted (`.github/workflows/weekly-report.yml`, no AI): nothing was closed, labeled or deleted. Repos: " +
      REPOS.map((r) => `\`${r}\``).join(", ") +
      ".",
  );

  let issues = [];
  try {
    issues = await staleIssues(now);
  } catch (error) {
    errors.push(`stale issues: ${error.message}`);
  }
  const prRows = [];
  const branchRows = [];
  const scheduleRows = [];
  for (const repo of REPOS) {
    try {
      const r = await repoReport(repo, now);
      prRows.push(...r.prRows);
      branchRows.push(...r.branchRows);
      scheduleRows.push(...r.scheduleRows);
    } catch (error) {
      errors.push(`${repo}: ${error.message}`);
    }
  }

  lines.push(
    "",
    `### Open issues with no activity for ${STALE_ISSUE_DAYS}+ days (${issues.length})`,
    "",
  );
  lines.push(...table(["Issue", "Title", "Last activity"], issues));
  lines.push("", `### Open PRs to look at (${prRows.length})`, "");
  lines.push(
    `Merge conflicts, failing checks, or no activity for ${STALE_PR_DAYS}+ days.`,
    "",
  );
  lines.push(...table(["PR", "Title", "Flags"], prRows));
  lines.push("", `### Leftover branches (${branchRows.length})`, "");
  lines.push(
    "The branch's PR was merged or closed and the branch has no commits since. Grouped by repo, oldest first.",
    "",
  );
  lines.push(...table(["Branch", "PR", "Closed"], branchRows));
  lines.push(
    "",
    `### Scheduled workflows whose latest run failed (${scheduleRows.length})`,
    "",
  );
  lines.push(
    ...table(["Repo", "Workflow run", "Result", "Date"], scheduleRows),
  );
  if (errors.length) {
    lines.push("", "### Errors while building this report", "");
    for (const e of errors) lines.push(`- ${plain(e, 400)}`);
  }
  return { body: lines.join("\n") + "\n", errors };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const { body, errors } = await buildReport();
  if (env.GITHUB_STEP_SUMMARY) fs.appendFileSync(env.GITHUB_STEP_SUMMARY, body);
  if (dryRun) {
    process.stdout.write(body);
  } else {
    const { data } = await request(
      "POST",
      `/repos/${OWNER}/${ISSUES_REPO}/issues/${REPORT_ISSUE}/comments`,
      { body },
    );
    process.stdout.write(`posted ${data.html_url}\n`);
  }
  // a partial report is still posted; the run goes red so the error is seen
  return errors.length ? 1 : 0;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      const message = `weekly-report failed: ${error && error.message ? error.message : error}\n`;
      if (env.GITHUB_STEP_SUMMARY)
        fs.appendFileSync(env.GITHUB_STEP_SUMMARY, `\n${message}`);
      process.stderr.write(message);
      process.exitCode = 1;
    },
  );
}
