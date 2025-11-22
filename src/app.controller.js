import { connectDB } from "./DB/connection.js";
import authController from "./modules/auth/auth.controller.js"


const bootstrap = (app,express) => {
    app.use(express.json());

    app.get("/", (req, res) => res.send("welcome"));
    app.use("/auth", authController)


    app.use((req, res) => {
        res.status(404).json({ message: "Invalid routing" })
    })


    connectDB()
}



export default bootstrap