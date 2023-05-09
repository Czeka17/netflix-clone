import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb+srv://jczekanski123:ib3wU8vpPF1L3HIF@netflix-clone.8urpkwa.mongodb.net/auth?retryWrites=true&w=majority')

    return client;
}