const Course = require('../models/Course');
const User = require('../models/User');

const courseResolvers = {
  Query: {
    courses: async () => {
      return await Course.find().populate('instructor lessons quizzes');
    },
    course: async (_, { id }) => {
      return await Course.findById(id).populate('instructor lessons quizzes students');
    },
    coursesByCategory: async (_, { category }) => {
      return await Course.find({ category }).populate('instructor');
    },
    myEnrolledCourses: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findById(user._id).populate('enrolledCourses');
    }
  },
  Mutation: {
    createCourse: async (_, { title, description, category }, { user }) => {
      if (!user || user.role !== 'INSTRUCTOR') throw new Error('Not authorized');
      
      const course = new Course({
        title,
        description,
        category,
        instructor: user._id
      });
      await course.save();
      return await course.populate('instructor');
    },
    enrollCourse: async (_, { courseId }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      
      const course = await Course.findById(courseId);
      if (!course.students.includes(user._id)) {
        course.students.push(user._id);
        await course.save();
      }
      
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }
      
      return await course.populate('students lessons');
    }
  }
};

module.exports = courseResolvers;
