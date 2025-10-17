# HAX LinkedIn Productivity Automation 🚀

Automated system for posting weekly productivity updates to LinkedIn based on your GitHub issue analysis.

## Features

✅ **Automated Issue Analysis** - Processes your issue queue for weekly stats  
✅ **Smart Categorization** - Groups issues by accessibility, UX, performance, etc.  
✅ **LinkedIn API Integration** - Posts directly to your LinkedIn profile  
✅ **History Tracking** - Keeps records of all posts in `post-history.json`  
✅ **Token Management** - Handles LinkedIn OAuth and token refresh  
✅ **Flexible Posting** - Supports both LinkedIn and Twitter formats  

## Quick Start

### 1. Initial Setup
```bash
# Run the LinkedIn setup (one-time only)
node setup-linkedin.js
```

This will:
- Guide you through creating a LinkedIn Developer App
- Handle OAuth authentication 
- Save your credentials securely

### 2. Weekly Posting
```bash
# Manual run
node post-to-linkedin.js

# Or use the full automation script
./weekly-post.sh
```

### 3. Automation (Optional)
```bash
# Add to crontab for weekly automation
crontab -e

# Run every Monday at 9 AM
0 9 * * 1 /home/bto108a/Documents/git/haxtheweb/issues/weekly-post.sh
```

## How It Works

### Issue Analysis
The script analyzes your recent GitHub issues (typically #2455+) and categorizes them:

- 🐛 **Bug Fixes** - Issues with "bug", "fix" labels/titles
- ✨ **Enhancements** - Feature requests and improvements  
- ♿ **Accessibility** - A11y improvements and compliance
- ⚡ **Performance** - Speed and optimization work
- 🎨 **UX Design** - User experience improvements
- 🛠️ **Developer Experience** - Tooling and DX improvements
- 🧹 **Code Cleanup** - Refactoring and maintenance

### Post Generation
Creates professional LinkedIn posts with:
- Weekly issue creation/resolution stats
- Completion percentage
- Top focus areas with emojis
- Overall project health metrics
- Relevant hashtags

### Example Output
```
🚀 This Week's Open Source Momentum

📈 Issue Processing:
• 20 new issues created
• 15 issues resolved  
• 75% completion rate

🎯 Key Focus Areas:
♿ Accessibility (4)
🧹 Code Cleanup (3)
🛠️ Developer Experience (3)
🎨 UX Design (2)

📊 Project Health:
• 2,470 total issues tracked
• 91.2% overall resolution rate
• 216 active issues

Building sustainable #WebComponents for the open web! 💪

#OpenSource #HAXTheWeb #WebDevelopment #ProductivityUpdate #Developer
```

## File Structure

```
issues/
├── setup-linkedin.js          # One-time LinkedIn API setup
├── post-to-linkedin.js         # Main posting script
├── weekly-post.sh              # Complete automation wrapper
├── linkedin-config.json        # Your LinkedIn credentials (auto-generated)
├── post-history.json          # History of all posts (auto-generated)
├── issues_data/
│   └── latest_issues.json     # Your GitHub issues data
└── README_LINKEDIN_AUTOMATION.md
```

## Configuration Files

### linkedin-config.json (auto-generated)
```json
{
  "clientId": "your-linkedin-app-client-id",
  "clientSecret": "your-linkedin-app-client-secret", 
  "accessToken": "your-oauth-access-token",
  "refreshToken": "your-refresh-token",
  "personId": "your-linkedin-person-id",
  "name": "Your Name",
  "expiresIn": 5184000,
  "createdAt": "2024-10-17T13:47:14.000Z"
}
```

### post-history.json (auto-generated)
```json
[
  {
    "date": "2024-10-17",
    "stats": { "thisWeek": {...}, "overall": {...} },
    "linkedinPost": "🚀 This Week's Open Source...",
    "twitterPost": "🚀 This Week in Open Source...",
    "posted": true
  }
]
```

## LinkedIn App Setup

### Prerequisites
1. LinkedIn Developer Account
2. LinkedIn Company or Personal Page

### App Configuration
1. **Create App**: https://www.linkedin.com/developers/apps
2. **App Details**:
   - Name: "HAX Productivity Tracker" 
   - LinkedIn Page: Your page
   - App use: "Other"
3. **Products**: Add "Share on LinkedIn"
4. **Auth**: Add redirect URL: `http://localhost:3000/callback`
5. **Copy**: Client ID and Client Secret

## Troubleshooting

### Common Issues

**❌ "LinkedIn config not found"**
- Run `node setup-linkedin.js` first

**❌ "Issues data not found"** 
- Run `./fetch_issues.sh` to get latest data

**❌ "Token has expired"**
- The script will auto-detect and re-run setup

**❌ LinkedIn API errors**
- Check app permissions include "Share on LinkedIn"
- Verify redirect URI is exactly: `http://localhost:3000/callback`
- Ensure app is not in development restrictions

### Testing
```bash
# Dry run (generate posts without posting)
node post-to-linkedin.js --dry-run

# Test with current data
node post-to-linkedin.js
```

## Customization

### Modify Issue Date Range
Edit `post-to-linkedin.js` line 35:
```javascript
// Change this number to adjust "recent" issues
const recentIssues = this.issuesData.filter(issue => issue.number >= 2455);
```

### Modify Categories
Edit the `categorizeIssues()` method to add/remove categories or change detection logic.

### Modify Post Format
Edit `generateLinkedInPost()` and `generateTwitterPost()` methods to customize the output format.

## Security Notes

- `linkedin-config.json` contains sensitive credentials - never commit to git
- Access tokens expire (usually 60 days) - script handles refresh automatically
- App client secret should be kept secure

## Support

For issues with this automation:
1. Check the troubleshooting section above
2. Review LinkedIn Developer documentation
3. Check your app configuration at https://www.linkedin.com/developers/apps

---

**Happy automating! 🤖✨**