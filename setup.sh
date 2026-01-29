#!/bin/bash
set -e

echo "Starting College Platform Setup..."

# Backend Setup
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Frontend Setup
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Setup complete! You can now run:"
echo "  npm run dev (from backend)"
echo "  npm start (from frontend)"
echo "Or use Docker:"
echo "  docker-compose up --build"
