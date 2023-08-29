import jwt from "jsonwebtoken"
import Player from "../mongodb/models/Player.js"
//Authentication : when you register and login , Authorization : make sure someone is logged in to perform certain action

//Registering and logging in with jwt

//registering doesn't need jwt , so it will be added in login
export const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const newPlayer = new Player({
      username,
      password,
      reviews: {},
      record: {
        Wins: 0,
        Losses: 0,
      },
      matchJoined: "",
      availability: true,
    })
    const savedPlayer = await newPlayer.save()
    res.status(201).json(savedPlayer)
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Username is already taken." })
    } else {
      res.status(500).json({ error: err.message })
    }
  }
}

//logging and assigning the jwt token

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const player = await Player.findOne({ username: username })
    if (!player) return res.status(400).json({ msg: "username doesn't exist !" })
    if (!player.password === password) return res.status(400).json({ msg: "Password incorrect" })
    const token = jwt.sign({ id: username.username }, process.env.JWT_SECRET)
    res.status(200).json({ token, player })
  } catch (err) {
    res.status(501).json({ error: err.message })
  }
}
