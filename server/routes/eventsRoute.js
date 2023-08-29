import express from "express";
import {createEvent,joinEvent} from "../controllers/eventsController.js"
const router=express.Router();



  router.post("/create-event", createEvent);
  router.post("/join-event",joinEvent);

  export default router;
  