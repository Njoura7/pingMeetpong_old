import express from "express";
import {createEvent,joinEvent,deleteEvent,getEvents, getAllEvents} from "../controllers/eventsController.js"
const router=express.Router();



  router.post("/create-event", createEvent);
  router.post("/join-event",joinEvent);
  router.delete("/create-event",deleteEvent);
  router.get("/create-event",getEvents);
  router.get("/join-event",getAllEvents);

  export default router;
  