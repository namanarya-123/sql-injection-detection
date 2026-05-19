import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('Missing MONGO_URI in environment variables');
  }
  await mongoose.connect(uri, { dbName: 'ai_sql_security_dashboard' });
  console.log('Connected to MongoDB Atlas');
}
