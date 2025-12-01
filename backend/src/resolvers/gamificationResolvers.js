const User = require('../models/User');
const Achievement = require('../models/Achievement');

const gamificationResolvers = {
  Query: {
    rankings: async () => {
      const users = await User.find()
        .sort({ points: -1, level: -1 })
        .limit(100)
        .populate('achievements');
      
      return users.map((user, index) => ({
        user,
        position: index + 1,
        points: user.points,
        level: user.level,
        coursesCompleted: user.enrolledCourses.length
      }));
    },
    userRanking: async (_, { userId }) => {
      const users = await User.find()
        .sort({ points: -1, level: -1 })
        .populate('achievements');
      
      const userIndex = users.findIndex(u => u._id.toString() === userId);
      if (userIndex === -1) throw new Error('User not found');
      
      const user = users[userIndex];
      return {
        user,
        position: userIndex + 1,
        points: user.points,
        level: user.level,
        coursesCompleted: user.enrolledCourses.length
      };
    },
    achievements: async () => {
      return await Achievement.find();
    },
    userAchievements: async (_, { userId }) => {
      const user = await User.findById(userId).populate('achievements');
      return user.achievements;
    }
  },
  Mutation: {
    awardPoints: async (_, { userId, points }, { user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Not authorized');
      
      const targetUser = await User.findById(userId);
      targetUser.points += points;
      targetUser.level = Math.floor(targetUser.points / 1000) + 1;
      await targetUser.save();
      
      return targetUser;
    },
    awardAchievement: async (_, { userId, achievementId }, { user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Not authorized');
      
      const targetUser = await User.findById(userId);
      const achievement = await Achievement.findById(achievementId);
      
      if (!targetUser.achievements.includes(achievementId)) {
        targetUser.achievements.push(achievementId);
        await targetUser.save();
      }
      
      return achievement;
    }
  }
};

module.exports = gamificationResolvers;
