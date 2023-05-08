import { connectToDatabase } from '@/lib/db';

export default async (req, res) => {
  const { email } = req.body;

  if (req.method === 'POST') {


  const client = await connectToDatabase();
  const db = client.db();

  try {

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      console.log('User not found!');
      client.close();
      return res.status(404).json({ message: 'User not found' });
    }

    const { watchlist } = user;


    res.status(200).json({ watchlist });
  } catch (error) {
    console.log(error);
    client.close();
    res.status(500).json({ message: 'Failed to fetch movie list' });
  }finally {
    client.close();
  }
}
};