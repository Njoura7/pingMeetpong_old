import Match from "../db/models/Match.js"
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" // Define characters
import mongoose from "mongoose"

//generate matchID
async function generateMatchID() {
  let generatedID = ""
  let exist = true
  while (exist) {
    for (let i = 0; i < 7; i++) generatedID += characters.charAt(Math.floor(Math.random() * 7))
    exist = await mongoose.model("Match").findOne({ matchID: generatedID })
  }
  return generatedID
}

export const createEvent = async (req, res) => {
  try {
    let newEvent = new Match({
      matchID: await generateMatchID(),
      eventTitle: req.body.eventTitle,
      hostUsername: req.body.hostUsername,
      playersList: [],
      location: req.body.location,
      playersNumber:req.body.playersNumber,
      date: req.body.date,
      time: req.body.time,
    })
    const savedEvent = await newEvent.save()
    res.status(201).json(savedEvent)
  } catch (e) {
    res.status(403).json({ error: e.message })
  }
}

export const joinEvent = async (req, res) => {
  const matchID = req.body.matchID
  const username=req.body.username
  try {
    const match = await Match.findOne({ matchID })

    if (!match) {
      return res.status(404).json("Match Not Found !")
    }
    if (match.playersList.length==match.playersNumber)
    return res.status(200).json("Match is already full ! ")
    match.playersList.push(username)
    await match.save()
    res.status(200).json("Match Joined !")
  } catch (error) {
    console.error(error)
    res.status(403).json("An error occurred")
  }
}

export const deleteEvent=async(req,res)=>{
  const matchID = req.query.matchID;
  try {

    const match = await Match.findOne({matchID});
    
    if (!match) {
      return res.status(404).json({ error: "MatchID Not Found" });
    }

    const deleted = await Match.deleteOne({matchID:matchID});

    if (deleted.deletedCount === 1) {
      return res.status(200).json({ message: "Match Deleted!" });
    } else {
      return res.status(404).json({ error: "MatchID Not Found" });
    }
  } catch (error) {
    console.error(error);
        res.status(500).json({error});
  }
}

export const getEvents=async(req,res)=>{

const username=req.query.user;
try{
  const match = await Match.find({hostUsername:username});
  if (!match){
    return res.json("")
  }
  res.status(201).json(match);
}catch(error){
  res.status(401).json({error:"Internal Server Error!"});
}


}

