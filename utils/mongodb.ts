import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI);
    cachedClient = client.connection;
    return cachedClient;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Failed to connect to the database');
  }
}

export default connectToDatabase;


