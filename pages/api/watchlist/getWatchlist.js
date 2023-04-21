import { connectToDatabase } from '@/lib/db';

export default async (req, res) => {
  // Extract email from request body
  const { email } = req.body;

  // Connect to MongoDB
  const client = await connectToDatabase();
  const db = client.db();

  try {
    // Find user by email in the database
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      console.log('User not found!');
      client.close();
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract movie list from user object
    const { watchlist } = user;

    // Send movie list as response
    res.status(200).json({ watchlist });
  } catch (error) {
    console.log(error);
    client.close();
    res.status(500).json({ message: 'Failed to fetch movie list' });
  }
};