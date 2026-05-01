#!/bin/bash

set -e

echo "🚀 Starting Notes App..."

# Check if PostgreSQL is running
echo "✓ Checking PostgreSQL connection..."
psql -U diegotuesta25 -d notesapp -c "SELECT 1" > /dev/null 2>&1 || {
  echo "❌ PostgreSQL not running or database doesn't exist"
  echo "Run: createdb notesapp"
  exit 1
}

# Create backend .env if it doesn't exist
if [ ! -f backend/.env ]; then
  echo "✓ Creating backend .env file..."
  cat > backend/.env << 'EOF'
DATABASE_URL="postgresql://diegotuesta25@localhost:5432/notesapp"
PORT=3000
FRONTEND_URL=http://localhost:5173
EOF
fi

# Create frontend .env if it doesn't exist
if [ ! -f frontend/.env ]; then
  echo "✓ Creating frontend .env file..."
  cat > frontend/.env << 'EOF'
VITE_API_URL=http://localhost:3000
EOF
fi

# Backend setup
echo "✓ Setting up backend..."
cd backend
npm install
npx prisma db push
npm run start:dev &
BACKEND_PID=$!

sleep 3

# Frontend setup
echo "✓ Setting up frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Notes App is running!"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"

wait $BACKEND_PID $FRONTEND_PID