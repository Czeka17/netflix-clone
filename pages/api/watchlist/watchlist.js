const { connectToDatabase } = require("@/lib/db");

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { movie, email } = data;

    const client = await connectToDatabase();

    const db = client.db();

    const user = await db.collection('users').findOne({ email: email });

    if (!user) {
      // Handle case where user is not found
      console.log('User not found');
      client.close();
      return res.status(404).json({ message: 'User not found' });
    }

    await db.collection('users').updateOne(
      { email: email },
      { $addToSet: { watchlist: movie } }
    );

    console.log('Movie added to watchlist');
    client.close();
    return res.status(200).json({ message: 'Movie added to watchlist' });
  }
}

export default handler;