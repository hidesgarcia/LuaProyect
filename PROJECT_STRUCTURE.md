# Complete Project Structure

```
DaniProyect/
│
├── README.md                    # Main documentation and overview
├── SETUP.md                     # Installation and setup guide
├── API.md                       # GraphQL API reference
├── FEATURES.md                  # Detailed features documentation
├── ROADMAP.md                   # Development roadmap and checklist
├── .gitignore                   # Git ignore file
├── start.sh                     # Quick start script for Linux/Mac
├── start.bat                    # Quick start script for Windows
├── docker-compose.yml           # Docker Compose orchestration
│
├── backend/                     # Node.js/GraphQL Backend
│   ├── src/
│   │   ├── server.js           # Main server file with Apollo & Express
│   │   │                        # - Express setup
│   │   │                        # - GraphQL endpoint
│   │   │                        # - WebSocket setup
│   │   │                        # - MongoDB connection
│   │   │
│   │   ├── graphql/
│   │   │   └── schema.js       # GraphQL type definitions
│   │   │                        # - User type
│   │   │                        # - Course type
│   │   │                        # - Quiz type
│   │   │                        # - Achievement type
│   │   │                        # - Query definitions
│   │   │                        # - Mutation definitions
│   │   │                        # - Subscription definitions
│   │   │
│   │   ├── models/             # MongoDB Mongoose schemas
│   │   │   ├── User.js         # User model with auth methods
│   │   │   │                    # - Username, email, password
│   │   │   │                    # - Points and level system
│   │   │   │                    # - Achievement tracking
│   │   │   │                    # - Enrolled courses
│   │   │   │
│   │   │   ├── Course.js       # Course model
│   │   │   │                    # - Title, description, category
│   │   │   │                    # - Instructor reference
│   │   │   │                    # - Lessons and quizzes
│   │   │   │                    # - Student enrollment
│   │   │   │
│   │   │   ├── Quiz.js         # Quiz model
│   │   │   │                    # - Questions with options
│   │   │   │                    # - Passing score
│   │   │   │                    # - Points reward
│   │   │   │
│   │   │   └── Achievement.js  # Achievement model
│   │   │                        # - Name, description, icon
│   │   │                        # - Unlock conditions
│   │   │
│   │   ├── resolvers/          # GraphQL resolver functions
│   │   │   ├── index.js        # Main resolver exports
│   │   │   ├── userResolvers.js  # User queries and mutations
│   │   │   │                      # - Register/Login
│   │   │   │                      # - Profile updates
│   │   │   │                      # - User queries
│   │   │   │
│   │   │   ├── courseResolvers.js # Course queries and mutations
│   │   │   │                       # - Create course
│   │   │   │                       # - Get courses
│   │   │   │                       # - Enroll in course
│   │   │   │
│   │   │   ├── quizResolvers.js   # Quiz queries and mutations
│   │   │   │                       # - Create quiz
│   │   │   │                       # - Submit answers
│   │   │   │                       # - Calculate scores
│   │   │   │
│   │   │   └── gamificationResolvers.js # Gamification logic
│   │   │                                 # - Rankings
│   │   │                                 # - Achievements
│   │   │                                 # - Points system
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT authentication middleware
│   │   │                        # - Token generation
│   │   │                        # - Token validation
│   │   │                        # - User extraction
│   │   │
│   │   └── services/           # Business logic services
│   │       ├── chatService.js  # WebSocket chat setup
│   │       │                    # - Room management
│   │       │                    # - Message handling
│   │       │                    # - Connection events
│   │       │
│   │       └── gamificationService.js # Gamification logic
│   │                            # - Point awarding
│   │                            # - Achievement checking
│   │                            # - Level calculation
│   │
│   ├── Dockerfile              # Docker image for backend
│   ├── package.json            # Node dependencies
│   ├── .env.example            # Environment variables template
│   └── seed.js                 # Sample seed data
│
├── frontend/                   # React Application
│   ├── public/
│   │   └── index.html         # Main HTML file
│   │
│   ├── src/
│   │   ├── App.js             # Main app component with routing
│   │   │                       # - Apollo Client setup
│   │   │                       # - Route configuration
│   │   │                       # - WebSocket setup
│   │   │
│   │   ├── index.js           # Entry point
│   │   │
│   │   ├── pages/             # Page components (screens)
│   │   │   ├── Login.js       # Login page
│   │   │   │                  # - Form handling
│   │   │   │                  # - GraphQL mutation
│   │   │   │                  # - Token storage
│   │   │   │
│   │   │   ├── Register.js    # Registration page
│   │   │   │                  # - User creation
│   │   │   │                  # - Validation
│   │   │   │
│   │   │   ├── Dashboard.js   # User dashboard
│   │   │   │                  # - User stats display
│   │   │   │                  # - Recent achievements
│   │   │   │                  # - Quick actions
│   │   │   │
│   │   │   ├── Courses.js     # Courses listing page
│   │   │   │                  # - Course grid
│   │   │   │                  # - Filtering and search
│   │   │   │                  # - Category filter
│   │   │   │
│   │   │   ├── CourseDetail.js # Individual course page
│   │   │   │                   # - Course information
│   │   │   │                   # - Lessons list
│   │   │   │                   # - Quizzes list
│   │   │   │                   # - Enroll button
│   │   │   │
│   │   │   ├── Quiz.js        # Quiz interface
│   │   │   │                  # - Question display
│   │   │   │                  # - Answer selection
│   │   │   │                  # - Score calculation
│   │   │   │                  # - Results display
│   │   │   │
│   │   │   ├── Rankings.js    # Global rankings page
│   │   │   │                  # - Leaderboard table
│   │   │   │                  # - Top performers
│   │   │   │                  # - User position
│   │   │   │
│   │   │   ├── Forum.js       # Forum page
│   │   │   │                  # - Post creation
│   │   │   │                  # - Post listing
│   │   │   │                  # - Reply functionality
│   │   │   │
│   │   │   └── Chat.js        # Real-time chat page
│   │   │                       # - Message display
│   │   │                       # - Message input
│   │   │                       # - WebSocket handling
│   │   │
│   │   ├── components/        # Reusable components
│   │   │   ├── Navigation.js  # Top navigation bar
│   │   │   │                  # - Logo and brand
│   │   │   │                  # - Navigation links
│   │   │   │                  # - Logout button
│   │   │   │
│   │   │   └── CourseCard.js  # Course card component
│   │   │                       # - Course preview
│   │   │                       # - Quick info
│   │   │                       # - Link to details
│   │   │
│   │   └── styles/            # CSS stylesheets
│   │       ├── index.css      # Global styles
│   │       │                  # - Base styles
│   │       │                  # - Button styles
│   │       │                  # - Form styles
│   │       │
│   │       ├── Auth.css       # Login/Register styles
│   │       ├── Dashboard.css  # Dashboard styles
│   │       ├── Courses.css    # Courses page styles
│   │       ├── CourseCard.css # Course card styles
│   │       ├── CourseDetail.css # Course detail styles
│   │       ├── Quiz.css       # Quiz styles
│   │       ├── Rankings.css   # Rankings styles
│   │       ├── Forum.css      # Forum styles
│   │       ├── Chat.css       # Chat styles
│   │       └── Navigation.css # Navigation styles
│   │
│   ├── Dockerfile             # Docker image for frontend
│   ├── package.json           # React dependencies
│   ├── STRUCTURE.md           # Frontend structure documentation
│   └── .env.example           # Environment variables template
│
├── docker/                    # Docker configuration files
│   ├── Dockerfile.backend     # Production backend image (multi-stage)
│   ├── Dockerfile.frontend    # Production frontend image (nginx)
│   └── nginx.conf            # Nginx configuration for frontend
│
└── .github/                   # GitHub configuration (optional)
    └── workflows/            # CI/CD workflows (future)
```

