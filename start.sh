#!/bin/bash

# Khan Academy Platform - Docker Quick Start

echo "🚀 Starting Khan Academy Platform..."

# Create .env files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env..."
    cp backend/.env.example backend/.env
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Start services
echo "Starting services with Docker Compose..."
docker-compose up -d

# Wait for services
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "✅ Services started!"
echo ""
echo "🎓 Khan Academy Platform is ready!"
echo ""
echo "📍 Access points:"
echo "   Frontend:  http://localhost:3000"
echo "   Backend:   http://localhost:4000"
echo "   GraphQL:   http://localhost:4000/graphql"
echo "   MongoDB:   mongodb://localhost:27017"
echo ""
echo "📚 Documentation:"
echo "   - README.md for overview"
echo "   - SETUP.md for detailed setup"
echo "   - API.md for GraphQL reference"
echo ""
echo "🛑 To stop services: docker-compose down"
