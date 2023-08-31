import express from "express"
import { login, register as signup } from "../controllers/authentication.js"

const router = express.Router()
router.post("/signup", signup)
router.post("/login", login)

//! router.get

export default router
