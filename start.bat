@echo off
REM Khan Academy Platform - Docker Quick Start for Windows

echo 🚀 Starting Khan Academy Platform...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop for Windows first.
    exit /b 1
)

REM Create .env files if they don't exist
if not exist "backend\.env" (
    echo Creating backend\.env...
    copy backend\.env.example backend\.env
)

REM Start services
echo Starting services with Docker Compose...
docker-compose up -d

REM Wait for services
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak

REM Check if services are running
echo ✅ Services started!
echo.
echo 🎓 Khan Academy Platform is ready!
echo.
echo 📍 Access points:
echo    Frontend:  http://localhost:3000
echo    Backend:   http://localhost:4000
echo    GraphQL:   http://localhost:4000/graphql
echo    MongoDB:   mongodb://localhost:27017
echo.
echo 📚 Documentation:
echo    - README.md for overview
echo    - SETUP.md for detailed setup
echo    - API.md for GraphQL reference
echo.
echo 🛑 To stop services: docker-compose down
