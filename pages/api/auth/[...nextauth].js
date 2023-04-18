import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDatabase()

                const usersCollection = client.db().collection('users');

                const user = await usersCollection.findOne({email: credentials.email})

                if(!user){
                    throw new Error('no user found!')
                }

                const isValid = await verifyPassword(credentials.password, user.password)

                if(!isValid) {
                    client.close();
                    throw new Error('Wrong password!')
                }
                client.close();
                return{
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            }
        })
    ]
})