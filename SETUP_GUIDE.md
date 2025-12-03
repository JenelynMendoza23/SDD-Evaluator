# SDD Evaluator - Setup Guide

This guide will help you set up and run the SDD Evaluator System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17 or higher** - [Download](https://adoptium.net/)
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **Node.js 16+ and npm** - [Download](https://nodejs.org/)
- **PostgreSQL 12+** - [Download](https://www.postgresql.org/download/)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/JenelynMendoza23/SDD-Evaluator.git
cd SDD-Evaluator
```

### 2. Set Up the Database

#### Start PostgreSQL
Make sure PostgreSQL is running on your system.

```bash
# On Linux/Mac
sudo service postgresql start

# On Windows (if using service)
net start postgresql
```

#### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE sdd_evaluator;

# Exit psql
\q
```

#### Run Database Schema

```bash
# Navigate to backend directory
cd backend

# Run the schema file
psql -U postgres -d sdd_evaluator -f src/main/resources/schema.sql
```

### 3. Configure Backend

#### Create Environment Configuration

```bash
# In the backend directory
cp .env.example .env
```

#### Edit .env file

Open `backend/.env` and update the following values:

```properties
# Database Configuration
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password

# JWT Configuration (generate a strong secret, at least 256 bits)
JWT_SECRET=yourVeryLongSecretKeyHereMustBeAtLeast256BitsLongForHS512AlgorithmSecurity

# Google OAuth2 (optional for now, can be configured later)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

**Note:** The JWT_SECRET should be a long, random string. You can generate one using:
```bash
openssl rand -base64 64
```

### 4. Configure Frontend

```bash
# Navigate to frontend directory
cd ../frontend

# Create environment file
cp .env.example .env
```

The default configuration should work if your backend is running on port 8080:
```properties
REACT_APP_API_URL=http://localhost:8080/api
```

### 5. Build and Run Backend

```bash
# Navigate to backend directory
cd ../backend

# Install dependencies and build
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

You should see output like:
```
Started EvaluatorApplication in X seconds
```

### 6. Build and Run Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## Verification

### 1. Test Backend API

Open a new terminal and test the backend:

```bash
# Health check (should return empty array for new install)
curl http://localhost:8080/api/auth/login
```

### 2. Test Frontend

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the SDD Evaluator landing page.

### 3. Create a Test Account

1. Click "Register" or "Get Started"
2. Fill in the registration form:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
3. Click "Register"
4. You should be redirected to the Dashboard

### 4. Test File Upload

1. On the Dashboard, try uploading a text file with some sample content
2. Click "Upload & Evaluate"
3. View the evaluation results with scores and feedback

## Troubleshooting

### Backend Issues

#### Database Connection Error
```
Error: Connection refused: localhost:5432
```
**Solution:** Make sure PostgreSQL is running and the credentials in `.env` are correct.

#### Port Already in Use
```
Error: Port 8080 is already in use
```
**Solution:** Either stop the application using port 8080 or change the port in `application.properties`:
```properties
server.port=8081
```

#### JWT Secret Error
```
Error: JWT signature does not match
```
**Solution:** Make sure your JWT_SECRET in `.env` is at least 256 bits (44 characters in base64).

### Frontend Issues

#### Cannot Connect to Backend
**Solution:** 
1. Verify backend is running on port 8080
2. Check `.env` file has correct API URL
3. Check browser console for CORS errors

#### Build Errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Common Issues

#### CORS Errors
If you see CORS errors in the browser console:
1. Check `application.properties` has the correct allowed origins:
   ```properties
   cors.allowed-origins=http://localhost:3000
   ```
2. Restart the backend

#### File Upload Issues
If file uploads fail:
1. Check the `uploads/` directory exists and has write permissions
2. Check file size limits in `application.properties`

## Google Drive Integration (Optional)

To enable Google Drive integration:

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URI: `http://localhost:8080/login/oauth2/code/google`
7. Copy the Client ID and Client Secret

### 2. Update Configuration

Add the credentials to `backend/.env`:
```properties
GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret
```

### 3. Restart Backend

```bash
cd backend
mvn spring-boot:run
```

## Production Deployment

For production deployment:

### Backend
```bash
cd backend
mvn clean package
java -jar target/evaluator-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
```

Deploy the `build/` directory to a static web server like Nginx or Apache.

### Environment Variables for Production

Update the following for production:
- Use a production PostgreSQL database
- Generate a strong JWT secret
- Configure proper CORS origins
- Use HTTPS
- Set up Google OAuth2 with production URLs

## Next Steps

- [ ] Customize the AI evaluation service with a real AI model
- [ ] Configure Google OAuth2 for Google Drive integration
- [ ] Add more supported file formats
- [ ] Deploy to production

## Support

If you encounter any issues:
1. Check the logs in the backend console
2. Check the browser console for frontend errors
3. Review this troubleshooting guide
4. Open an issue on GitHub

## Useful Commands

### Backend
```bash
# Run tests
mvn test

# Clean build
mvn clean install

# Run without tests
mvn spring-boot:run -DskipTests

# View logs
tail -f logs/spring.log
```

### Frontend
```bash
# Run tests
npm test

# Build for production
npm run build

# Serve production build locally
npx serve -s build

# Check for updates
npm outdated
```

### Database
```bash
# Connect to database
psql -U postgres -d sdd_evaluator

# List tables
\dt

# View users
SELECT * FROM users;

# View evaluations
SELECT * FROM evaluations;

# Exit
\q
```

## Security Notes

- Never commit `.env` files to version control
- Use strong passwords and JWT secrets
- Keep dependencies updated
- Use HTTPS in production
- Implement rate limiting for production
- Regular security audits recommended

---

**Happy Evaluating! 🚀**