## 📁 Directory Descriptions

### Root Level
- **README.md**: Complete project overview and documentation
- **SETUP.md**: Step-by-step installation guide
- **API.md**: GraphQL API reference
- **FEATURES.md**: Detailed features documentation
- **ROADMAP.md**: Development roadmap
- **docker-compose.yml**: Orchestrates all services
- **start.sh / start.bat**: Quick start scripts

### Backend Structure (`backend/`)
- **src/server.js**: Express server with Apollo GraphQL and Socket.io
- **src/graphql/schema.js**: GraphQL type definitions and schema
- **src/models/**: MongoDB Mongoose models
- **src/resolvers/**: GraphQL resolver functions
- **src/middleware/auth.js**: JWT authentication
- **src/services/**: Business logic (chat, gamification)

### Frontend Structure (`frontend/`)
- **public/**: Static assets
- **src/pages/**: Full-page components
- **src/components/**: Reusable UI components
- **src/styles/**: CSS files for styling
- **src/App.js**: Main routing and Apollo setup

### Docker Configuration (`docker/`)
- **Dockerfile.backend**: Production-ready backend image
- **Dockerfile.frontend**: Production frontend with Nginx
- **nginx.conf**: Nginx configuration

## 🔄 Component Relationships

```
Frontend → GraphQL Requests → Backend Resolvers
  ↓                             ↓
Apollo Client           MongoDB Database
  ↓                             
Socket.io ←→ Socket.io Server ←→ Real-time Events
  ↓
Chat / Notifications
```

## 📊 Data Flow

```
User Input → React Component → Apollo Query/Mutation
                                       ↓
                                  GraphQL Resolver
                                       ↓
                                  Database Query
                                       ↓
                                 Return Data
                                       ↓
                              Apollo Client Cache
                                       ↓
                              React Re-render
```

## 🔐 Authentication Flow

```
1. User Registration/Login → userResolvers
2. Generate JWT Token → auth.js
3. Store in localStorage → Frontend
4. Send in Authorization Header → API Requests
5. Verify Token → authMiddleware
6. Extract User Info → GraphQL Context
```

## 📡 Real-time Communication

```
Frontend Socket.io Client
           ↓
      Join Room
           ↓
    Send/Receive Messages
           ↓
Backend Socket.io Server
           ↓
    Broadcast to Room
           ↓
All Clients in Room
```

## 🗄️ Database Schema

### Users Collection
- username (unique)
- email (unique)
- password (hashed)
- role (STUDENT/INSTRUCTOR/ADMIN)
- points, level, achievements
- enrolledCourses

### Courses Collection
- title, description, category, level
- instructor (reference to User)
- lessons, quizzes (arrays)
- students (array of User references)

### Quizzes Collection
- title, course (reference)
- questions (array with options and answers)
- pointsReward, passingScore

### Achievements Collection
- name, description, icon
- condition (unlock criteria)
- pointsValue

---

**Last Updated**: November 30, 2024
**Version**: 1.0.0
