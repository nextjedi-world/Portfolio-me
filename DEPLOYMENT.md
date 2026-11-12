# Deployment Guide

This document provides comprehensive instructions for setting up automated deployment from GitHub to Vercel using GitHub Actions.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Vercel Setup](#vercel-setup)
- [GitHub Secrets Configuration](#github-secrets-configuration)
- [GitHub Actions Workflow](#github-actions-workflow)
- [Deployment Process](#deployment-process)
- [Troubleshooting](#troubleshooting)
- [Manual Deployment](#manual-deployment)

## Overview

The portfolio uses GitHub Actions to automatically deploy to Vercel on every push to the `master` branch and creates preview deployments for pull requests.

### Deployment Strategy

- **Production Deployments**: Triggered on push to `master` branch
- **Preview Deployments**: Triggered on pull requests
- **Manual Deployments**: Can be triggered manually via GitHub Actions UI

## Prerequisites

Before setting up automated deployment, ensure you have:

- [Node.js 18+](https://nodejs.org/) installed locally
- A [GitHub](https://github.com) account with repository access
- A [Vercel](https://vercel.com) account
- [Vercel CLI](https://vercel.com/docs/cli) installed globally

```bash
# Install Vercel CLI globally
npm install -g vercel
```

## Vercel Setup

### 1. Create Vercel Account and Project

1. **Sign up** at [vercel.com](https://vercel.com) (recommended: use your GitHub account)
2. **Import your repository** from GitHub
3. **Configure build settings**:
   - Framework Preset: `Angular`
   - Build Command: `npm run build`
   - Output Directory: `dist/portfolio-redesign`
   - Install Command: `npm install`

### 2. Get Vercel Project Information

Run the following commands in your project directory:

```bash
# Login to Vercel
vercel login

# Link your project to get IDs
vercel link

# This will create a .vercel directory with project.json
# containing your project and org IDs
```

### 3. Generate Vercel Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click **Create Token**
3. Name it: `GitHub Actions Portfolio`
4. **Copy the token** (you'll need this for GitHub Secrets)

### 4. Get Project and Organization IDs

After running `vercel link`, check the generated `.vercel/project.json` file:

```bash
# View project configuration
cat .vercel/project.json
```

You'll see something like:

```json
{
  "projectId": "prj_xxxxxxxxxxxxxxxxxxxx",
  "orgId": "team_xxxxxxxxxxxxxxxxxxxx"
}
```

**Important**: Add `.vercel/` to your `.gitignore` to avoid committing sensitive data.

## GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

### Navigate to Repository Secrets

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Required Secrets

Add these three secrets:

| Secret Name         | Description                      | Example                  |
| ------------------- | -------------------------------- | ------------------------ |
| `VERCEL_TOKEN`      | Your Vercel authentication token | `xxxxxxxxxxxxxxxxxxx`    |
| `VERCEL_ORG_ID`     | Your Vercel organization/team ID | `team_xxxxxxxxxxxxxxxxx` |
| `VERCEL_PROJECT_ID` | Your Vercel project ID           | `prj_xxxxxxxxxxxxxxxxx`  |

### Setting Each Secret

For each secret:

1. Click **New repository secret**
2. Enter the **Name** (e.g., `VERCEL_TOKEN`)
3. Enter the **Secret** value
4. Click **Add secret**

## GitHub Actions Workflow

The workflow file `.github/workflows/deploy.yml` is already configured with:

### Workflow Configuration

```yaml
name: Build and Deploy to Vercel

on:
  push:
    branches: [master] # Deploy on master push
  pull_request:
    branches: [master] # Preview on PR
  workflow_dispatch: # Manual trigger

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # Build steps
      - Checkout code
      - Setup Node.js 20
      - Install dependencies
      - Run linting (if available)
      - Run tests (if available)
      - Build application

      # Deployment steps
      - Deploy to Production (master only)
      - Deploy Preview (PRs only)
```

### Workflow Features

- ✅ **Quality Assurance**: Linting and testing before deployment
- ✅ **Conditional Deployment**: Production only on master, previews on PRs
- ✅ **Manual Triggers**: Can be run manually from GitHub Actions UI
- ✅ **Build Verification**: Ensures successful build before deployment

## Deployment Process

### Automatic Deployments

#### Production Deployment

1. **Push to master**:

   ```bash
   git add .
   git commit -m "feat: new feature"
   git push origin master
   ```

2. **GitHub Action triggers**:
   - Builds the application
   - Runs tests and linting
   - Deploys to Vercel production
   - Updates live site at your custom domain

#### Preview Deployment

1. **Create and push feature branch**:

   ```bash
   git checkout -b feature/new-feature
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Create Pull Request**:
   - GitHub Action creates preview deployment
   - Preview URL is posted in PR comments
   - Perfect for reviewing changes before merge

### Manual Deployment

#### Via GitHub Actions UI

1. Go to **Actions** tab in your repository
2. Select **Build and Deploy to Vercel** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

#### Via Vercel CLI (Development)

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Specify environment variables
vercel --prod -e NODE_ENV=production
```

## Troubleshooting

### Common Issues and Solutions

#### 1. GitHub Action Fails with "Vercel Token Invalid"

**Solution**: Regenerate Vercel token and update GitHub secret

```bash
# Generate new token at vercel.com/account/tokens
# Update VERCEL_TOKEN secret in GitHub repository settings
```

#### 2. Build Fails During GitHub Action

**Solution**: Check build logs and fix build errors

```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run lint
```

#### 3. Wrong Project ID or Org ID

**Solution**: Re-link project and update secrets

```bash
# Re-link project
vercel link --confirm

# Check .vercel/project.json for correct IDs
cat .vercel/project.json
```

#### 4. Deployment Successful but Site Not Updated

**Solution**: Check Vercel dashboard and clear browser cache

- Visit [Vercel Dashboard](https://vercel.com/dashboard)
- Verify deployment status
- Check domain configuration
- Clear browser cache (Ctrl+F5)

### Debug Mode

Enable debug mode in GitHub Actions by adding this secret:

- Name: `ACTIONS_STEP_DEBUG`
- Value: `true`

### Logs and Monitoring

- **GitHub Actions Logs**: Available in repository's Actions tab
- **Vercel Deployment Logs**: Available in Vercel Dashboard
- **Build Logs**: Check both GitHub and Vercel for complete picture

## Manual Deployment

### Local Development Deployment

For testing deployments locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test build locally
npx serve dist/portfolio-redesign

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

If your project requires environment variables:

#### In GitHub Actions

Add to repository secrets with `VERCEL_` prefix:

- `VERCEL_GOOGLE_ANALYTICS_ID`
- `VERCEL_CONTACT_EMAIL`

#### In Vercel Dashboard

1. Go to Project Settings
2. Click **Environment Variables**
3. Add variables for each environment:
   - Production
   - Preview
   - Development

### Custom Domains

To configure custom domains:

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

2. **DNS Configuration**:
   ```
   CNAME: www.yourdomain.com → cname.vercel-dns.com
   A: yourdomain.com → 76.76.19.61
   ```

## Best Practices

### Security

- ✅ Keep Vercel tokens secure in GitHub Secrets
- ✅ Use least-privilege access tokens
- ✅ Regularly rotate authentication tokens
- ✅ Don't commit `.vercel/` directory to version control

### Performance

- ✅ Use `npm ci` instead of `npm install` in CI/CD
- ✅ Cache dependencies in GitHub Actions
- ✅ Optimize bundle size before deployment
- ✅ Enable Vercel's automatic optimizations

### Monitoring

- ✅ Set up Vercel deployment notifications
- ✅ Monitor GitHub Actions for failed deployments
- ✅ Use Vercel Analytics for performance insights
- ✅ Set up custom domain monitoring

## Advanced Configuration

### Custom Build Commands

If you need custom build configuration:

```yaml
# In .github/workflows/deploy.yml
- name: Build application
  run: |
    npm run build
    npm run generate-sitemap
    npm run optimize-assets
```

### Multiple Environments

For staging/production separation:

```yaml
# Deploy to staging on develop branch
- name: Deploy to Staging
  if: github.ref == 'refs/heads/develop'
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_STAGING_PROJECT_ID }}
```

### Deployment Notifications

Add Slack/Discord notifications:

```yaml
- name: Notify Deployment Success
  if: success()
  run: |
    curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"Portfolio deployed successfully to production!"}' \
    ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Support and Resources

- 📚 [Vercel Documentation](https://vercel.com/docs)
- 🔧 [GitHub Actions Documentation](https://docs.github.com/en/actions)
- 🅰️ [Angular Deployment Guide](https://angular.io/guide/deployment)
- 💬 [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Need Help?** Check the troubleshooting section or create an issue in the repository.
