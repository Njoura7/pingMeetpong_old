import express from "express";
import {createEvent,joinEvent,deleteEvent,getEvents} from "../controllers/eventsController.js"
const router=express.Router();



  router.post("/create-event", createEvent);
  router.post("/join-event",joinEvent);
  router.delete("/create-event",deleteEvent);
  router.get("/create-event",getEvents);

  export default router;
  