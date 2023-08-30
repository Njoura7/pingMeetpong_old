import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from "./db/connect.js"
import Player from "./db/models/Player.js"
import Match from "./db/models/Match.js"
import mongoose, { Schema } from "mongoose"
import authRoutes from "./routes/authRoute.js"
import eventsRoutes from "./routes/eventsRoute.js"
//import usersRoutes from "./routes/userRoute.js"

dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

//---------------------------------------------------------------------------------------    SIGNUP & LOGIN       -----------------------------------------------------------------------------------

app.use("/auth", authRoutes)
//---------------------------------------------------------------------------------------    CREATE&JOIN MATCH    --------------------------------------------------------------------------------
app.use("/api/events", eventsRoutes)

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body
//   Player.findOne({ username: username }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         // Set a dummy authentication token
//         const authToken = "dummy_auth_token"

//         // Set the authorization header and send the token in the response
//         res.setHeader("authorization", authToken)
//         res.json("success")
//       } else res.json("password incorrect")
//     } else {
//       res.json("username doesn't exist")
//     }
//   })
// })

//? First approach
// app.post("/api/signup", (req, res) => {
//   Player.create(req.body)
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err))
// })

//? second approach -->most probably wrong coz it doesn't link to mongoDB
// app.post("/api/signup", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/signup",
//       JSON.stringify(req.body),
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     res.json(response.data)
//   } catch (error) {
//     res.json(error)
//   }
// })

//? third approach

// app.post("/api/signup", async (req, res) => {
//   console.log(req.body) // Log the request body to check if data is received correctly
//   try {
//     const newUser = await User.create(req.body) // Create a new user in the database
//     res.json(newUser) // Send the newly created user as the response
//   } catch (error) {
//     res.json(error)
//   }
// })

const startServer = async () => {
  try {
    connectDB(process.env.ATLAS_URI)
    app.listen(port, () => console.log(`server has started on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}
startServer()
