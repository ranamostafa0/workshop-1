import { Router } from "express";
import { addCourse, enrollInCourse, getAllCourses, getCourseStudents, getCourseWithStudents, getStudentCourses, getStudentWithCourses, unenrollStudent } from "./course.service.js";
const router = Router()

router.post("/", async (req, res, next) => {
    const result = await addCourse(req.body)
    return res.status(201).json({ message: "course added successfully", result })
})

router.get("/all", async (req, res, next) => {
    const courses = await getAllCourses()
    return res.status(201).json({ courses })
})


// magic methods [enroll - studentCourses - courseStudents - unenroll]
router.post("/enroll", async (req, res, next) => {
    const result = await enrollInCourse(req.body)
    return res.status(201).json({ result })
})

router.get("/:id/getStudentCourses", async (req, res, next) => {
    const result = await getStudentCourses(req.params.id)
    return res.status(201).json({ result })
})

router.get("/:id/getCourseStudents", async (req, res, next) => {
    const result = await getCourseStudents(req.params.id)
    return res.status(201).json({ result })
})

router.delete("/unenroll", async (req, res, next) => {
    const result = await unenrollStudent(req.body)
    return res.status(201).json({ message: "student unenrolled successfully", result })
})


// join two tables
router.get("/getStudentWithCourses/:id", async (req, res, next) => {
    const result = await getStudentWithCourses(req.params.id)
    return res.status(201).json({ result })
})

router.get("/getCourseWithStudents/:id", async (req, res, next) => {
    const result = await getCourseWithStudents(req.params.id)
    return res.status(201).json({ result })
})

export default router
