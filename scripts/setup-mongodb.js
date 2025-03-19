const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function checkMongoDBInstallation() {
    try {
        execSync('mongosh --version', { stdio: 'ignore' });
        console.log('✅ MongoDB is installed');
        return true;
    } catch (error) {
        console.log('❌ MongoDB is not installed');
        return false;
    }
}

function checkMongoDBService() {
    try {
        const output = execSync('brew services list | grep mongodb-community', { encoding: 'utf8' });
        if (output.includes('started')) {
        console.log('✅ MongoDB service is running');
        return true;
        } else {
        console.log('❌ MongoDB service is not running');
        return false;
        }
    } catch (error) {
        console.log('❌ Error checking MongoDB service:', error.message);
        return false;
    }
}

function checkMongoDBConnection() {
    try {
        execSync('mongosh --eval "db.runCommand({ping:1})"', { stdio: 'ignore' });
        console.log('✅ MongoDB connection successful');
        return true;
    } catch (error) {
        console.log('❌ MongoDB connection failed');
        return false;
    }
}

function checkDatabaseExists() {
    try {
        const output = execSync('mongosh --eval "show dbs"', { encoding: 'utf8' });
        if (output.includes('report-processing')) {
        console.log('✅ Database "report-processing" exists');
        return true;
        } else {
        console.log('❌ Database "report-processing" does not exist');
        return false;
        }
    } catch (error) {
        console.log('❌ Error checking database:', error.message);
        return false;
    }
}

function checkEnvFile() {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        if (envContent.includes('MONGODB_URI')) {
        console.log('✅ .env file contains MONGODB_URI');
        return true;
        } else {
        console.log('❌ .env file does not contain MONGODB_URI');
        return false;
        }
    } else {
        console.log('❌ .env file does not exist');
        return false;
    }
}

function main() {
    console.log('🔍 Checking MongoDB setup...\n');

    const checks = {
        installation: checkMongoDBInstallation(),
        service: checkMongoDBService(),
        connection: checkMongoDBConnection(),
        database: checkDatabaseExists(),
        envFile: checkEnvFile()
    };

    console.log('\n📊 Setup Summary:');
    Object.entries(checks).forEach(([check, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${check}`);
    });

    const allPassed = Object.values(checks).every(check => check);
    
    if (!allPassed) {
        console.log('\n⚠️  Some checks failed. Please refer to docs/mongodb-setup.md for setup instructions.');
        process.exit(1);
    } else {
        console.log('\n✨ All checks passed! MongoDB is ready to use.');
    }
}

main(); 