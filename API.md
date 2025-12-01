# GraphQL API Reference

## Base URL
- Development: `http://localhost:4000/graphql`
- Production: `https://api.yourdomain.com/graphql`

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Queries & Mutations

### Register
Create a new user account.

```graphql
mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    token
    user {
      id
      username
      email
      role
      points
      level
    }
  }
}
```

**Variables:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

### Login
Authenticate existing user.

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
      email
      role
      points
      level
      achievements {
        id
        name
      }
      enrolledCourses {
        id
        title
      }
    }
  }
}
```

### Get Current User
Retrieve authenticated user's profile.

```graphql
query CurrentUser {
  currentUser {
    id
    username
    email
    points
    level
    achievements {
      id
      name
      description
      icon
    }
    enrolledCourses {
      id
      title
      description
    }
  }
}
```

### Update Profile
Update user profile information.

```graphql
mutation UpdateProfile($username: String, $bio: String) {
  updateProfile(username: $username, bio: $bio) {
    id
    username
    bio
  }
}
```

---

## Course Queries & Mutations

### Get All Courses
Retrieve all available courses.

```graphql
query GetCourses {
  courses {
    id
    title
    description
    category
    level
    instructor {
      id
      username
    }
    lessons {
      id
      title
    }
    quizzes {
      id
      title
      pointsReward
    }
  }
}
```

### Get Single Course
Retrieve course details.

```graphql
query GetCourse($id: ID!) {
  course(id: $id) {
    id
    title
    description
    category
    level
    thumbnail
    rating
    instructor {
      id
      username
      email
    }
    lessons {
      id
      title
      content
      videoUrl
      duration
      order
    }
    quizzes {
      id
      title
      pointsReward
      passingScore
      questions {
        id
        text
        options
      }
    }
    students {
      id
      username
    }
  }
}
```

### Get Courses by Category
Filter courses by category.

```graphql
query GetCoursesByCategory($category: String!) {
  coursesByCategory(category: $category) {
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

**Variables:**
```json
{
  "category": "Mathematics"
}
```

### Get My Enrolled Courses
Get courses current user is enrolled in.

```graphql
query GetMyEnrolledCourses {
  myEnrolledCourses {
    id
    title
    description
    progress
    completionPercentage
  }
}
```

### Create Course
Create a new course (Instructor only).

```graphql
mutation CreateCourse($title: String!, $description: String!, $category: String!) {
  createCourse(title: $title, description: $description, category: $category) {
    id
    title
    description
    category
    level
    instructor {
      id
      username
    }
  }
}
```

### Enroll in Course
Enroll current user in a course.

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

### Complete Course
Mark course as completed.

```graphql
mutation CompleteCourse($courseId: ID!) {
  completeCourse(courseId: $courseId) {
    user {
      id
      points
      level
    }
    completionPercentage
  }
}
```

---

## Quiz Queries & Mutations

### Get Quiz
Retrieve quiz details and questions.

```graphql
query GetQuiz($id: ID!) {
  quiz(id: $id) {
    id
    title
    course {
      id
      title
    }
    questions {
      id
      text
      options
    }
    pointsReward
    passingScore
  }
}
```

### Get Quizzes by Course
Get all quizzes for a course.

```graphql
query GetQuizzesByCourse($courseId: ID!) {
  quizzesByCourse(courseId: $courseId) {
    id
    title
    pointsReward
    passingScore
  }
}
```

### Submit Quiz Answers
Submit quiz responses and get results.

```graphql
mutation SubmitQuizAnswer($quizId: ID!, $answers: [Int!]!) {
  submitQuizAnswer(quizId: $quizId, answers: $answers) {
    score
    pointsEarned
    completedAt
  }
}
```

**Variables:**
```json
{
  "quizId": "123abc",
  "answers": [0, 2, 1, 0, 3]
}
```

### Get My Quiz Results
Get all quiz results for current user.

```graphql
query GetMyQuizResults {
  myQuizResults {
    id
    quiz {
      id
      title
    }
    score
    pointsEarned
    completedAt
  }
}
```

---

## Gamification Queries & Mutations

### Get Global Rankings
Retrieve global leaderboard.

```graphql
query GetRankings {
  rankings {
    position
    points
    level
    coursesCompleted
    user {
      id
      username
    }
  }
}
```

### Get User Ranking
Get user's position in ranking.

```graphql
query GetUserRanking($userId: ID!) {
  userRanking(userId: $userId) {
    position
    points
    level
    coursesCompleted
    user {
      id
      username
    }
  }
}
```

### Get All Achievements
Retrieve all available achievements.

```graphql
query GetAchievements {
  achievements {
    id
    name
    description
    icon
    condition
    pointsValue
  }
}
```

### Get User Achievements
Get achievements unlocked by user.

```graphql
query GetUserAchievements($userId: ID!) {
  userAchievements(userId: $userId) {
    id
    name
    description
    icon
    unlockedAt
  }
}
```

### Award Points
Award points to user (Admin only).

```graphql
mutation AwardPoints($userId: ID!, $points: Int!) {
  awardPoints(userId: $userId, points: $points) {
    id
    points
    level
  }
}
```

### Award Achievement
Award achievement to user (Admin only).

```graphql
mutation AwardAchievement($userId: ID!, $achievementId: ID!) {
  awardAchievement(userId: $userId, achievementId: $achievementId) {
    id
    name
    description
  }
}
```

---

## Forum Queries & Mutations

### Get Forum Posts
Retrieve forum posts.

```graphql
query GetForumPosts($courseId: ID) {
  forumPosts(courseId: $courseId) {
    id
    title
    content
    author {
      id
      username
    }
    replies {
      id
      content
      author {
        username
      }
    }
    createdAt
    updatedAt
  }
}
```

### Get Single Forum Post
Retrieve post details.

```graphql
query GetForumPost($id: ID!) {
  forumPost(id: $id) {
    id
    title
    content
    author {
      id
      username
      email
    }
    replies {
      id
      content
      author {
        id
        username
      }
      createdAt
    }
    createdAt
    updatedAt
  }
}
```

### Create Forum Post
Create new forum post.

```graphql
mutation CreateForumPost($title: String!, $content: String!, $courseId: ID) {
  createForumPost(title: $title, content: $content, courseId: $courseId) {
    id
    title
    content
    author {
      id
      username
    }
    createdAt
  }
}
```

### Reply to Forum Post
Add reply to forum post.

```graphql
mutation ReplyToForumPost($postId: ID!, $content: String!) {
  replyToForumPost(postId: $postId, content: $content) {
    id
    content
    author {
      id
      username
    }
    createdAt
  }
}
```

---

## Error Handling

### Common Errors

**Authentication Error**
```json
{
  "errors": [
    {
      "message": "Not authenticated",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

**Authorization Error**
```json
{
  "errors": [
    {
      "message": "Not authorized",
      "extensions": {
        "code": "FORBIDDEN"
      }
    }
  ]
}
```

**Not Found Error**
```json
{
  "errors": [
    {
      "message": "User not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

---

## WebSocket Events (Socket.io)

### Connect to Chat Room

```javascript
const socket = io('http://localhost:4000');

// Join a room
socket.emit('join-room', 'general');

// Listen for confirmation
socket.on('room-joined', (data) => {
  console.log(data.message);
});
```

### Send Message

```javascript
socket.emit('send-message', {
  roomId: 'general',
  senderId: 'user123',
  senderName: 'John Doe',
  message: 'Hello everyone!'
});
```

### Receive Message

```javascript
socket.on('receive-message', (data) => {
  console.log(`${data.senderName}: ${data.message}`);
});
```

### Leave Room

```javascript
socket.emit('leave-room', 'general');

socket.on('user-left', (data) => {
  console.log(data.message);
});
```

### Achievements Unlocked

```javascript
socket.on('achievements-unlocked', (data) => {
  console.log(`User ${data.userId} unlocked:`, data.achievements);
});
```

---

## Rate Limiting

API endpoints have rate limits:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

For large datasets, use pagination:

```graphql
query GetCourses($first: Int, $after: String) {
  courses(first: $first, after: $after) {
    edges {
      node {
        id
        title
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

## Subscriptions

Real-time subscriptions for live updates:

```graphql
subscription OnMessageSent {
  messageSent {
    id
    sender {
      username
    }
    content
    timestamp
  }
}
```

```graphql
subscription OnUserPointsUpdated {
  userPointsUpdated {
    id
    username
    points
    level
  }
}
```

---

## Best Practices

1. **Always use HTTPS** in production
2. **Validate input** on both client and server
3. **Cache frequently accessed data** using Apollo Client cache
4. **Use pagination** for large datasets
5. **Implement error handling** on client side
6. **Monitor API performance** and logs
7. **Rate limit** to prevent abuse
8. **Use indexes** on MongoDB collections

---

**Last Updated**: November 30, 2024
