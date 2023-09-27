import express from "express"
import {addFriend, getProfile, getUsers/*,getUserReviews,getUserMatches*/} from "../controllers/userController.js"

const router=express.Router();

router.get("/search-player",getUsers);
router.get("/profile",getProfile)
router.post("/addFriend",addFriend)

export default router
