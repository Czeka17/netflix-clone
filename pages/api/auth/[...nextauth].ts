import { ObjectId } from "mongodb";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
          credentials: {
            email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
          },
            async authorize(credentials) {

                const client = await connectToDatabase()

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({email: credentials!.email})

                if(!user){
                    throw new Error('no user found!')
                }

                const isValid = await verifyPassword(credentials!.password, user.password)

                if(!isValid) {
                    client.close();
                    throw new Error('Wrong password!')
                }
                client.close();

                const userid = new ObjectId(user._id)
                return{
                    id: userid.toString(),
                    name: user.name,
                    email: user.email,
                }
            }
        })
    ],
    secret: `${process.env.NEXTAUTH_SECRET}`
})
