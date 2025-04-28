import mongoose from 'mongoose';
import User from './models/User';

const MONGODB_URI = 'mongodb+srv://varunketa2004:abcdefg@cluster0.plhjgjd.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

async function verifyData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB test database');

    // Check users
    const users = await User.find({});
    console.log('Users in database:', users);

    // Check specific user
    const john = await User.findOne({ email: 'john@example.com' });
    console.log('John user:', john);

    const sarah = await User.findOne({ email: 'sarah@example.com' });
    console.log('Sarah user:', sarah);

    process.exit(0);
  } catch (error) {
    console.error('Error verifying data:', error);
    process.exit(1);
  }
}

verifyData(); 