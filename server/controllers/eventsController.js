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
      hostUsername: "logged in player username",
      playersList: [],
      location: {
        x: 46.0,
        y: 432.0,
      },
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
  try {
    const match = await Match.findOne({ matchID })

    if (!match) {
      return res.status(404).json("Match not found")
    }
    res.json(match.eventTitle)
  } catch (error) {
    console.error(error)
    res.status(404).json("An error occurred")
  }
}
