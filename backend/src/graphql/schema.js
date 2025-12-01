const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: Role!
    points: Int!
    level: Int!
    achievements: [Achievement!]!
    enrolledCourses: [Course!]!
    createdAt: String!
    updatedAt: String!
  }

  type Course {
    id: ID!
    title: String!
    description: String!
    instructor: User!
    lessons: [Lesson!]!
    quizzes: [Quiz!]!
    students: [User!]!
    category: String!
    level: String!
    createdAt: String!
  }

  type Lesson {
    id: ID!
    title: String!
    content: String!
    videoUrl: String
    duration: Int!
    course: Course!
    order: Int!
  }

  type Quiz {
    id: ID!
    title: String!
    course: Course!
    questions: [Question!]!
    pointsReward: Int!
    passingScore: Int!
  }

  type Question {
    id: ID!
    text: String!
    options: [String!]!
    correctAnswer: Int!
    quiz: Quiz!
  }

  type UserProgress {
    id: ID!
    user: User!
    course: Course!
    lessonsCompleted: Int!
    quizzesCompleted: [QuizResult!]!
    completionPercentage: Float!
  }

  type QuizResult {
    id: ID!
    user: User!
    quiz: Quiz!
    score: Int!
    pointsEarned: Int!
    completedAt: String!
  }

  type Achievement {
    id: ID!
    name: String!
    description: String!
    icon: String!
    condition: String!
    unlockedAt: String
  }

  type Ranking {
    id: ID!
    user: User!
    position: Int!
    points: Int!
    level: Int!
    coursesCompleted: Int!
  }

  type ForumPost {
    id: ID!
    title: String!
    content: String!
    author: User!
    course: Course
    replies: [ForumReply!]!
    createdAt: String!
    updatedAt: String!
  }

  type ForumReply {
    id: ID!
    content: String!
    author: User!
    post: ForumPost!
    createdAt: String!
  }

  type ChatMessage {
    id: ID!
    sender: User!
    receiver: User
    content: String!
    room: String
    timestamp: String!
  }

  enum Role {
    STUDENT
    INSTRUCTOR
    ADMIN
  }

  type Query {
    # User queries
    user(id: ID!): User
    currentUser: User
    users: [User!]!
    userProgress(userId: ID!, courseId: ID!): UserProgress

    # Course queries
    courses: [Course!]!
    course(id: ID!): Course
    coursesByCategory(category: String!): [Course!]!
    myEnrolledCourses: [Course!]!

    # Quiz queries
    quiz(id: ID!): Quiz
    quizzesByCourse(courseId: ID!): [Quiz!]!
    myQuizResults: [QuizResult!]!

    # Gamification queries
    rankings: [Ranking!]!
    userRanking(userId: ID!): Ranking
    achievements: [Achievement!]!
    userAchievements(userId: ID!): [Achievement!]!

    # Forum queries
    forumPosts(courseId: ID): [ForumPost!]!
    forumPost(id: ID!): ForumPost

    # Chat queries
    chatHistory(userId: ID!, limit: Int): [ChatMessage!]!
  }

  type Mutation {
    # User mutations
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(username: String, bio: String): User

    # Course mutations
    createCourse(title: String!, description: String!, category: String!): Course
    enrollCourse(courseId: ID!): Course
    completeCourse(courseId: ID!): UserProgress

    # Lesson mutations
    createLesson(courseId: ID!, title: String!, content: String!, videoUrl: String, duration: Int!): Lesson
    updateLesson(lessonId: ID!, title: String, content: String): Lesson

    # Quiz mutations
    createQuiz(courseId: ID!, title: String!, pointsReward: Int!, passingScore: Int!): Quiz
    submitQuizAnswer(quizId: ID!, answers: [Int!]!): QuizResult

    # Forum mutations
    createForumPost(title: String!, content: String!, courseId: ID): ForumPost
    replyToForumPost(postId: ID!, content: String!): ForumReply

    # Gamification mutations
    awardPoints(userId: ID!, points: Int!): User
    awardAchievement(userId: ID!, achievementId: ID!): Achievement
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Subscription {
    messageSent: ChatMessage!
    userPointsUpdated: User!
  }
`;

module.exports = typeDefs;
