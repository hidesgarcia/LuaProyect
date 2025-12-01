// Sample seed data for MongoDB

// Users
db.users.insertMany([
  {
    username: "instructor_john",
    email: "john@example.com",
    password: "hashed_password",
    role: "INSTRUCTOR",
    points: 1000,
    level: 2,
    achievements: [],
    enrolledCourses: [],
    bio: "Mathematics instructor with 10 years of experience",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "student_jane",
    email: "jane@example.com",
    password: "hashed_password",
    role: "STUDENT",
    points: 350,
    level: 1,
    achievements: [],
    enrolledCourses: [],
    bio: "Eager learner",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Courses
db.courses.insertMany([
  {
    title: "Introduction to Algebra",
    description: "Learn the fundamentals of algebraic equations and problem-solving",
    instructor: ObjectId("...instructor_john_id..."),
    lessons: [],
    quizzes: [],
    students: [],
    category: "Mathematics",
    level: "BEGINNER",
    rating: 4.5,
    thumbnail: "https://example.com/algebra.jpg",
    createdAt: new Date()
  }
]);

// Achievements
db.achievements.insertMany([
  {
    name: "First Course",
    description: "Complete your first course",
    icon: "🎓",
    condition: "coursesCompleted:1",
    pointsValue: 50,
    createdAt: new Date()
  },
  {
    name: "Quiz Master",
    description: "Score 100% on a quiz",
    icon: "🎯",
    condition: "quizScore:100",
    pointsValue: 100,
    createdAt: new Date()
  }
]);
