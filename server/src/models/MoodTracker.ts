import mongoose, { Document, Schema } from 'mongoose';

export interface IMoodTracker extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  mood: {
    rating: number;
    emotions: string[];
    description: string;
  };
  activities: {
    type: string;
    duration: number;
    impact: number;
  }[];
  sleep: {
    hours: number;
    quality: number;
    notes: string;
  };
  stressLevel: number;
  triggers: string[];
  copingStrategies: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const MoodTrackerSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    emotions: [{
      type: String,
      enum: ['happy', 'sad', 'anxious', 'angry', 'calm', 'energetic', 'tired', 'focused', 'overwhelmed', 'other']
    }],
    description: String
  },
  activities: [{
    type: {
      type: String,
      enum: ['meditation', 'exercise', 'social', 'work', 'hobby', 'therapy', 'self_care', 'other'],
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    impact: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    }
  }],
  sleep: {
    hours: {
      type: Number,
      required: true
    },
    quality: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    notes: String
  },
  stressLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  triggers: [String],
  copingStrategies: [String],
  notes: String
}, {
  timestamps: true
});

export default mongoose.model<IMoodTracker>('MoodTracker', MoodTrackerSchema); 