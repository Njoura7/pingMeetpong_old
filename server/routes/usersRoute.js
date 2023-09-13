import express from "express"
import {getProfile, getUsers/*,getUserReviews,getUserMatches*/} from "../controllers/userController.js"

const router=express.Router();

router.get("/search-player",getUsers);
router.get("/profile",getProfile)

export default router
