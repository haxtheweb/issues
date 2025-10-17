#!/bin/bash

# Weekly HAX Productivity Post Automation
# This script fetches latest issue data and posts to LinkedIn

set -e  # Exit on any error

echo "🎯 HAX Weekly Productivity Automation"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in the right directory
if [[ ! -f "fetch_issues.sh" ]]; then
    print_error "Not in the issues directory. Please run from ~/Documents/git/haxtheweb/issues/"
    exit 1
fi

# Check dependencies
print_status "Checking dependencies..."

if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Please install Node.js"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    print_error "jq not found. Please install jq: sudo apt install jq"
    exit 1
fi

print_success "Dependencies OK"

# Step 1: Fetch latest issue data
print_status "Fetching latest issue data..."
if ./fetch_issues.sh; then
    print_success "Issue data updated successfully"
else
    print_error "Failed to fetch issue data"
    exit 1
fi

# Step 2: Check if LinkedIn is configured
if [[ ! -f "linkedin-config.json" ]]; then
    print_warning "LinkedIn not configured yet"
    echo ""
    echo "🔧 Setup required:"
    echo "   1. Run: node setup-linkedin.js"
    echo "   2. Follow the setup instructions"
    echo "   3. Re-run this script"
    echo ""
    read -p "Run LinkedIn setup now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        node setup-linkedin.js
    else
        print_warning "Skipping LinkedIn setup. You can run it later with: node setup-linkedin.js"
        exit 0
    fi
fi

# Step 3: Check token expiry
print_status "Checking LinkedIn token expiry..."
if [[ -f "linkedin-config.json" ]]; then
    # Extract creation date and expires_in using jq
    created_at=$(jq -r '.createdAt' linkedin-config.json)
    expires_in=$(jq -r '.expiresIn' linkedin-config.json)
    
    if [[ "$created_at" != "null" && "$expires_in" != "null" ]]; then
        # Convert to timestamps (requires GNU date)
        if command -v gdate &> /dev/null; then
            # macOS with GNU coreutils
            created_timestamp=$(gdate -d "$created_at" +%s)
        else
            # Linux
            created_timestamp=$(date -d "$created_at" +%s)
        fi
        
        current_timestamp=$(date +%s)
        elapsed=$((current_timestamp - created_timestamp))
        
        if [[ $elapsed -gt $expires_in ]]; then
            print_warning "LinkedIn token has expired"
            echo "🔄 Token refresh needed. Re-running setup..."
            node setup-linkedin.js
        else
            remaining=$((expires_in - elapsed))
            hours=$((remaining / 3600))
            print_success "LinkedIn token valid (expires in ${hours} hours)"
        fi
    fi
fi

# Step 4: Generate and post
print_status "Generating productivity post..."
if node post-to-linkedin.js; then
    print_success "Weekly productivity post completed!"
else
    print_error "Failed to generate/post content"
    exit 1
fi

# Step 5: Optional - show recent activity summary
echo ""
echo "📊 Recent Activity Summary:"
echo "=========================="

# Show last 5 issues created
echo ""
echo "🆕 Latest Issues Created:"
jq -r '.[] | select(.number >= 2455) | "  #\(.number) - \(.title)"' issues_data/latest_issues.json | head -5

# Show completion stats
total_recent=$(jq '[.[] | select(.number >= 2455)] | length' issues_data/latest_issues.json)
closed_recent=$(jq '[.[] | select(.number >= 2455 and .state == "CLOSED")] | length' issues_data/latest_issues.json)
completion_rate=$(echo "scale=0; $closed_recent * 100 / $total_recent" | bc -l 2>/dev/null || echo "0")

echo ""
echo "📈 This Week's Stats:"
echo "  • Total Issues: $total_recent"
echo "  • Resolved: $closed_recent"
echo "  • Completion Rate: ${completion_rate}%"

echo ""
print_success "Weekly automation complete! 🎉"
echo ""
echo "📋 Next steps:"
echo "  • Check your LinkedIn profile for the new post"
echo "  • Review post-history.json for records"
echo "  • Schedule this script to run weekly via cron"
echo ""
echo "⏰ To automate weekly:"
echo "  crontab -e"
echo "  # Add: 0 9 * * 1 /path/to/weekly-post.sh"
echo "  # (Runs every Monday at 9 AM)"