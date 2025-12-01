# Khan Academy Style Platform with Gamification

A comprehensive educational platform built with modern web technologies featuring interactive courses, gamification elements, real-time communication, and scalable architecture.

## 🎯 Features

### Core Features
- **Dynamic Courses**: Browse and enroll in various courses across multiple categories
- **Interactive Quizzes**: Test knowledge with interactive quizzes and immediate feedback
- **Gamification System**: 
  - Points system for completing courses and quizzes
  - Achievement badges for milestones
  - Global rankings leaderboard
  - Level progression system
- **Community Features**:
  - Forum for discussions
  - Real-time chat with WebSockets
  - User achievements and progress tracking
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile

### Technical Highlights
- GraphQL API with Apollo Server
- Real-time WebSocket communication using Socket.io
- MongoDB database for data persistence
- Docker containerization for easy deployment
- JWT authentication
- Role-based access control (Student, Instructor, Admin)

## 🏗️ Project Structure

```
DaniProyect/
├── backend/                 # Node.js GraphQL Backend
│   ├── src/
│   │   ├── server.js       # Express & Apollo server setup
│   │   ├── graphql/
│   │   │   └── schema.js   # GraphQL schema definitions
│   │   ├── models/         # MongoDB Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Quiz.js
│   │   │   └── Achievement.js
│   │   ├── resolvers/      # GraphQL resolvers
│   │   │   ├── userResolvers.js
│   │   │   ├── courseResolvers.js
│   │   │   ├── quizResolvers.js
│   │   │   └── gamificationResolvers.js
│   │   ├── middleware/
│   │   │   └── auth.js     # JWT authentication
│   │   └── services/
│   │       ├── chatService.js      # WebSocket setup
│   │       └── gamificationService.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── frontend/                # React Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js          # Main app component
│   │   ├── pages/          # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Courses.js
│   │   │   ├── CourseDetail.js
│   │   │   ├── Quiz.js
│   │   │   ├── Rankings.js
│   │   │   ├── Forum.js
│   │   │   └── Chat.js
│   │   ├── components/     # Reusable components
│   │   │   ├── Navigation.js
│   │   │   └── CourseCard.js
│   │   ├── styles/         # CSS files
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── STRUCTURE.md
│
├── docker/                  # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── nginx.conf
│
├── docker-compose.yml      # Docker Compose orchestration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Docker & Docker Compose (optional, for containerized setup)
- npm or yarn

### Local Development Setup

#### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

npm run dev
# Server runs on http://localhost:4000
```

#### 2. Frontend Setup

```bash
cd frontend
npm install

npm start
# Application runs on http://localhost:3000
```

### Docker Setup

```bash
# From project root directory
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend GraphQL: http://localhost:4000/graphql
# MongoDB: localhost:27017
```

## 📚 API Documentation

### Authentication

**Register**
```graphql
mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    token
    user {
      id
      username
      email
    }
  }
}
```

**Login**
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
      points
      level
    }
  }
}
```

### Courses

**Get All Courses**
```graphql
query Courses {
  courses {
    id
    title
    description
    category
    level
    instructor {
      username
    }
  }
}
```

**Enroll in Course**
```graphql
mutation EnrollCourse($courseId: ID!) {
  enrollCourse(courseId: $courseId) {
    id
    title
    students {
      id
      username
    }
  }
}
```

### Gamification

**Get Rankings**
```graphql
query Rankings {
  rankings {
    position
    user {
      username
    }
    points
    level
    coursesCompleted
  }
}
```

**Submit Quiz**
```graphql
mutation SubmitQuizAnswer($quizId: ID!, $answers: [Int!]!) {
  submitQuizAnswer(quizId: $quizId, answers: $answers) {
    score
    pointsEarned
    completedAt
  }
}
```

## 🎮 Gamification System

### Points
- Complete a course: 100-500 points
- Pass a quiz: Varies based on quiz difficulty
- Achievement unlock: 50-200 points

### Achievements
- First Course: Complete your first course
- Quiz Master: Score 100% on a quiz
- Social Butterfly: Create 5 forum posts
- Level Up: Reach level 5, 10, 20, etc.

### Rankings
- Global leaderboard based on points
- Ranked by: Points (primary), Level (secondary), Courses Completed (tertiary)
- Updated in real-time

## 🔐 User Roles

- **Student**: Enroll in courses, take quizzes, participate in forums
- **Instructor**: Create courses, manage content, view student progress
- **Admin**: Manage users, courses, and award points/achievements

## 🔌 Real-Time Features

### WebSocket Events (Socket.io)

**Chat Messages**
```javascript
socket.emit('send-message', {
  roomId: 'general',
  senderId: 'user123',
  senderName: 'John Doe',
  message: 'Hello everyone!'
});

