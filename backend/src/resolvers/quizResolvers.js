const Quiz = require('../models/Quiz');
const { awardPoints, checkAchievements } = require('../services/gamificationService');

const quizResolvers = {
  Query: {
    quiz: async (_, { id }) => {
      return await Quiz.findById(id).populate('course');
    },
    quizzesByCourse: async (_, { courseId }) => {
      return await Quiz.find({ course: courseId });
    }
  },
  Mutation: {
    createQuiz: async (_, { courseId, title, pointsReward, passingScore }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      
      const quiz = new Quiz({
        title,
        course: courseId,
        pointsReward,
        passingScore
      });
      await quiz.save();
      return await quiz.populate('course');
    },
    submitQuizAnswer: async (_, { quizId, answers }, { user, io }) => {
      if (!user) throw new Error('Not authenticated');
      
      const quiz = await Quiz.findById(quizId);
      
      let score = 0;
      answers.forEach((answer, index) => {
        if (index < quiz.questions.length && answer === quiz.questions[index].correctAnswer) {
          score++;
        }
      });
      
      const percentage = (score / quiz.questions.length) * 100;
      const pointsEarned = percentage >= quiz.passingScore ? quiz.pointsReward : 0;
      
      // Award points
      if (pointsEarned > 0) {
        await awardPoints(user._id, pointsEarned);
        
        // Check for new achievements
        const newAchievements = await checkAchievements(user._id);
        
        // Emit achievement update via socket.io
        if (io && newAchievements.length > 0) {
          io.emit('achievements-unlocked', { userId: user._id, achievements: newAchievements });
        }
      }
      
      return {
        score: percentage,
        pointsEarned,
        completedAt: new Date().toISOString()
      };
    }
  }
};

module.exports = quizResolvers;
