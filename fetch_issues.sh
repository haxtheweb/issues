#!/bin/bash

# Script to fetch all GitHub issues from haxtheweb/issues repository
# Pulls issues in batches and saves them as JSON files with full text

set -e

REPO="haxtheweb/issues"
DATA_DIR="issues_data"
BATCH_SIZE=1000
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "🚀 Starting GitHub issues fetch for ${REPO}"
echo "📅 Timestamp: ${TIMESTAMP}"

# Create data directory if it doesn't exist
mkdir -p "${DATA_DIR}"

# Function to get total issue count first
get_total_issue_count() {
    echo "🔍 Getting total issue count..."
    
    # Get a small sample to check total available
    local temp_file="${DATA_DIR}/temp_count.json"
    timeout 30 gh issue list \
        --repo "${REPO}" \
        --state all \
        --limit 1 \
        --json number \
        > "${temp_file}" 2>/dev/null || {
        echo "❌ Failed to get issue count"
        return 1
    }
    
    # Get the highest issue number as an approximation
    local max_issue=$(jq '.[0].number // 0' "${temp_file}")
    rm -f "${temp_file}"
    
    echo "📊 Estimated total issues: ~${max_issue}"
    return 0
}

# Function to fetch all issues using different approach
fetch_all_issues() {
    local filename="${DATA_DIR}/all_issues_${TIMESTAMP}.json"
    
    echo "📥 Fetching ALL issues in one request..."
    echo "⚠️  This may take a while for 2600+ issues..."
    
    # Use a very high limit to get all issues at once
    # GitHub CLI should handle this better than pagination
    timeout 600 gh issue list \
        --repo "${REPO}" \
        --state all \
        --limit 5000 \
        --json number,title,body,state,author,createdAt,updatedAt,labels,assignees,url \
        > "${filename}" 2>/dev/null || {
        
        echo "⚠️  Command may have timed out or been interrupted"
        if [[ -f "${filename}" ]] && [[ -s "${filename}" ]]; then
            echo "✅ But file exists and has content, continuing..."
        else
            echo "❌ No usable data retrieved"
            return 1
        fi
    }
    
    # Check if we got data
    if [[ -f "${filename}" ]] && [[ -s "${filename}" ]]; then
        local count=$(jq length "${filename}" 2>/dev/null || echo "0")
        echo "✅ Retrieved ${count} issues in ${filename}"
        
        # Create the latest symlink
        ln -sf "$(basename "${filename}")" "${DATA_DIR}/latest_issues.json"
        echo "🔗 Latest issues symlink: ${DATA_DIR}/latest_issues.json"
        
        return 0
    else
        echo "❌ Failed to fetch issues"
        return 1
    fi
}

# Get estimated count first
get_total_issue_count

# Fetch all issues in one go
if fetch_all_issues; then
    master_file="${DATA_DIR}/all_issues_${TIMESTAMP}.json"
    total_issues=$(jq length "${master_file}" 2>/dev/null || echo "0")
    
    echo ""
    echo "📊 Fetch Summary:"
    echo "   Total issues retrieved: ${total_issues}"
    echo "   Master file: ${master_file}"
else
    echo "❌ Failed to fetch issues"
    exit 1
fi

# Create human-readable summary
if [[ -f "${master_file}" ]]; then
    echo ""
    echo "📋 Creating human-readable summary..."
    summary_file="${DATA_DIR}/issues_summary_${TIMESTAMP}.md"
    
    jq -r '
    "# GitHub Issues Summary - " + (now | strftime("%Y-%m-%d %H:%M:%S")) + "\n" +
    "Total Issues: " + (length | tostring) + "\n\n" +
    "## Statistics\n" +
    "- Open Issues: " + ([.[] | select(.state == "OPEN")] | length | tostring) + "\n" +
    "- Closed Issues: " + ([.[] | select(.state == "CLOSED")] | length | tostring) + "\n\n" +
    "## Recent Issues (Last 10)\n" +
    (sort_by(.createdAt) | reverse | .[0:10] | map(
     "- #" + (.number | tostring) + ": " + .title + " (" + .state + ")") | join("\n")) + "\n\n" +
    "## Issue Range\n" +
    "- Lowest Issue #: " + ([.[] | .number] | min | tostring) + "\n" +
    "- Highest Issue #: " + ([.[] | .number] | max | tostring) + "\n" +
    "\n---\nGenerated from: " + input_filename
    ' "${master_file}" > "${summary_file}"
    
    echo "📋 Summary created: ${summary_file}"
else
    echo "❌ No master file to summarize"
fi

echo ""
echo "🎉 Issue fetch completed!"
echo "📁 Data saved in: ${DATA_DIR}/"
echo "🔍 Use query_issues.sh to search through the data"