socket.on('receive-message', (data) => {
  console.log(`${data.senderName}: ${data.message}`);
});
```

**Achievement Unlocked**
```javascript
socket.on('achievements-unlocked', (data) => {
  console.log(`User ${data.userId} unlocked:`, data.achievements);
});
```

## 🐳 Docker Deployment

### Single Container Deployment

```bash
# Build images
docker-compose build

# Run services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/khan-academy
JWT_SECRET=your-secret-key-here
PORT=4000
NODE_ENV=development
```

**Frontend (.env)**
```
REACT_APP_GRAPHQL_URL=http://localhost:4000/graphql
REACT_APP_WS_URL=ws://localhost:4000/graphql
```

## 📦 Dependencies

### Backend
- express: Web framework
- apollo-server-express: GraphQL server
- mongoose: MongoDB ODM
- socket.io: Real-time communication
- jwt-simple: JWT authentication
- bcryptjs: Password hashing
- cors: Cross-origin support
- dotenv: Environment configuration

### Frontend
- react: UI library
- react-router-dom: Routing
- @apollo/client: GraphQL client
- socket.io-client: WebSocket client
- axios: HTTP client

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Production Deployment

### AWS/GCP/Azure Deployment

1. **Database**: Use managed MongoDB service (Atlas)
2. **Backend**: Deploy to App Engine, Elastic Beanstalk, or Cloud Run
3. **Frontend**: Deploy to S3 + CloudFront or similar CDN
4. **Containers**: Use ECR/GCR with ECS/GKE

### Environment Configuration

Update environment variables for production:
```bash
NODE_ENV=production
MONGODB_URI=<production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
CORS_ORIGIN=<your-domain>
```

## 🔒 Security Considerations

- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Use HTTPS in production
- [ ] Implement CSRF protection
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Implement proper error logging
- [ ] Use secrets management for sensitive data

## 🛠️ Development Tips

### Useful Commands

**Backend**
```bash
npm run dev        # Run with nodemon
npm start          # Production start
npm test           # Run tests
```

**Frontend**
```bash
npm start          # Development server
npm build          # Production build
npm test           # Run tests
npm eject          # Eject from create-react-app
```

### Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

**GraphQL Errors**
- Check schema.js for syntax errors
- Verify resolvers match schema
- Check browser console for details

**CORS Issues**
- Update corsOrigin in docker-compose.yml
- Ensure backend CORS is configured correctly
- Check browser CORS policy

## 📖 Learning Resources

- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Official Docs](https://graphql.org/learn/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Socket.io Documentation](https://socket.io/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🎓 Author

Created for Khan Academy Style Platform with Gamification Project

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

## 🚀 Future Enhancements

- [ ] Video lesson playback
- [ ] Mobile native app (React Native)
- [ ] Advanced analytics and reporting
- [ ] Recommended courses based on learning path
- [ ] Peer-to-peer tutoring
- [ ] Certifications and badges
- [ ] Advanced payment integration
- [ ] Machine learning for personalized learning
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1 AA compliance)

---

**Last Updated**: November 30, 2024
**Version**: 1.0.0
