const { connectToDatabase } = require("@/lib/db");

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { email, movie } = data;

    const client = await connectToDatabase();

    const db = client.db();

    const user = await db.collection('users').findOne({ email: email });

    if (!user) {
      console.log('User not found');
      client.close();
      return res.status(404).json({ message: 'User not found' });
    }

    
    const newWatchlist = user.watchlist.filter((m) => m.title !== movie.title);

    await db.collection('users').updateOne(
      { email: email },
      { $set: { watchlist: newWatchlist } }
    );

    console.log('Movie removed from watchlist');
    client.close();
    return res.status(200).json({ message: 'Movie removed from watchlist' });
  }
}

export default handler;