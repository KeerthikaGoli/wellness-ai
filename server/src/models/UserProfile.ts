import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  age: number;
  gender: string;
  occupation: string;
  mentalHealthHistory: {
    conditions: string[];
    medications: string[];
    therapyHistory: string[];
  };
  currentConcerns: string[];
  goals: string[];
  supportSystem: {
    family: boolean;
    friends: boolean;
    professional: boolean;
    other: string;
  };
  selfCarePractices: string[];
  stressLevel: number;
  sleepQuality: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  mentalHealthHistory: {
    conditions: [{
      type: String,
      enum: ['anxiety', 'depression', 'bipolar', 'ptsd', 'ocd', 'adhd', 'other']
    }],
    medications: [String],
    therapyHistory: [String]
  },
  currentConcerns: [{
    type: String,
    enum: ['stress', 'anxiety', 'depression', 'sleep', 'relationships', 'work', 'other']
  }],
  goals: [{
    type: String,
    enum: ['reduce_anxiety', 'improve_mood', 'better_sleep', 'manage_stress', 'build_resilience', 'other']
  }],
  supportSystem: {
    family: Boolean,
    friends: Boolean,
    professional: Boolean,
    other: String
  },
  selfCarePractices: [{
    type: String,
    enum: ['meditation', 'exercise', 'journaling', 'therapy', 'social_connection', 'hobbies', 'other']
  }],
  stressLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  sleepQuality: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema); 