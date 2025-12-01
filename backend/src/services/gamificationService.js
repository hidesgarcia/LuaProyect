const User = require('../models/User');
const Achievement = require('../models/Achievement');

const awardPoints = async (userId, points) => {
  const user = await User.findById(userId);
  user.points += points;
  
  // Calculate level based on points
  user.level = Math.floor(user.points / 1000) + 1;
  
  await user.save();
  return user;
};

const checkAchievements = async (userId) => {
  const user = await User.findById(userId).populate('achievements');
  const achievements = await Achievement.find();
  const unlockedAchievements = [];

  for (const achievement of achievements) {
    // Parse condition and check if user qualifies
    // Example: "points:1000" or "coursesCompleted:5"
    const [type, value] = achievement.condition.split(':');
    let qualifies = false;

    switch(type) {
      case 'points':
        qualifies = user.points >= parseInt(value);
        break;
      case 'level':
        qualifies = user.level >= parseInt(value);
        break;
      // Add more conditions as needed
    }

    if (qualifies && !user.achievements.includes(achievement._id)) {
      user.achievements.push(achievement._id);
      unlockedAchievements.push(achievement);
    }
  }

  if (unlockedAchievements.length > 0) {
    await user.save();
  }

  return unlockedAchievements;
};

module.exports = { awardPoints, checkAchievements };
