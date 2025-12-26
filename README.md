# DTPA Bingo

A modern web-based bingo application built with React and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- Docker Desktop
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Database

Make sure Docker Desktop is installed and running, then start the PostgreSQL database:

```bash
docker compose up -d
```

This will start a PostgreSQL container with:
- **Database name:** dtpa_bingo
- **Username:** bingo_user
- **Password:** bingo_password
- **Port:** 5432

The `users` table will be automatically created with the following schema:
- `id` (serial primary key)
- `email` (varchar, unique)
- `name` (varchar)
- `created_at` (timestamp)

### 3. Start the Development Servers

You need to run both the backend server and the frontend:

**Option 1: Run both together (recommended)**
```bash
npm run dev:all
```

**Option 2: Run separately in different terminals**

Terminal 1 - Backend server:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:3001`

## Database Connection

To connect to the database from your app, use this connection string:

```
postgresql://bingo_user:bingo_password@localhost:5432/dtpa_bingo
```

## Useful Commands

### Stop the database
```bash
docker compose down
```

### Stop the database and remove data
```bash
docker compose down -v
```

### View database logs
```bash
docker compose logs postgres
```

### Connect to the database with psql
```bash
docker compose exec postgres psql -U bingo_user -d dtpa_bingo
```

## Project Structure

```
dtpa-bingo/
├── src/
│   ├── components/
│   │   ├── Login.tsx       # Login component
│   │   └── Login.css       # Login styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── server/
│   ├── index.ts            # Express server
│   ├── db.ts               # Database connection
│   └── routes/
│       └── users.ts        # User API routes
├── database/
│   └── init.sql            # Database initialization script
├── docker-compose.yml      # Docker configuration
└── .env                    # Environment variables
```

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Node.js with Express
- PostgreSQL 16
- Docker for database containerization

## Authentication

The app uses email-based authentication. Only existing users in the database can log in. New users must be created through the API first.

To create a test user, run:
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/users` - Get all users
- `GET /api/users/:email` - Get user by email
- `POST /api/users/login` - Login user (body: `{ email }`) - Returns 401 if user doesn't exist
- `POST /api/users` - Create new user (body: `{ email, name }`)
- `PUT /api/users/:email` - Update user name (body: `{ name }`)
