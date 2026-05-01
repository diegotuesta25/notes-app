# Notes App

A full-stack notes application with categories and archive functionality.

## Tech Stack

**Frontend:**

- React 19.2.5
- Vite 8.0.10
- TypeScript 6.0.3
- Tailwind CSS 4.2.4
- Node.js v24.11.1
- npm 11.6.2

**Backend:**

- NestJS 11.1.19
- Node.js v24.11.1
- npm 11.6.2
- PostgreSQL 14.21
- Prisma 7.8.0

**Database:**

- PostgreSQL 14.21

## Prerequisites

- Node.js v24.11.1
- npm 11.6.2
- PostgreSQL 14.21 (running locally)

## Getting Started

### Quick Start (Recommended)

```bash
chmod +x start.sh
./start.sh
```

This will:

1. Install dependencies for both frontend and backend
2. Set up the database schema
3. Start the backend on port 3000
4. Start the frontend on port 5173

### Manual Setup

**Backend:**

```bash
cd backend
npm install
npx prisma db push
npm run start:dev
```

Backend runs on `http://localhost:3000`

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Environment Variables

**Backend** — Create `backend/.env`:
DATABASE_URL="postgresql://diegotuesta25@localhost:5432/notesapp"
PORT=3000
FRONTEND_URL=http://localhost:5173

**Frontend** — Create `frontend/.env`:
VITE_API_URL=http://localhost:3000

## Database Setup

PostgreSQL must be running locally with a database named `notesapp`:

```bash
createdb notesapp
```

Prisma will auto-migrate the schema on startup.

## Features

- ✅ Create, read, update, delete notes
- ✅ Archive and unarchive notes
- ✅ Create and manage categories
- ✅ Filter notes by category
- ✅ Responsive mobile design
- ✅ Real-time note updates with debounced saves

## API Endpoints

### Notes

- `GET /notes/active?categoryId=1` — Get active notes (optionally filtered by category)
- `GET /notes/archived?categoryId=1` — Get archived notes (optionally filtered by category)
- `POST /notes` — Create a note
- `PUT /notes/:id` — Update a note
- `DELETE /notes/:id` — Delete a note
- `PUT /notes/:id/archive` — Archive/unarchive a note
- `POST /notes/:id/category/:categoryId` — Add category to note
- `DELETE /notes/:id/category/:categoryId` — Remove category from note

### Categories

- `GET /categories` — Get all categories
- `POST /categories` — Create or find a category
- `DELETE /categories/:id` — Delete a category

## Project Structure

notes-app/
├── backend/
│ ├── src/
│ │ ├── notes/ # Notes module
│ │ ├── categories/ # Categories module
│ │ ├── prisma.service.ts
│ │ └── app.module.ts
│ ├── prisma/
│ │ ├── schema.prisma # Database schema
│ │ └── migrations/
│ ├── .env
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── hooks/ # Custom hooks
│ │ ├── libs/ # API client and types
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── .env
│ └── package.json
├── start.sh # Startup script
└── README.md

## Notes

- This project was developed iteratively over 3 days. Initial commits were organized by feature rather than chronological development order.
- Database credentials are hardcoded for local development — use environment variables in production.

## Author

Diego Tuesta
# notes-app
