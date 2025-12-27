# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DTPA Bingo is a full-stack web application with React 19 + TypeScript frontend, Express.js backend, and PostgreSQL database. The application uses email-based authentication (no passwords) with pre-registered users only.

## Development Commands

### Setup
```bash
npm install
docker compose up -d        # Start PostgreSQL container
npm run dev:all            # Start both frontend (5173) and backend (3001)
```

### Common Tasks
```bash
npm run dev                # Frontend only (Vite dev server on :5173)
npm run server             # Backend only (Express on :3001 with hot reload)
npm run build              # TypeScript compilation + Vite build to /dist
npm run lint               # Run ESLint
```

### Database Commands
```bash
docker compose down        # Stop database
docker compose down -v     # Stop database and remove data
docker compose logs postgres  # View database logs
docker compose exec postgres psql -U bingo_user -d dtpa_bingo  # Connect to DB
```

### Create Test User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## Architecture & Key Patterns

### Full-Stack Structure
- **Frontend (React)**: Runs on port 5173 in development via Vite
- **Backend (Express)**: Runs on port 3001, proxied by Vite in dev
- **Database (PostgreSQL)**: Docker container on port 5432
- **Production**: Single Node.js process serves both API and static frontend from `/dist`

### Authentication Flow
1. User enters email in Login component
2. Frontend POSTs to `/api/users/login` with email
3. Backend queries PostgreSQL for matching user
4. If exists: returns user object (id, email, name) → stored in localStorage
5. If not: returns 401 "Invalid credentials"
6. No JWT/tokens - uses localStorage for session persistence
7. Only pre-registered users can log in

### Database Schema
- **Users table**: `id` (serial PK), `email` (unique), `name`, `created_at`
- Initialized via `database/init.sql` and seeded via `database/seed.sql`
- Connection string: `postgresql://bingo_user:bingo_password@localhost:5432/dtpa_bingo`
- Uses pg Pool for connection pooling

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:email` - Get user by email
- `POST /api/users/login` - Login (body: `{ email }`)
- `POST /api/users` - Create user (body: `{ email, name }`)
- `PUT /api/users/:email` - Update user name (body: `{ name }`)

### Component Architecture

**App.tsx** - Root component
- Manages authentication state
- Routes between Login and BingoBoard based on user state
- Handles localStorage persistence on mount

**Login Component** (`src/components/login/`)
- Email input form with error handling
- API communication with `/api/users/login`
- localStorage integration for session persistence
- Glassmorphism design with responsive layout

**BingoBoard Component** (`src/components/bingo-board/`)
- 5x5 grid with items from `src/data/bingoItems.json`
- Center cell (id=12) is "FREE" space with DTPA base image
- Click to toggle marked state
- Win detection: 5 rows + 5 columns + 2 diagonals
- Win overlay with animation and reset button
- **Mobile/Tablet UX**: Text displayed without blur (desktop uses blur effect removed on hover)

### Styling Approach
- Modular CSS: Separate `.css` file per component
- CSS Grid for bingo board layout
- Glassmorphism: Semi-transparent backgrounds with backdrop-filter blur
- Responsive breakpoints: 480px (mobile), 768px (tablet)
- Dark mode support via `@media (prefers-color-scheme)`
- Animations: Keyframes for win overlay, transitions for interactions

### Production Build & Deployment
- Build process: TypeScript compilation → Vite bundling → output to `/dist`
- Express serves static files from `/dist` in production
- Client-side routing fallback: all non-API requests serve `index.html`
- Deployed to Render.com via `render.yaml` config
- Environment variable `DATABASE_URL` points to external PostgreSQL instance

### State Management
- Minimal approach: React hooks only (useState, useEffect)
- localStorage for session persistence
- Local component state (no Redux/Zustand/etc.)
- Suitable for application scale

## Important Notes

### Database in Production
After deploying to Render.com, run these commands once in the Render dashboard Shell:
```bash
psql $DATABASE_URL -f database/init.sql
psql $DATABASE_URL -f database/seed.sql
```

### TypeScript Configuration
- **tsconfig.app.json**: Frontend config (ES2022, ESNext modules, react-jsx)
- **tsconfig.node.json**: Backend/build config (ES2023, ESNext modules)
- Both use strict mode and enforce no unused locals/parameters

### Vite Proxy Configuration
In development, Vite proxies `/api` requests to `http://localhost:3001` to avoid CORS issues. This is configured in `vite.config.ts`.

### Client-Side Game Logic
- Bingo win detection runs entirely in the browser
- Board state managed in BingoBoard component
- No backend validation of game state
- localStorage persists user session but not board state
