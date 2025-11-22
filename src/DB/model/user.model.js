import { db } from "../connection.js";

const userModel = await db.createCollection("users")

export default userModel
