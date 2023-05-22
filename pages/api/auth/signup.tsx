import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest,res: NextApiResponse){
    if(req.method === 'POST'){
        const data = req.body;

        const { email,name,password } = data

        if(!email || !email.includes("@") || !name || name.trim() === '' || !password){
            res.status(422).json({message:"Invalid input"})
            return;
        }
        if(password.trim().length < 6){
            res.status(422).json({message:"password should be at least 6 characters long!"})
            return;
        }

        const client = await connectToDatabase()

        const db = client.db();
        const existingUser = await db.collection('users').findOne({email: email})

        if(existingUser){
            res.status(422).json({message: 'User already exists!'})
            client.close()
            return
        }

        const hashedPassword = await hashPassword(password)



        const result = await db.collection("users").insertOne({
            name: name,
            email: email,
            password: hashedPassword,
            watchlist: [],
        });

        res.status(201).json({message: 'Created user!'});
        client.close()
    }
}

export default handler;