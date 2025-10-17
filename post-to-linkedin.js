#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

class LinkedInPoster {
  constructor() {
    this.config = this.loadConfig();
    this.issuesData = this.loadIssuesData();
    this.manualMode = !this.config;
  }

  loadConfig() {
    const configPath = path.join(os.homedir(), '.hax-linkedin-config.json');
    if (!fs.existsSync(configPath)) {
      console.log('⚠️  LinkedIn API not configured - using manual mode');
      console.log('💡 Run: node setup-linkedin.js to configure API access');
      return null;
    }
    
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      // Check if token is expired (with 5 minute buffer)
      const createdAt = new Date(config.createdAt);
      const expiresAt = new Date(createdAt.getTime() + (config.expiresIn * 1000));
      const now = new Date();
      const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      
      if (now.getTime() > (expiresAt.getTime() - bufferTime)) {
        console.log('⚠️  Access token expired - using manual mode');
        console.log('💡 Run: node setup-linkedin.js to refresh token');
        return null;
      }
      
      console.log(`✅ LinkedIn API configured for: ${config.name}`);
      return config;
    } catch (error) {
      console.log('⚠️  Invalid LinkedIn config - using manual mode');
      console.log('💡 Run: node setup-linkedin.js to reconfigure');
      return null;
    }
  }

  loadIssuesData() {
    const dataPath = path.join(__dirname, 'issues_data', 'latest_issues.json');
    if (!fs.existsSync(dataPath)) {
      console.error('❌ Issues data not found. Run ./fetch_issues.sh first.');
      process.exit(1);
    }
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  async generateWeeklyStats() {
    console.log('📊 Analyzing issue data...');
    
    // Get issues from the last week (issues #2455 and above based on recent analysis)
    const recentIssues = this.issuesData.filter(issue => issue.number >= 2455);
    const closedIssues = recentIssues.filter(issue => issue.state === 'CLOSED');
    
    // Author breakdown
    const authorStats = recentIssues.reduce((acc, issue) => {
      const author = issue.author.login;
      acc[author] = (acc[author] || 0) + 1;
      return acc;
    }, {});

    // Category analysis
    const categories = this.categorizeIssues(recentIssues);
    
    // Overall stats
    const totalIssues = this.issuesData.length;
    const totalClosed = this.issuesData.filter(issue => issue.state === 'CLOSED').length;
    const resolutionRate = ((totalClosed / totalIssues) * 100).toFixed(1);

    return {
      thisWeek: {
        created: recentIssues.length,
        resolved: closedIssues.length,
        completionRate: ((closedIssues.length / recentIssues.length) * 100).toFixed(0),
        authors: authorStats,
        categories
      },
      overall: {
        total: totalIssues,
        resolved: totalClosed,
        active: totalIssues - totalClosed,
        resolutionRate
      }
    };
  }

  categorizeIssues(issues) {
    const categories = {
      accessibility: 0,
      performance: 0,
      ux: 0,
      dx: 0,
      bugfix: 0,
      enhancement: 0,
      cleanup: 0
    };

    issues.forEach(issue => {
      const title = issue.title.toLowerCase();
      const labels = issue.labels?.map(l => l.name.toLowerCase()) || [];
      
      if (labels.includes('pillar: accessibility') || title.includes('a11y') || title.includes('accessibility')) {
        categories.accessibility++;
      }
      if (labels.includes('performance') || title.includes('performance') || title.includes('optimization')) {
        categories.performance++;
      }
      if (labels.includes('ux') || title.includes('user experience')) {
        categories.ux++;
      }
      if (labels.includes('dx') || title.includes('developer experience')) {
        categories.dx++;
      }
      if (labels.includes('bug') || title.includes('bug') || title.includes('fix')) {
        categories.bugfix++;
      }
      if (labels.includes('enhancement') || title.includes('feature')) {
        categories.enhancement++;
      }
      if (title.includes('cleanup') || title.includes('remove') || title.includes('refactor')) {
        categories.cleanup++;
      }
    });

    return categories;
  }

  generateLinkedInPost(stats) {
    const { thisWeek, overall } = stats;
    
    // Get top categories this week
    const topCategories = Object.entries(thisWeek.categories)
      .filter(([_, count]) => count > 0)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 4)
      .map(([cat, count]) => `${this.formatCategory(cat)} (${count})`)
      .join('\n');

    const post = `🚀 This Week's Open Source Momentum

📈 Issue Processing:
• ${thisWeek.created} new issues created
• ${thisWeek.resolved} issues resolved
• ${thisWeek.completionRate}% completion rate

🎯 Key Focus Areas:
${topCategories}

📊 Project Health:
• ${overall.total.toLocaleString()} total issues tracked
• ${overall.resolutionRate}% overall resolution rate
• ${overall.active} active issues

Building sustainable #WebComponents for the open web! 💪

#OpenSource #HAXTheWeb #WebDevelopment #ProductivityUpdate #Developer`;

    return post;
  }

  generateTwitterPost(stats) {
    const { thisWeek, overall } = stats;
    
    return `🚀 This Week in Open Source

${thisWeek.created} new → ${thisWeek.resolved} resolved (${thisWeek.completionRate}%)

${overall.total.toLocaleString()} total | ${overall.resolutionRate}% resolution rate

Building sustainable #WebComponents! 

#OpenSource #HAXTheWeb`;
  }

  formatCategory(category) {
    const categoryMap = {
      accessibility: '♠ Accessibility',
      performance: '⚡ Performance', 
      ux: '🎨 UX Design',
      dx: '🛠️ Developer Experience',
      bugfix: '🐛 Bug Fixes',
      enhancement: '✨ Enhancements',
      cleanup: '🧹 Code Cleanup'
    };
    return categoryMap[category] || category;
  }

  generateTwitterFromCustom(customContent) {
    // Create a condensed Twitter version of custom content
    const lines = customContent.split('\n').filter(line => line.trim());
    const firstLine = lines[0] || 'LinkedIn post content';
    
    // Try to extract key points and keep under 280 chars
    let twitterPost = firstLine;
    if (twitterPost.length > 200) {
      twitterPost = twitterPost.substring(0, 200) + '...';
    }
    
    // Add relevant hashtags if not already present
    if (!customContent.includes('#')) {
      twitterPost += '\n\n#HAXTheWeb #OpenSource';
    }
    
    return twitterPost;
  }

  async postToLinkedIn(content) {
    if (this.manualMode) {
      return this.manualPost(content);
    }
    
    console.log('📤 Posting to LinkedIn...');
    
    const postData = {
      author: `urn:li:person:${this.config.personId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    try {
      const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Successfully posted to LinkedIn!');
        console.log(`🔗 Post ID: ${result.id}`);
        return true;
      } else {
        const error = await response.text();
        console.error('❌ LinkedIn API error:', response.status, error);
        console.log('\n🔄 Falling back to manual mode...');
        return this.manualPost(content);
      }
    } catch (error) {
      console.error('❌ Network error:', error.message);
      console.log('\n🔄 Falling back to manual mode...');
      return this.manualPost(content);
    }
  }

  manualPost(content) {
    console.log('\n📋 Manual LinkedIn Posting Mode');
    console.log('─'.repeat(50));
    
    // Try to copy to clipboard
    try {
      const fs = require('fs');
      const { execSync } = require('child_process');
      
      fs.writeFileSync('/tmp/linkedin-post.txt', content);
      execSync('echo "' + content.replace(/"/g, '\\"') + '" | xclip -selection clipboard', { stdio: 'ignore' });
      console.log('📋 Content copied to clipboard!');
    } catch (clipError) {
      console.log('📋 Content ready for manual copy:');
    }
    
    console.log('\n🔗 Quick Actions:');
    console.log('1. Content is copied to your clipboard');
    console.log('2. Click this link: https://www.linkedin.com/feed/');
    console.log('3. Click "Start a post" and paste');
    console.log('4. Click "Post" to publish');
    
    // Try to open LinkedIn
    try {
      const { execSync } = require('child_process');
      execSync('xdg-open "https://www.linkedin.com/feed/"', { stdio: 'ignore' });
      console.log('\n🌐 LinkedIn opened in your browser!');
    } catch (openError) {
      console.log('\n🌐 Please open: https://www.linkedin.com/feed/');
    }
    
    return true;
  }

  async run(customContent = null) {
    const isCustomPost = !!customContent;
    
    console.log(isCustomPost ? 
      '🎯 LinkedIn Custom Content Poster\n' : 
      '🎯 HAX Issue Data → LinkedIn Automation\n');
    
    try {
      let linkedinPost, twitterPost, stats = null;
      
      if (isCustomPost) {
        // Use provided custom content
        linkedinPost = customContent;
        twitterPost = this.generateTwitterFromCustom(customContent);
        console.log('📝 Using provided custom content');
      } else {
        // Generate stats
        stats = await this.generateWeeklyStats();
        
        // Generate posts
        linkedinPost = this.generateLinkedInPost(stats);
        twitterPost = this.generateTwitterPost(stats);
      }
      
      console.log('📝 Generated LinkedIn Post:');
      console.log('─'.repeat(50));
      console.log(linkedinPost);
      console.log('─'.repeat(50));
      
      console.log('\n📱 Generated Twitter Post:');
      console.log('─'.repeat(30));
      console.log(twitterPost);
      console.log('─'.repeat(30));
      
      // Ask for confirmation
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const promptText = this.manualMode ? 
        '\n🚀 Open LinkedIn for posting? (y/N): ' : 
        '\n🚀 Post to LinkedIn? (y/N): ';
      
      const answer = await new Promise(resolve => {
        readline.question(promptText, resolve);
      });
      readline.close();
      
      if (answer.toLowerCase() === 'y') {
        const success = await this.postToLinkedIn(linkedinPost);
        if (success) {
          // Save posts for record keeping
          const timestamp = new Date().toISOString().split('T')[0];
          const record = {
            date: timestamp,
            type: isCustomPost ? 'custom' : 'issues-summary',
            stats: isCustomPost ? null : stats,
            linkedinPost,
            twitterPost,
            posted: this.manualMode ? 'manual' : true,
            method: this.manualMode ? 'manual' : 'api'
          };
          
          const recordsPath = path.join(__dirname, 'post-history.json');
          let history = [];
          if (fs.existsSync(recordsPath)) {
            history = JSON.parse(fs.readFileSync(recordsPath, 'utf8'));
          }
          history.push(record);
          fs.writeFileSync(recordsPath, JSON.stringify(history, null, 2));
          
          const modeText = this.manualMode ? 'generated and opened for manual posting' : 'posted via API';
          console.log(`\n📊 Stats and posts ${modeText}, saved to post-history.json`);
        }
      } else {
        console.log('📋 Posts generated but not posted. Use --dry-run flag to skip confirmation.');
      }
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}
// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🎯 HAX LinkedIn Poster

Usage: 
  node post-to-linkedin.js [options]              # Issues summary mode
  node post-to-linkedin.js --custom "content"      # Custom content mode
  echo "content" | node post-to-linkedin.js --stdin # Pipe content mode

Options:
  --custom "text"  Post custom content instead of issues summary
  --stdin          Read content from stdin (pipe mode)
  --dry-run        Generate posts without posting
  --help, -h       Show this help message

Examples:
  # Issues summary (default)
  node post-to-linkedin.js
  
  # Custom post
  node post-to-linkedin.js --custom "Just had a great discussion about web components!"
  
  # Pipe mode (useful with AI conversations)
  echo "Summary of our conversation about accessibility in web components" | node post-to-linkedin.js --stdin

Setup required:
  1. Run: node setup-linkedin.js
  2. Configure LinkedIn API credentials
  3. Run this script
  `);
  process.exit(0);
}

async function main() {
  const poster = new LinkedInPoster();
  
  // Handle custom content modes
  if (args.includes('--custom')) {
    const customIndex = args.indexOf('--custom');
    const customContent = args[customIndex + 1];
    if (!customContent) {
      console.error('❌ Error: --custom requires content as next argument');
      process.exit(1);
    }
    await poster.run(customContent);
  } else if (args.includes('--stdin')) {
    // Read from stdin
    let stdinContent = '';
    process.stdin.setEncoding('utf8');
    
    for await (const chunk of process.stdin) {
      stdinContent += chunk;
    }
    
    if (!stdinContent.trim()) {
      console.error('❌ Error: No content received from stdin');
      process.exit(1);
    }
    
    await poster.run(stdinContent.trim());
  } else {
    // Default issues summary mode
    await poster.run();
  }
}

main().catch(console.error);
