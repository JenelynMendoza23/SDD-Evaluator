# SDD Evaluator Frontend

React frontend for the AI-powered SDD Evaluator System.

## Features

- **User Authentication**: Secure login and registration with JWT
- **File Upload**: Drag-and-drop file upload interface
- **Google Drive Integration**: Evaluate documents from Google Drive links
- **Results Display**: Beautiful visualization of evaluation scores and feedback
- **History Tracking**: View all previous evaluations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Tech Stack

- React 18
- TypeScript
- React Router v6
- Axios for API calls
- React Markdown for feedback rendering
- CSS3 with modern styling

## Prerequisites

- Node.js 16+ and npm

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` if you need to change the backend API URL (default is `http://localhost:8080/api`)

### 3. Run the Application

```bash
npm start
```

The app will start on `http://localhost:3000` and will proxy API requests to the backend.

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Project Structure

```
frontend/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/          # Reusable components
│   │   ├── DriveLink.tsx    # Google Drive link input
│   │   ├── FileUpload.tsx   # File upload component
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── PrivateRoute.tsx # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.tsx  # Authentication context
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── History.tsx      # Evaluation history
│   │   ├── Home.tsx         # Landing page
│   │   ├── Login.tsx        # Login page
│   │   ├── Register.tsx     # Registration page
│   │   └── Results.tsx      # Evaluation results
│   ├── services/
│   │   └── api.ts           # API service layer
│   ├── styles/
│   │   └── App.css          # Global styles
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Main app component
│   └── index.tsx            # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes. You may also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## Features Guide

### Authentication

- Register a new account with username, email, and password
- Login with existing credentials
- JWT tokens are stored in localStorage
- Automatic logout on token expiration

### File Upload

- Drag and drop files or click to select
- Supported formats: PDF, TXT, DOCX
- File size displayed before upload
- Real-time upload progress

### Google Drive Integration

- Paste a Google Drive shareable link
- System extracts file ID and fetches content
- Same evaluation process as uploaded files

### Results Page

- Visual score cards for overall, structure, completeness, and quality
- Detailed markdown-formatted feedback
- Options to evaluate another document or view history

### History Page

- List of all previous evaluations
- Click any item to view detailed results
- Sorted by most recent first
- Shows source (upload or Google Drive)

## API Integration

The frontend communicates with the backend through the following endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/evaluations/upload` - Upload and evaluate file
- `POST /api/evaluations/drive` - Evaluate Google Drive file
- `GET /api/evaluations/history` - Get evaluation history

All evaluation endpoints require JWT authentication via Bearer token in the Authorization header.

## Customization

### Styling

All styles are in `src/styles/App.css`. The design uses a modern, clean aesthetic with:
- Color scheme: Blues (#3498db), grays (#2c3e50), and accents
- Responsive grid layouts
- Smooth transitions and hover effects
- Card-based UI components

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routes in `src/App.tsx`
4. Add API calls in `src/services/api.ts`
5. Define types in `src/types/index.ts`

## Troubleshooting

### CORS Issues
- Ensure backend CORS is configured to allow `http://localhost:3000`
- Check `application.properties` in the backend

### API Connection Issues
- Verify backend is running on port 8080
- Check `.env` file for correct API URL
- Check browser console for error messages

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

## License

MIT License
