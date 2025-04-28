import mongoose, { Document, Schema } from 'mongoose';

export interface IJournal extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  isPrivate: boolean;
  insights: string[];
  gratitude: string[];
  challenges: string[];
  createdAt: Date;
  updatedAt: Date;
}

const JournalSchema: Schema = new Schema({
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
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'angry', 'calm', 'energetic', 'tired', 'focused', 'overwhelmed', 'other'],
    required: true
  },
  tags: [{
    type: String,
    enum: ['reflection', 'gratitude', 'challenge', 'achievement', 'goal', 'therapy', 'self_care', 'other']
  }],
  isPrivate: {
    type: Boolean,
    default: true
  },
  insights: [String],
  gratitude: [String],
  challenges: [String]
}, {
  timestamps: true
});

export default mongoose.model<IJournal>('Journal', JournalSchema); 