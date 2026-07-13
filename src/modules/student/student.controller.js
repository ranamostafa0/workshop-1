import { Router } from "express";
import { deleteStudent, getAllStudents, login, signup, updateStudent } from "./student.service.js";
const router = Router()

router.post("/signup", async (req, res, next) => {
    const result = await signup(req.body)
    return res.status(201).json({ message: "student registered successfully", result })
})

router.post("/login", async (req, res, next) => {
    const result = await login(req.body)
    return res.json({ message: "student logged in successfully", result })
})

router.get("/all", async (req, res, next) => {
    const students = await getAllStudents()
    return res.json({ students })
})

router.patch("/:id", async (req, res, next) => {
    const result = await updateStudent(req.params.id, req.body)
    return res.json({ message: "student updated successfully", result })
})

router.delete("/:id", async (req, res, next) => {
    const result = await deleteStudent(req.params.id)
    return res.json({ message: "student deleted successfully", result })
})

export default router
