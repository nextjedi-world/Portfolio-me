# GitHub Actions Setup Instructions

This file contains step-by-step instructions to complete the GitHub Actions CI/CD setup for automatic Vercel deployment.

## 🎯 Current Status

- ✅ Portfolio deployed automatically: https://arunabh.me
- ✅ GitHub Actions workflow file created (`.github/workflows/deploy.yml`)
- ✅ Vercel project linked and configured
- ✅ Production deployment pipeline active on `master` branch
- 🔑 **SETUP REQUIRED**: Add GitHub repository secrets for automatic deployment

## 🔑 Required GitHub Secrets

You need to add **3 secrets** to your GitHub repository to enable automatic deployment:

### Secret Values:

- `VERCEL_TOKEN` = **(Get from Vercel Dashboard - see Step 1 below)**
- `VERCEL_ORG_ID` = `team_2HkYcnkFTZw7QFb44fby6Y3c`
- `VERCEL_PROJECT_ID` = `prj_AhBLdtbdaBCf0GleWCftEus29ekN`

## 📋 Step-by-Step Instructions

### Step 1: Get Vercel Token

1. Visit: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Give it a name like "GitHub Actions Portfolio"
4. Select appropriate scope (or leave default)
5. Click **"Create"**
6. **Copy the token value** (you won't see it again!)

### Step 2: Add Secrets to GitHub Repository

1. Go to your GitHub repository: `https://github.com/[your-username]/Portfolio-me`
2. Click the **"Settings"** tab (top menu)
3. In the left sidebar, click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"** button

### Step 3: Add Each Secret

**Add Secret 1:**

- Name: `VERCEL_TOKEN`
- Value: [Paste the token from Step 1]
- Click **"Add secret"**

**Add Secret 2:**

- Name: `VERCEL_ORG_ID`
- Value: `team_2HkYcnkFTZw7QFb44fby6Y3c`
- Click **"Add secret"**

**Add Secret 3:**

- Name: `VERCEL_PROJECT_ID`
- Value: `prj_AhBLdtbdaBCf0GleWCftEus29ekN`
- Click **"Add secret"**

## 🧪 Test the Setup

After adding all 3 secrets:

```bash
# Make a small change and push to test
git add .
git commit -m "Test GitHub Actions automatic deployment"
git push origin master
```

## 📊 Monitor Deployment

1. Go to your GitHub repository
2. Click the **"Actions"** tab
3. You should see a workflow running called "Deploy to Vercel"
4. Click on it to see the deployment progress
5. Once complete, your changes will be live on Vercel

## ⚡ Alternative: GitHub CLI Method

If you have GitHub CLI installed and authenticated:

```bash
# Get the Vercel token first (Step 1 above), then run:
gh secret set VERCEL_TOKEN --body "your_token_here"
gh secret set VERCEL_ORG_ID --body "team_2HkYcnkFTZw7QFb44fby6Y3c"
gh secret set VERCEL_PROJECT_ID --body "prj_AhBLdtbdaBCf0GleWCftEus29ekN"
```

## 🎯 What Happens After Setup

Once the secrets are added:

✅ **Automatic Deployments**: Every push to `master` branch will trigger deployment
✅ **Manual Deployments**: Use Actions tab → "Run workflow" for manual deploys
✅ **Build Logs**: Full visibility into build and deployment process
✅ **Error Notifications**: GitHub will notify you if deployments fail

## 🚨 Troubleshooting

### If deployment fails:

1. Check the Actions tab for error messages
2. Verify all 3 secrets are added correctly
3. Ensure the Vercel token hasn't expired
4. Check that the project is still linked in Vercel

### If you need to regenerate tokens:

1. Go to Vercel → Account → Tokens
2. Delete the old token
3. Create a new one
4. Update the `VERCEL_TOKEN` secret in GitHub

## 📁 Important Files

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `vercel.json` - Vercel deployment configuration
- `.vercel/project.json` - Vercel project linking (auto-generated)

---

**⏰ Estimated Time**: 5 minutes total
**🎉 Result**: Fully automated deployment pipeline ready!

After completing these steps, your portfolio will automatically deploy every time you push changes to the master branch.
