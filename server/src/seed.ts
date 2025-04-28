import mongoose from 'mongoose';
import User from './models/User';
import UserProfile from './models/UserProfile';
import MoodTracker from './models/MoodTracker';
import Journal from './models/Journal';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb+srv://varunketa2004:abcdefg@cluster0.plhjgjd.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

const sampleUsers = [
  {
    email: 'varun@example.com',
    password: 'password123',
    name: 'Varun'
  }
];

const sampleUserProfiles = [
  {
    age: 25,
    gender: 'male',
    occupation: 'Software Developer',
    mentalHealthHistory: {
      conditions: ['anxiety', 'depression'],
      medications: [],
      therapyHistory: ['CBT']
    },
    currentConcerns: ['stress', 'work', 'sleep'],
    goals: ['reduce_anxiety', 'manage_stress', 'better_sleep'],
    supportSystem: {
      family: true,
      friends: true,
      professional: true,
      other: 'Online support groups'
    },
    selfCarePractices: ['meditation', 'exercise', 'journaling', 'social_connection'],
    stressLevel: 6,
    sleepQuality: 7
  }
];

const sampleMoodTrackers = [
  {
    mood: {
      rating: 8,
      emotions: ['happy', 'energetic', 'focused'],
      description: 'Had a productive day at work and completed all tasks'
    },
    activities: [
      {
        type: 'meditation',
        duration: 15,
        impact: 8
      },
      {
        type: 'exercise',
        duration: 30,
        impact: 9
      },
      {
        type: 'social',
        duration: 60,
        impact: 7
      }
    ],
    sleep: {
      hours: 7.5,
      quality: 8,
      notes: 'Slept well, woke up refreshed'
    },
    stressLevel: 4,
    triggers: ['Work deadlines'],
    copingStrategies: ['Time management', 'Taking breaks'],
    notes: 'Overall a very good day'
  },
  {
    mood: {
      rating: 6,
      emotions: ['anxious', 'tired'],
      description: 'Feeling a bit overwhelmed with work'
    },
    activities: [
      {
        type: 'meditation',
        duration: 20,
        impact: 7
      },
      {
        type: 'exercise',
        duration: 45,
        impact: 8
      }
    ],
    sleep: {
      hours: 6,
      quality: 6,
      notes: 'Had trouble falling asleep'
    },
    stressLevel: 7,
    triggers: ['Work pressure', 'Project deadlines'],
    copingStrategies: ['Deep breathing', 'Prioritizing tasks'],
    notes: 'Need to work on better sleep habits'
  },
  {
    mood: {
      rating: 9,
      emotions: ['happy', 'calm', 'energetic'],
      description: 'Great day! Completed project and had time for self-care'
    },
    activities: [
      {
        type: 'meditation',
        duration: 20,
        impact: 9
      },
      {
        type: 'exercise',
        duration: 60,
        impact: 9
      },
      {
        type: 'hobby',
        duration: 120,
        impact: 8
      }
    ],
    sleep: {
      hours: 8,
      quality: 9,
      notes: 'Perfect sleep, woke up naturally'
    },
    stressLevel: 2,
    triggers: [],
    copingStrategies: ['Regular breaks', 'Positive self-talk'],
    notes: 'One of the best days in recent memory'
  }
];

const sampleJournals = [
  {
    title: 'Project Completion',
    content: 'Today I finally completed the major project I was working on. It was challenging but rewarding. I learned a lot about time management and stress handling. The meditation sessions really helped me stay focused.',
    mood: 'happy',
    tags: ['achievement', 'reflection', 'goal'],
    isPrivate: true,
    insights: ['Regular breaks improve productivity', 'Meditation helps with focus'],
    gratitude: ['Supportive team', 'Good health', 'Learning opportunities'],
    challenges: ['Managing time effectively', 'Staying focused under pressure']
  },
  {
    title: 'Self-Care Day',
    content: 'Took a day off to focus on self-care. Started with morning meditation, followed by a good workout. Spent time with friends in the evening. Realized how important it is to take breaks and recharge.',
    mood: 'calm',
    tags: ['self_care', 'reflection'],
    isPrivate: true,
    insights: ['Regular self-care is essential', 'Social connections are important'],
    gratitude: ['Supportive friends', 'Good weather', 'Free time'],
    challenges: ['Balancing work and personal life']
  },
  {
    title: 'Stress Management',
    content: 'Felt overwhelmed with work today. Took several short breaks to practice deep breathing. Realized that my stress often comes from trying to be perfect. Need to work on accepting that good enough is sometimes okay.',
    mood: 'anxious',
    tags: ['challenge', 'reflection'],
    isPrivate: true,
    insights: ['Perfectionism causes stress', 'Breaks are necessary'],
    gratitude: ['Understanding colleagues', 'Support system'],
    challenges: ['Managing perfectionist tendencies', 'Work-life balance']
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB test database');

    // Clear existing data
    await User.deleteMany({});
    await UserProfile.deleteMany({});
    await MoodTracker.deleteMany({});
    await Journal.deleteMany({});
    console.log('Cleared existing data');

    // Create user
    const createdUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return User.create({
          ...user,
          password: hashedPassword
        });
      })
    );
    console.log('Created user');

    // Create user profile
    const createdProfiles = await Promise.all(
      sampleUserProfiles.map((profile, index) => {
        return UserProfile.create({
          ...profile,
          userId: createdUsers[index]._id
        });
      })
    );
    console.log('Created user profile');

    // Create mood trackers
    const createdMoodTrackers = await Promise.all(
      sampleMoodTrackers.map((tracker) => {
        return MoodTracker.create({
          ...tracker,
          userId: createdUsers[0]._id
        });
      })
    );
    console.log('Created mood trackers');

    // Create journals
    const createdJournals = await Promise.all(
      sampleJournals.map((journal) => {
        return Journal.create({
          ...journal,
          userId: createdUsers[0]._id
        });
      })
    );
    console.log('Created journals');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 