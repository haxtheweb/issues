#!/bin/bash

# Script to query and search through locally cached GitHub issues
# Provides various search and filtering options

set -e

DATA_DIR="issues_data"
LATEST_FILE="${DATA_DIR}/latest_issues.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

show_help() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  stats           Show issue statistics"
    echo "  search <term>   Search issues by title and body"
    echo "  number <num>    Find specific issue by number"
    echo "  state <state>   Filter by state (open/closed)"
    echo "  author <user>   Filter by author"
    echo "  recent [N]      Show N most recent issues (default: 10)"
    echo "  labels          List all unique labels"
    echo "  label <label>   Filter by specific label"
    echo "  help            Show this help"
    echo ""
    echo "Examples:"
    echo "  $0 stats"
    echo "  $0 search 'web component'"
    echo "  $0 number 123"
    echo "  $0 state open"
    echo "  $0 recent 20"
    echo "  $0 author btopro"
    echo "  $0 label bug"
}

check_data() {
    if [[ ! -f "${LATEST_FILE}" ]]; then
        echo -e "${RED}❌ No issue data found!${NC}"
        echo -e "${YELLOW}💡 Run ./fetch_issues.sh first to download issues${NC}"
        exit 1
    fi
}

show_stats() {
    check_data
    
    echo -e "${CYAN}📊 GitHub Issues Statistics${NC}"
    echo ""
    
    local total=$(jq 'length' "${LATEST_FILE}")
    local open=$(jq '[.[] | select(.state == "OPEN")] | length' "${LATEST_FILE}")
    local closed=$(jq '[.[] | select(.state == "CLOSED")] | length' "${LATEST_FILE}")
    
    echo -e "${GREEN}Total Issues: ${total}${NC}"
    echo -e "${BLUE}Open Issues: ${open}${NC}"
    echo -e "${PURPLE}Closed Issues: ${closed}${NC}"
    
    echo ""
    echo -e "${YELLOW}📈 Top 10 Authors:${NC}"
    jq -r '[.[] | .author.login] | group_by(.) | map({author: .[0], count: length}) | sort_by(.count) | reverse | .[0:10] | .[] | "  \(.author): \(.count)"' "${LATEST_FILE}"
    
    echo ""
    echo -e "${YELLOW}🏷️  Top 10 Labels:${NC}"
    jq -r '[.[] | .labels[]?.name // empty] | group_by(.) | map({label: .[0], count: length}) | sort_by(.count) | reverse | .[0:10] | .[] | "  \(.label): \(.count)"' "${LATEST_FILE}"
}

search_issues() {
    check_data
    local term="$1"
    
    if [[ -z "$term" ]]; then
        echo -e "${RED}❌ Search term required${NC}"
        exit 1
    fi
    
    echo -e "${CYAN}🔍 Searching for: '${term}'${NC}"
    echo ""
    
    jq -r --arg term "$term" '
    [.[] | select((.title | ascii_downcase | contains($term | ascii_downcase)) or (.body // "" | ascii_downcase | contains($term | ascii_downcase)))] |
    sort_by(.number) | reverse |
    .[] |
    "Issue #\(.number) (\(.state)): \(.title)\n  Author: \(.author.login) | Created: \(.createdAt | split("T")[0])\n  URL: \(.url)\n"
    ' "${LATEST_FILE}"
}

find_issue_by_number() {
    check_data
    local number="$1"
    
    if [[ -z "$number" ]]; then
        echo -e "${RED}❌ Issue number required${NC}"
        exit 1
    fi
    
    jq -r --arg num "$number" '
    .[] | select(.number == ($num | tonumber)) |
    "# Issue #\(.number): \(.title)\n\n**State:** \(.state)\n**Author:** \(.author.login)\n**Created:** \(.createdAt)\n**Updated:** \(.updatedAt)\n**URL:** \(.url)\n\n## Labels\n\(if .labels | length > 0 then [.labels[].name] | join(", ") else "None" end)\n\n## Description\n\(.body // "No description")\n"
    ' "${LATEST_FILE}"
}

filter_by_state() {
    check_data
    local state="$1"
    
    if [[ -z "$state" ]]; then
        echo -e "${RED}❌ State required (open/closed)${NC}"
        exit 1
    fi
    
    echo -e "${CYAN}📋 Issues with state: ${state}${NC}"
    echo ""
    
    jq -r --arg state "$(echo $state | tr '[:lower:]' '[:upper:]')" '
    [.[] | select(.state == $state)] |
    sort_by(.number) | reverse |
    .[0:20] |
    .[] |
    "Issue #\(.number): \(.title)\n  Author: \(.author.login) | Created: \(.createdAt | split("T")[0])\n"
    ' "${LATEST_FILE}"
}

filter_by_author() {
    check_data
    local author="$1"
    
    if [[ -z "$author" ]]; then
        echo -e "${RED}❌ Author required${NC}"
        exit 1
    fi
    
    echo -e "${CYAN}👤 Issues by author: ${author}${NC}"
    echo ""
    
    jq -r --arg author "$author" '
    [.[] | select(.author.login == $author)] |
    sort_by(.number) | reverse |
    .[] |
    "Issue #\(.number) (\(.state)): \(.title)\n  Created: \(.createdAt | split("T")[0])\n"
    ' "${LATEST_FILE}"
}

show_recent() {
    check_data
    local count="${1:-10}"
    
    echo -e "${CYAN}📅 ${count} Most Recent Issues${NC}"
    echo ""
    
    jq -r --arg count "$count" '
    sort_by(.createdAt) | reverse |
    .[0:($count | tonumber)] |
    .[] |
    "Issue #\(.number) (\(.state)): \(.title)\n  Author: \(.author.login) | Created: \(.createdAt | split("T")[0])\n  URL: \(.url)\n"
    ' "${LATEST_FILE}"
}

list_labels() {
    check_data
    
    echo -e "${CYAN}🏷️  All Unique Labels${NC}"
    echo ""
    
    jq -r '[.[] | .labels[]?.name // empty] | unique | .[]' "${LATEST_FILE}" | sort
}

filter_by_label() {
    check_data
    local label="$1"
    
    if [[ -z "$label" ]]; then
        echo -e "${RED}❌ Label required${NC}"
        exit 1
    fi
    
    echo -e "${CYAN}🏷️  Issues with label: ${label}${NC}"
    echo ""
    
    jq -r --arg label "$label" '
    [.[] | select(.labels[]?.name == $label)] |
    sort_by(.number) | reverse |
    .[] |
    "Issue #\(.number) (\(.state)): \(.title)\n  Author: \(.author.login) | Created: \(.createdAt | split("T")[0])\n"
    ' "${LATEST_FILE}"
}

# Main command parsing
case "${1:-help}" in
    "stats")
        show_stats
        ;;
    "search")
        search_issues "$2"
        ;;
    "number")
        find_issue_by_number "$2"
        ;;
    "state")
        filter_by_state "$2"
        ;;
    "author")
        filter_by_author "$2"
        ;;
    "recent")
        show_recent "$2"
        ;;
    "labels")
        list_labels
        ;;
    "label")
        filter_by_label "$2"
        ;;
    "help"|*)
        show_help
        ;;
esac