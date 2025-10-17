#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

class LinkedInSetup {
  constructor() {
    // Store config in user's home directory to persist between sessions
    // but avoid version control
    this.configPath = path.join(os.homedir(), '.hax-linkedin-config.json');
  }

  displayInstructions() {
    console.log(`
🎯 LinkedIn API Setup for HAX Issue Automation

📋 Prerequisites:
1. LinkedIn Developer Account
2. LinkedIn App with proper permissions

🔧 Setup Steps:

1️⃣  Create LinkedIn App:
   • Go to: https://www.linkedin.com/developers/apps
   • Click "Create app"
   • Fill in app details:
     - App name: "HAX Productivity Tracker"
     - LinkedIn Page: Your personal/company page
     - App use: "Other"

2️⃣  Configure App Permissions:
   • Products tab → Request "Sign In with LinkedIn using OpenID Connect"
   • Products tab → Request "Share on LinkedIn"
   • Auth tab → Add redirect URL: http://localhost:3000/callback

3️⃣  Get App Credentials:
   • Auth tab → Copy "Client ID" and "Client Secret"

4️⃣  Get Access Token:
   • Use LinkedIn OAuth flow (we'll help with this)

5️⃣  Get Person ID:
   • Call LinkedIn API to get your person URN

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to start setup? Press Enter to continue...
`);
  }

  async promptForCredentials() {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt) => new Promise(resolve => {
      readline.question(prompt, resolve);
    });

    console.log('🔑 LinkedIn App Credentials\n');
    
    const clientId = await question('Enter Client ID: ');
    const clientSecret = await question('Enter Client Secret: ');
    
    readline.close();
    
    return { clientId, clientSecret };
  }

  generateAuthUrl(clientId) {
    // Updated scopes for LinkedIn API v2 with OpenID Connect
    const scopes = 'openid,profile,w_member_social';
    const redirectUri = 'http://localhost:3000/callback';
    const state = Math.random().toString(36).substring(7);
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `state=${state}&` +
      `scope=${encodeURIComponent(scopes)}`;
    
    return { authUrl, state, redirectUri };
  }

  async startCallbackServer(expectedState, clientId, clientSecret, redirectUri) {
    const http = require('http');
    const url = require('url');
    
    return new Promise((resolve, reject) => {
      const server = http.createServer(async (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        
        if (parsedUrl.pathname === '/callback') {
          const { code, state, error } = parsedUrl.query;
          
          if (error) {
            res.writeHead(400);
            res.end(`Error: ${error}`);
            server.close();
            return reject(new Error(error));
          }
          
          if (state !== expectedState) {
            res.writeHead(400);
            res.end('Invalid state parameter');
            server.close();
            return reject(new Error('Invalid state'));
          }
          
          try {
            // Exchange code for access token
            const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri
              })
            });
            
            if (!tokenResponse.ok) {
              throw new Error(`Token exchange failed: ${tokenResponse.status}`);
            }
            
            const tokenData = await tokenResponse.json();
            
            // Get user profile info using OpenID Connect userinfo endpoint
            const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
              headers: {
                'Authorization': `Bearer ${tokenData.access_token}`
              }
            });
            
            if (!profileResponse.ok) {
              throw new Error(`Profile fetch failed: ${profileResponse.status}`);
            }
            
            const profileData = await profileResponse.json();
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
                <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                  <h2>✅ LinkedIn Authentication Successful!</h2>
                  <p>You can close this window and return to the terminal.</p>
                  <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px;">
                    <h3>Profile Info:</h3>
                    <p><strong>Name:</strong> ${profileData.name || `${profileData.given_name} ${profileData.family_name}` || 'N/A'}</p>
                    <p><strong>ID:</strong> ${profileData.sub}</p>
                  </div>
                </body>
              </html>
            `);
            
            server.close();
            resolve({
              accessToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
              expiresIn: tokenData.expires_in,
              personId: profileData.sub,
              name: profileData.name || `${profileData.given_name} ${profileData.family_name}` || 'LinkedIn User'
            });
            
          } catch (error) {
            res.writeHead(500);
            res.end(`Error: ${error.message}`);
            server.close();
            reject(error);
          }
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      });
      
      server.listen(3000, () => {
        console.log('🌐 Callback server started on http://localhost:3000');
      });
      
      server.on('error', reject);
    });
  }

  async saveConfig(config) {
    const configData = {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      accessToken: config.accessToken,
      refreshToken: config.refreshToken,
      personId: config.personId,
      name: config.name,
      expiresIn: config.expiresIn,
      createdAt: new Date().toISOString()
    };
    
    fs.writeFileSync(this.configPath, JSON.stringify(configData, null, 2));
    console.log(`✅ Configuration saved to ${this.configPath}`);
  }

  async run() {
    try {
      this.displayInstructions();
      
      // Wait for user to press Enter
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      await new Promise(resolve => {
        readline.question('', resolve);
      });
      readline.close();
      
      // Get credentials
      const { clientId, clientSecret } = await this.promptForCredentials();
      
      if (!clientId || !clientSecret) {
        console.error('❌ Client ID and Client Secret are required');
        process.exit(1);
      }
      
      // Generate auth URL
      const { authUrl, state, redirectUri } = this.generateAuthUrl(clientId);
      
      console.log(`\n🔗 Authorization URL:`);
      console.log(authUrl);
      console.log(`\n📋 Instructions:`);
      console.log(`1. Copy the URL above and open it in your browser`);
      console.log(`2. Grant permissions to your LinkedIn app`);
      console.log(`3. You'll be redirected to localhost:3000/callback`);
      console.log(`4. Return here - the setup will complete automatically\n`);
      
      // Start callback server and wait for auth
      const authResult = await this.startCallbackServer(
        state, 
        clientId, 
        clientSecret, 
        redirectUri
      );
      
      // Save complete configuration
      await this.saveConfig({
        clientId,
        clientSecret,
        ...authResult
      });
      
      console.log(`\n🎉 Setup Complete!`);
      console.log(`📊 Profile: ${authResult.name}`);
      console.log(`🔑 Access token expires in: ${authResult.expiresIn} seconds`);
      console.log(`\n▶️  Next steps:`);
      console.log(`   1. Run: node post-to-linkedin.js`);
      console.log(`   2. Your weekly productivity posts will be automated!`);
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      console.log(`\n🔧 Troubleshooting:`);
      console.log(`   • Verify your LinkedIn app configuration`);
      console.log(`   • Check that redirect URI is set to: http://localhost:3000/callback`);
      console.log(`   • Ensure "Share on LinkedIn" product is added to your app`);
      process.exit(1);
    }
  }
}

const setup = new LinkedInSetup();
setup.run().catch(console.error);