#!/bin/bash
set -e

echo "🚀 Starting Notes App..."

# ─────────────────────────────────────────────
# Check prerequisites
# ─────────────────────────────────────────────
echo "✓ Checking prerequisites..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Install it from https://nodejs.org"
  exit 1
fi

if ! command -v psql &> /dev/null; then
  echo "❌ PostgreSQL is not installed."
  echo "   On macOS: brew install postgresql && brew services start postgresql"
  echo "   On Linux: sudo apt install postgresql && sudo service postgresql start"
  exit 1
fi

# ─────────────────────────────────────────────
# Detect PostgreSQL user (Mac uses your OS username, Linux uses 'postgres')
# ─────────────────────────────────────────────
if psql -U "$USER" -d postgres -c "SELECT 1" &> /dev/null; then
  PG_USER="$USER"
elif psql -U postgres -d postgres -c "SELECT 1" &> /dev/null; then
  PG_USER="postgres"
else
  echo "❌ Cannot connect to PostgreSQL."
  echo "   Make sure PostgreSQL is running and you can connect with:"
  echo "   - psql -U $USER  (macOS default)"
  echo "   - psql -U postgres  (Linux default)"
  exit 1
fi

echo "  Using PostgreSQL user: $PG_USER"

# ─────────────────────────────────────────────
# Create database if it doesn't exist
# ─────────────────────────────────────────────
if ! psql -U "$PG_USER" -d notesapp -c "SELECT 1" &> /dev/null; then
  echo "✓ Creating database 'notesapp'..."
  createdb -U "$PG_USER" notesapp
else
  echo "✓ Database 'notesapp' already exists"
fi

# ─────────────────────────────────────────────
# Create backend .env if it doesn't exist
# ─────────────────────────────────────────────
if [ ! -f backend/.env ]; then
  echo "✓ Creating backend/.env..."
  cat > backend/.env << EOF
DATABASE_URL="postgresql://${PG_USER}@localhost:5432/notesapp"
PORT=3000
FRONTEND_URL=http://localhost:5173
EOF
fi

# ─────────────────────────────────────────────
# Create frontend .env if it doesn't exist
# ─────────────────────────────────────────────
if [ ! -f frontend/.env ]; then
  echo "✓ Creating frontend/.env..."
  cat > frontend/.env << 'EOF'
VITE_API_URL=http://localhost:3000
EOF
fi

# ─────────────────────────────────────────────
# Backend setup
# ─────────────────────────────────────────────
echo "✓ Setting up backend..."
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev &
BACKEND_PID=$!

sleep 3

# ─────────────────────────────────────────────
# Frontend setup
# ─────────────────────────────────────────────
echo "✓ Setting up frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

# ─────────────────────────────────────────────
# Cleanup on exit
# ─────────────────────────────────────────────
cleanup() {
  echo ""
  echo "🛑 Stopping services..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
  exit 0
}
trap cleanup INT TERM

echo ""
echo "✅ Notes App is running!"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"

wait $BACKEND_PID $FRONTEND_PID