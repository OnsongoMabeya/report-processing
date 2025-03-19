# MongoDB Local Setup Guide

This guide will help you set up MongoDB locally for the Report Processing System.

## Prerequisites

- macOS (for this guide)
- Homebrew installed
- Terminal access

## Installation Steps

1. **Install MongoDB Community Edition**

   ```bash
   # Add MongoDB repository
   brew tap mongodb/brew
   
   # Install MongoDB Community Edition
   brew install mongodb-community
   ```

2. **Start MongoDB Service**

   ```bash
   # Start MongoDB as a service
   brew services start mongodb-community
   
   # Verify the service is running
   brew services list
   ```

3. **Verify Installation**

   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # You should see a connection message and a prompt like:
   # Current Mongosh Log ID: ...
   # Connecting to:          mongodb://127.0.0.1:27017/?...
   ```

4. **Create Database and User**

   ```bash
   # In the MongoDB shell:
   use report-processing
   
   # Create a user (optional but recommended)
   db.createUser({
     user: "reportuser",
     pwd: "your_secure_password",
     roles: [{ role: "readWrite", db: "report-processing" }]
   })
   ```

5. **Update Environment Variables**

   - Open `.env` file in your project root
   - Update the MongoDB URI:

   ```zsh
   MONGODB_URI=mongodb://localhost:27017/report-processing
    ```

   - If you created a user, use:

     ```zsh
     MONGODB_URI=mongodb://reportuser:your_secure_password@localhost:27017/report-processing
     ```

## Troubleshooting

### Common Issues

1. **MongoDB Service Not Starting**

   ```bash
   # Check service status
   brew services list
   
   # Restart service
   brew services restart mongodb-community
   ```

2. **Connection Refused**
   - Ensure MongoDB is running: `brew services list`
   - Check port 27017 is not in use: `lsof -i :27017`
   - Verify firewall settings

3. **Permission Issues**
   - Check MongoDB logs: `tail -f /usr/local/var/log/mongodb/mongo.log`
   - Ensure data directory permissions: `chown -R `id -u` /usr/local/var/mongodb`

### Useful Commands

```bash
# Stop MongoDB
brew services stop mongodb-community

# Restart MongoDB
brew services restart mongodb-community

# View MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Uninstall MongoDB
brew uninstall mongodb-community
```

## Development Workflow

1. **Starting Development**
   ```bash
   # Ensure MongoDB is running
   brew services start mongodb-community
   
   # Start the Next.js development server
   npm run dev
   ```

2. **Database Maintenance**
   ```bash
   # Connect to MongoDB shell
   mongosh
   
   # Switch to project database
   use report-processing
   
   # View collections
   show collections
   
   # View documents in a collection
   db.reports.find()
   ```

## Security Considerations

1. Always use strong passwords for database users
2. Keep MongoDB updated with the latest security patches
3. Consider enabling authentication even in development
4. Regularly backup your data
5. Monitor database logs for suspicious activity

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (GUI Tool) 