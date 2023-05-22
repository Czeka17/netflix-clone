import { connectToDatabase } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Movieobj } from "../../../lib/types";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;

    const { movie, email } = data;

    const client = await connectToDatabase();

    const db = client.db();

    const user = await db.collection('users').findOne({ email: email });

    if (!user) {
      console.log('User not found');
      client.close();
      return res.status(404).json({ message: 'User not found' });
    }

    const matchingMovie = user.watchlist.find((dbMovie:Movieobj) => dbMovie.title === movie.title);
    if(matchingMovie){
      console.log('Movie already in list!')
      client.close();
      return res.status(404).json({ message: 'Movie already in list' });
    }
    await db.collection('users').updateOne(
      { email: email },
      { $addToSet: { watchlist: movie } }
    );

    console.log('Movie added to watchlist');
    client.close();
    return res.status(200).json({ message: 'Movie added to watchlist'});
  }
}

export default handler;