# SDD-Evaluator

An intelligent document evaluation tool that simplifies the process of reviewing Software Design Descriptions. Powered by AI, the system analyzes structure, completeness, and quality, while supporting seamless file uploads and Google Drive integration. Perfect for students, reviewers, and academic institutions.

## Features

- 🔐 **JWT Authentication**: Secure user authentication and authorization
- 📁 **File Upload**: Support for direct document uploads (PDF, TXT, DOCX)
- 🔗 **Google Drive Integration**: Fetch and evaluate documents from Google Drive
- 🤖 **AI-Powered Evaluation**: Placeholder AI service for document analysis
- 📊 **Detailed Scoring**: Structure, completeness, and quality metrics
- 📈 **Evaluation History**: Track and review past evaluations
- 🎨 **Modern UI**: Clean, responsive React-based interface
- 🔒 **Secure**: OAuth2 setup for Google integration

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Maven
- Google Drive API

### Frontend
- React 18
- TypeScript
- React Router v6
- Axios
- React Markdown

## Project Structure

```
SDD-Evaluator/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sdd/evaluator/
│   │   │   │   ├── config/          # Security & app configuration
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   ├── security/        # JWT & authentication
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql       # Database schema
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── frontend/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context (Auth)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS stylesheets
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── README.md
│
└── README.md               # This file
```

## Quick Start

### Prerequisites

- Java 17+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.6+

### Backend Setup

1. **Create PostgreSQL database:**
   ```bash
   psql -U postgres
   CREATE DATABASE sdd_evaluator;
   \q
   ```

2. **Run database schema:**
   ```bash
   cd backend
   psql -U postgres -d sdd_evaluator -f src/main/resources/schema.sql
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

4. **Build and run:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit if needed (default: http://localhost:8080/api)
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

Frontend will start on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Evaluation Endpoints (Requires Authentication)

- `POST /api/evaluations/upload` - Upload and evaluate document
- `POST /api/evaluations/drive` - Evaluate Google Drive document
- `GET /api/evaluations/history` - Get user's evaluation history

## Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

- Database connection settings
- JWT secret and expiration
- File upload limits
- Google OAuth2 credentials
- CORS allowed origins

### Frontend Configuration

Edit `frontend/.env`:

- `REACT_APP_API_URL` - Backend API base URL

## Google OAuth2 Setup

To enable Google Drive integration:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Drive API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:8080/login/oauth2/code/google`
6. Update backend `.env` with client ID and secret

## AI Evaluation Service

The current implementation includes a **placeholder AI service** that generates mock evaluation scores and feedback. To integrate with a real AI model:

1. Update `AIEvaluationService.java` with your AI model integration
2. Add necessary dependencies for your AI/ML framework
3. Configure model endpoints and credentials in `application.properties`

## Database Schema

The system uses two main tables:

- **users**: User accounts with authentication details
- **evaluations**: Document evaluations with scores and feedback

See `backend/src/main/resources/schema.sql` for full schema.

## Development

### Backend Development

```bash
cd backend
mvn spring-boot:run
```

For auto-reload during development, use Spring DevTools.

### Frontend Development

```bash
cd frontend
npm start
```

Changes will hot-reload automatically.

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Building for Production

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

Deploy the `build/` directory to a web server.

## Security Features

- JWT-based authentication
- Password encryption with BCrypt
- CORS configuration
- Secure file upload handling
- SQL injection prevention via JPA
- XSS protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Real AI model integration
- [ ] Support for more file formats
- [ ] Batch evaluation support
- [ ] Advanced analytics dashboard
- [ ] Export evaluation reports
- [ ] Team collaboration features
- [ ] Mobile app

## Acknowledgments

Built for academic institutions to streamline the Software Design Description review process.
