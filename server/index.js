import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from "./mongodb/connect.js"
import User from "./mongodb/models/Players.js"
import Match from "./mongodb/models/Matches.js"

dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

//!change the endpoint into /api/login

app.post("/api/login", (req, res) => {
  const { username, password } = req.body
  User.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Set a dummy authentication token
        const authToken = "dummy_auth_token"

        // Set the authorization header and send the token in the response
        res.setHeader("authorization", authToken)
        res.json("success")
      } else res.json("password incorrect")
    } else {
      res.json("username doesn't exist")
    }
  })
})
//!change the endpoint into /api/signup

//? First approach
app.post("/api/signup", (req, res) => {
  User.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})
//todo discuss about the get request with khabiro
app.get("/api/signup", (req, res) => {
  User.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

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
/*Post request creating an event(Match)*/
app.post("/api/create-event", async (req, res) => {
  Match.create(req.body)
    .then((match) => res.json(match))
    .catch((error) => res.json(error))
})

const startServer = async () => {
  try {
    connectDB(process.env.ATLAS_URI)
    app.listen(port, () => console.log(`server has started on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}
startServer()
