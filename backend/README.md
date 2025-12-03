# SDD Evaluator Backend

Spring Boot backend for the AI-powered SDD Evaluator System.

## Features

- **JWT Authentication**: Secure user authentication and authorization
- **File Upload**: Support for document uploads (PDF, TXT, DOCX)
- **Google Drive Integration**: Fetch documents directly from Google Drive
- **AI Evaluation**: Placeholder AI service for document evaluation
- **RESTful API**: Clean API design with proper error handling
- **PostgreSQL Database**: Robust data persistence
- **OAuth2 Support**: Google OAuth2 integration setup

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Maven
- Lombok

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```bash
psql -U postgres
CREATE DATABASE sdd_evaluator;
```

Run the schema script:

```bash
psql -U postgres -d sdd_evaluator -f src/main/resources/schema.sql
```

### 2. Configuration

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Edit `.env` and update:
- `DB_USERNAME` and `DB_PASSWORD` for your PostgreSQL credentials
- `JWT_SECRET` with a strong secret key (at least 256 bits)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google OAuth2

### 3. Build the Application

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login with credentials
  ```json
  {
    "username": "john_doe",
    "password": "password123"
  }
  ```

### Evaluations (Requires Authentication)

- `POST /api/evaluations/upload` - Upload and evaluate a document
  - Content-Type: `multipart/form-data`
  - Form field: `file` (the document file)

- `POST /api/evaluations/drive` - Evaluate a Google Drive document
  ```json
  {
    "driveLink": "https://drive.google.com/file/d/FILE_ID/view"
  }
  ```

- `GET /api/evaluations/history` - Get user's evaluation history

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/sdd/evaluator/
│   │   │   ├── config/           # Configuration classes
│   │   │   ├── controller/       # REST controllers
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── entity/           # JPA entities
│   │   │   ├── repository/       # Data repositories
│   │   │   ├── security/         # Security components
│   │   │   ├── service/          # Business logic
│   │   │   └── EvaluatorApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── schema.sql
│   └── test/                     # Test files
├── pom.xml
└── README.md
```

## Security

- JWT tokens are used for authentication
- Passwords are encrypted using BCrypt
- CORS is configured for frontend integration
- All evaluation endpoints require authentication

## Google OAuth2 Setup

To enable Google Drive integration:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Drive API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:8080/login/oauth2/code/google`
6. Update `.env` with your client ID and secret

## AI Evaluation Service

The current implementation includes a placeholder AI service that generates mock evaluation scores and feedback. To integrate with a real AI model:

1. Update `AIEvaluationService.java` with your AI model integration
2. Add necessary dependencies for your AI/ML framework
3. Configure model endpoints and credentials

## Testing

Run tests with:

```bash
mvn test
```

## Development

For development with auto-reload:

```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=true"
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `sudo service postgresql status`
- Check database credentials in `application.properties`
- Ensure database exists: `psql -l`

### JWT Token Issues
- Verify JWT_SECRET is at least 256 bits long
- Check token expiration time (default: 24 hours)

### File Upload Issues
- Check file size limits in `application.properties`
- Ensure `uploads/` directory exists and has write permissions

## License

MIT License
