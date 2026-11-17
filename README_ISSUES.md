# GitHub Issues Management Tools

This repository contains tools for managing and searching through all GitHub issues from the `haxtheweb/issues` repository.

## Quick Stats

- **Total Issues**: 3,348 (as of 2026-11-17)
- **Open Issues**: 141
- **Closed Issues**: 3,207
- **Issue Range**: #1 to #3361
- **Pace (closed vs opened)**: last 7 days 100 closed / 83 opened; last 30 days 220 closed / 201 opened; 2026 YTD 904 closed / 833 opened. See [reports/2026-11-17-issue-pace.md](reports/2026-11-17-issue-pace.md) for the all-time monthly trend, label breakdowns, and issue-level sourcing.

## Tools Available

### 1. `fetch_issues.sh` - Issue Data Fetcher

Downloads all GitHub issues and saves them locally for fast searching.

```bash
./fetch_issues.sh
```

**Features:**
- Fetches all issues (open and closed) with full text
- Saves data as JSON with complete metadata
- Creates human-readable summary
- Handles GitHub API limitations gracefully
- Creates symlink to latest data for easy access

**Output Files:**
- `issues_data/all_issues_TIMESTAMP.json` - Raw JSON data
- `issues_data/latest_issues.json` - Symlink to most recent data
- `issues_data/issues_summary_TIMESTAMP.md` - Human-readable summary

### 2. `query_issues.sh` - Issue Search Tool

Query and search through locally cached issues.

```bash
# Show statistics
./query_issues.sh stats

# Search by keyword
./query_issues.sh search "web component"

# Find specific issue
./query_issues.sh number 2422

# Filter by state
./query_issues.sh state open
./query_issues.sh state closed

# Filter by author
./query_issues.sh author btopro

# Show recent issues
./query_issues.sh recent 20

# List all labels
./query_issues.sh labels

# Filter by label
./query_issues.sh label bug
```

## Data Structure

Each issue contains:
- `number` - Issue number
- `title` - Issue title
- `body` - Full issue description/body text
- `state` - "OPEN" or "CLOSED"
- `author` - Author information
- `createdAt`/`updatedAt` - Timestamps
- `labels` - Array of labels
- `assignees` - Array of assignees
- `url` - GitHub URL

## File Exclusions

The following files are gitignored to prevent accidentally committing large data files:
- `issues_data/` directory
- `*.issues.json` files
- `all_issues*.json` files
- `issue_cache*.json` files

## Usage Examples

### Finding Issues About Specific Topics
```bash
# Find accessibility issues
./query_issues.sh search "accessibility"

# Find HAXcms-related issues
./query_issues.sh label HAXcms

# Find recent bugs
./query_issues.sh label bug | head -20
```

### Research & Analysis
```bash
# Get overview of issue activity
./query_issues.sh stats

# See what specific author has worked on
./query_issues.sh author nikkimk

# Find open enhancement requests
./query_issues.sh label enhancement
```

### Keeping Data Current
Run the fetch script periodically to update your local cache:

```bash
# Update issue data
./fetch_issues.sh

# The script will create new timestamped files and update the symlink
```

## Performance Notes

- Initial fetch takes ~30-60 seconds for 3,300+ issues
- Local searches are nearly instantaneous
- All issue text is included for full-text search capabilities
- Data is stored efficiently as JSON for fast processing with `jq`

## Top Contributors

1. **btopro** - 2,829 issues (84.4%)
2. **nikkimk** - 75 issues
3. **Peter12G** - 58 issues
4. **WilliamMRose** - 42 issues
5. **rickhumphries** - 37 issues

## Most Common Labels

1. **HAX Lab ♎+🃏+🔥 > 💸** - 272 issues
2. **Features/Enhancements** - 237 issues
3. **API / Backend** - 201 issues
4. **UI / UX / Design System** - 178 issues
5. **HAX Core** - 173 issues
