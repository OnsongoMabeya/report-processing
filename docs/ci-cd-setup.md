# CI/CD Setup Guide

This guide explains how to set up and configure Continuous Integration/Continuous Deployment (CI/CD) for the Report Processing System using GitHub Actions.

## Overview

The project uses GitHub Actions for automated testing, linting, building, and deployment. The CI/CD pipeline is configured to run on:

- Push to main branch
- Pull requests to main branch

## Pipeline Structure

The CI/CD pipeline consists of two main jobs:

1. **Test Job**
   - Runs on all pushes and pull requests
   - Sets up Node.js environment
   - Installs dependencies
   - Runs linting
   - Executes tests
   - Verifies build process

2. **Deploy Job**
   - Runs only on pushes to main branch
   - Requires successful test job completion
   - Builds the project
   - Deploys to production environment

## Setup Instructions

### 1. Enable GitHub Actions

1. Go to your GitHub repository
2. Navigate to Settings > Actions > General
3. Enable Actions for the repository
4. Select "Allow all actions and reusable workflows"

### 2. Configure Secrets

Required secrets for deployment:

1. Go to Settings > Secrets and variables > Actions
2. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel deployment token
   - `ORG_ID`: Your Vercel organization ID
   - `PROJECT_ID`: Your Vercel project ID

### 3. Configure Branch Protection

1. Go to Settings > Branches > Branch protection rules
2. Add a new rule for the main branch:
   - Require status checks to pass before merging
   - Require branches to be up to date
   - Include administrators

## Workflow Configuration

The workflow is configured in `.github/workflows/ci.yml`. Key components:

### MongoDB Service Container

```yaml
services:
  mongodb:
    image: mongo:latest
    ports:
      - 27017:27017
    options: >-
      --health-cmd "mongosh --eval 'db.runCommand(\"ping\").ok' --quiet"
      --health-interval 10s
      --health-timeout 10s
      --health-retries 5
```

### Test Environment Variables

```yaml
env:
  MONGODB_URI: mongodb://localhost:27017/report-processing-test
  EMAIL_HOST: smtp.gmail.com
  EMAIL_PORT: 587
  EMAIL_USER: test@example.com
  EMAIL_PASSWORD: test-password
  ALLOWED_SENDERS: test@example.com
  CHECK_INTERVAL: 300000
```

## Troubleshooting

### Common Issues

1. **Failed MongoDB Connection**
   - Check if MongoDB service container is running
   - Verify connection string in environment variables
   - Check MongoDB logs in Actions

2. **Build Failures**
   - Check build logs for specific errors
   - Verify all dependencies are correctly listed
   - Ensure Node.js version matches requirements

3. **Deployment Failures**
   - Verify all required secrets are set
   - Check Vercel project configuration
   - Review deployment logs

### Debugging Tips

1. Enable debug logging:

   ```yaml
   - name: Debug
     run: |
       echo "Node version: $(node -v)"
       echo "NPM version: $(npm -v)"
       echo "Current directory: $(pwd)"
   ```

2. Check MongoDB status:

   ```yaml
   - name: Check MongoDB
     run: mongosh --eval "db.runCommand('ping')"
   ```

## Best Practices

1. **Branch Management**
   - Use feature branches for development
   - Require pull request reviews
   - Keep main branch clean and stable

2. **Testing**
   - Write comprehensive tests
   - Include both unit and integration tests
   - Test all critical paths

3. **Security**
   - Never commit sensitive data
   - Use environment variables for secrets
   - Regularly rotate deployment tokens

4. **Performance**
   - Optimize workflow steps
   - Use caching where appropriate
   - Minimize build time

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments)
- [MongoDB Container Guide](https://www.mongodb.com/container)
