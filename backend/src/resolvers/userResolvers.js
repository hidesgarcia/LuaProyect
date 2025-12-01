const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

const userResolvers = {
  Query: {
    user: async (_, { id }) => {
      return await User.findById(id).populate('enrolledCourses achievements');
    },
    currentUser: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return await User.findById(user._id).populate('enrolledCourses achievements');
    },
    users: async () => {
      return await User.find().populate('enrolledCourses');
    }
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) throw new Error('User already exists');

      const user = new User({ username, email, password });
      await user.save();

      const token = generateToken(user._id);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) throw new Error('Invalid password');

      const token = generateToken(user._id);
      return { token, user };
    },
    updateProfile: async (_, { username, bio }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { username, bio },
        { new: true }
      );
      return updatedUser;
    }
  }
};

module.exports = userResolvers;
