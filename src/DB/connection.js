import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017")
export const db = client.db("workshop8")

export const connectDB = async () => {
    try {
        await client.connect()
        console.log("Database connected successfully")
    } catch (error) {
        console.log("database connection failed", error)
    }
}