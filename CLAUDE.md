# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DTPA Bingo is a web application with React 19 + TypeScript frontend. The application runs entirely client-side with no authentication required.

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

## Architecture & Key Patterns

### Application Structure
- **Frontend (React)**: Runs on port 5173 in development via Vite
- **Production**: Static files served from `/dist`

### Component Architecture

**App.tsx** - Root component
- Renders BingoBoard directly

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
- Build process: Vite bundling → output to `/dist`
- Static files served from `/dist` in production
- Deployed to Render.com via `render.yaml` config

### State Management
- Minimal approach: React hooks only (useState)
- Local component state (no Redux/Zustand/etc.)
- Suitable for application scale

## Important Notes

### TypeScript Configuration
- **tsconfig.app.json**: Frontend config (ES2022, ESNext modules, react-jsx)
- Both use strict mode and enforce no unused locals/parameters

### Client-Side Game Logic
- Bingo win detection runs entirely in the browser
- Board state managed in BingoBoard component
- No backend or persistence
