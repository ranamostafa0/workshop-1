import userModel from "../../../DB/model/user.model.js"

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const checkUser = await userModel.findOne({ email })
        if (checkUser) {
            return res.status(409).json({ message: "Email already exists" })
        }
        const user = await userModel.insertOne({ name, email, password })
        return res.status(201).json({ message: "signup page", user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email, password })
        if (!user) {
            return res.status(404).json({ message: "In-valid credentials" })
        }
        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}