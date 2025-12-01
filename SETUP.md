# Khan Academy Platform - Installation & Setup Guide

## Quick Start Guide

### 🏃 5-Minute Quick Start

```bash
# 1. Install backend
cd backend
npm install
npm run dev

# 2. In another terminal, install frontend
cd frontend
npm install
npm start

# Application ready at http://localhost:3000
```

### 🐳 Docker Quick Start (Recommended)

```bash
# From project root
docker-compose up -d

# Wait for services to start (30-60 seconds)
# Access at http://localhost:3000
```

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm/yarn**: Latest version
- **MongoDB**: Local or cloud instance (or use Docker)
- **Docker**: Optional but recommended

### Check Versions

```bash
node --version    # Should be v18+
npm --version     # Should be v9+
docker --version  # If using Docker
```

## 🔧 Detailed Setup Instructions

### Option 1: Local Development

#### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# MONGODB_URI=mongodb://localhost:27017/khan-academy
# JWT_SECRET=your-secret-key

# Start backend server
npm run dev

# Expected output:
# 🚀 Server running at http://localhost:4000
# 🚀 GraphQL at http://localhost:4000/graphql
```

#### Step 2: MongoDB Setup (if not using Docker)

**Option A: Local MongoDB**
```bash
# Download and install from https://www.mongodb.com/try/download/community
# Or use Homebrew (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongosh
# If connected, exit with: exit
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update MONGODB_URI in .env

#### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Browser will open at http://localhost:3000
```

### Option 2: Docker Deployment

#### Prerequisites
- Docker installed
- Docker Compose installed

#### Setup

```bash
# Navigate to project root
cd DaniProyect

# Start all services
docker-compose up -d

# Wait for services to initialize
sleep 30

# Check service status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

#### Access Points
- **Frontend**: http://localhost:3000
- **Backend GraphQL**: http://localhost:4000/graphql
- **MongoDB**: mongodb://localhost:27017

#### Useful Docker Commands

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (removes database)
docker-compose down -v

# Rebuild images
docker-compose build

# View logs of specific service
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f

# Execute command in container
docker-compose exec backend npm run test

# Scale services
docker-compose up -d --scale backend=3
```

## 🔐 Authentication Setup

### Create First User

1. Navigate to http://localhost:3000/register
2. Create account with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test@12345`

### Login

1. Go to http://localhost:3000/login
2. Enter credentials
3. Token stored in localStorage

## 📊 Testing the Application

### Using GraphQL Playground

1. Go to http://localhost:4000/graphql
2. Try this query:

```graphql
query GetCourses {
  courses {
    id
    title
    description
    category
  }
}
```

### Using the UI

1. Register a new account
2. Enroll in a course
3. Take a quiz
4. View your ranking
5. Visit forum and chat

## 🔍 Environment Variables

### Backend (.env)

```env
# Database
MONGODB_URI=mongodb://root:password@mongo:27017/khan-academy?authSource=admin

# JWT
JWT_SECRET=your-secret-key-here-change-in-production

# Server
PORT=4000
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
REACT_APP_WS_URL=ws://localhost:4000/graphql
```

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed

**Symptoms**: "MongooseError: Cannot connect to MongoDB"

**Solutions**:
```bash
# Check if MongoDB is running
mongosh

# If not running (macOS)
brew services start mongodb-community

# Check connection string
# Should be: mongodb://username:password@host:port/database

# Verify MongoDB is listening
netstat -an | grep 27017
```

### Issue: Port Already in Use

**Symptoms**: "Error: listen EADDRINUSE :::4000"

**Solutions**:
```bash
# Find process using port 4000
lsof -i :4000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5000 npm run dev
```

### Issue: GraphQL Schema Issues

**Symptoms**: "Cannot query field 'users' on type 'Query'"

**Solutions**:
1. Check schema.js for typos
2. Restart backend server
3. Clear Apollo Client cache in browser DevTools

### Issue: CORS Errors

**Symptoms**: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solutions**:
```javascript
// Check backend CORS configuration in server.js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Issue: WebSocket Connection Failed

**Symptoms**: "Failed to connect to WebSocket"

**Solutions**:
1. Ensure backend is running
2. Check socket.io configuration
3. Verify WebSocket URL in frontend

## ✅ Verification Checklist

- [ ] Backend server running on port 4000
- [ ] Frontend application running on port 3000
- [ ] MongoDB connected
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can view courses
- [ ] Can enroll in course
- [ ] Can take quiz
- [ ] Can see rankings
- [ ] Chat messages appear in real-time

## 📚 Additional Resources

### Documentation Files
- `README.md` - Main documentation
- `SETUP.md` - This file
- `FEATURES.md` - Feature documentation
- `API.md` - GraphQL API reference

### Backend Structure
- Resolvers: `backend/src/resolvers/`
- Models: `backend/src/models/`
- Middleware: `backend/src/middleware/`
- Services: `backend/src/services/`

### Frontend Structure
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- Styles: `frontend/src/styles/`

## 🚀 Production Deployment

### Before Deploying
- [ ] Set NODE_ENV=production
- [ ] Update JWT_SECRET to strong random string
- [ ] Set up production MongoDB
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

### Deployment Steps

1. **Build Applications**
```bash
cd frontend
npm run build

cd backend
# Already ready for production
```

2. **Docker Build**
```bash
docker-compose -f docker-compose.yml build
```

3. **Push to Registry**
```bash
docker tag khan-academy-backend:latest myregistry/khan-academy-backend:1.0
docker push myregistry/khan-academy-backend:1.0
```

4. **Deploy to Cloud**
- Use Kubernetes manifests
- Or use cloud provider deployment tools

## 🔄 Updating Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update specific package
npm install package-name@latest

# Update all packages to latest major version
npm install -g npm-check-updates
ncu -u
npm install
```

## 📱 Testing on Mobile

### Using ngrok (for testing on phone)

```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000

# Access via ngrok URL on phone
# Example: https://abc123.ngrok.io
```

## 🎓 Next Steps

1. Explore the codebase
2. Modify styles to match your branding
3. Add more courses and quizzes
4. Implement additional gamification features
5. Deploy to production
6. Monitor and maintain

---

**Having issues?** Check the FAQ or open an issue on GitHub.
