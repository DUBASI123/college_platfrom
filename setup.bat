@echo off
REM College Platform Setup Script for Windows

echo Starting College Platform Setup...

REM Backend Setup
echo Installing backend dependencies...
cd backend
call npm install
cd ..

REM Frontend Setup
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo Setup complete! You can now run:
echo   npm run dev (from backend)
echo   npm start (from frontend)
echo Or use Docker:
echo   docker-compose up --build
pause
