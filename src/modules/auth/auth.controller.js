import { Router } from "express";
const router = Router()
import * as authServices from "./service/auth.service.js"

router.post("/signup", authServices.signup)
router.post("/login", authServices.login)



export default router