import express from "express"
import {getUser/*,getUserReviews,getUserMatches*/} from "../controllers/userController.js"

const router=express.Router();

router.get("/search-player",getUser);

export default router
