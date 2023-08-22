import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from "./mongodb/connect.js"
import User from "./mongodb/models/Players.js"
import Match from "./mongodb/models/Matches.js"
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Define characters
import mongoose, { Schema } from "mongoose"

dotenv.config()

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

//---------------------------------------------------------------------------------------SIGNUP & LOGIN --------------------------------------------------------------------------------

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

//? First approach
app.post("/api/signup", (req, res) => {
  User.create(req.body)
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



//---------------------------------------------------------------------------------------CREATE MATCH--------------------------------------------------------------------------------


//generate matchID
async function generateMatchID(){
  let generatedID="";
  let exist=true;
  while(exist){
  for ( let i = 0; i < 7; i++ ) 
      generatedID += characters.charAt(Math.floor(Math.random() * 7));
  exist=await mongoose.model("Match").findOne({matchID:generatedID});
}
  return generatedID;
  
}


//old post request 
// app.post("/api/create-event", async (req, res) => {
//   Match.create(req.body)
//     .then((match) => res.json(match))
//     .catch((error) => res.json(error))
// })


/*Post request creating an event(Match)*/
app.post("/api/create-event", async (req, res) => {
  try{
  let newEvent=new Match({
    matchID:await generateMatchID(),
    eventTitle:req.body.eventTitle,
    hostUsername:"logged in player username",
    playersList:[],
    location: {
      x: 46.0000,
      y: 432.000,
    },
    date:req.body.date,
    time:req.body.time
  })
const savedEvent=await newEvent.save();
res.json(savedEvent.matchID);
  }catch(e){
    res.json({error:"Something Went Wrong ! "});
  }
})




//---------------------------------------------------------------------------------------JOIN MATCH--------------------------------------------------------------------------------
//Get Request to join a match
app.post("/api/join",async(req,res)=>{
  const matchID = req.body.matchID;

  try {
    const match = await Match.findOne({ matchID });

    if (!match) {
      return res.status(404).json("Match not found");
    }
    res.json(match.eventTitle);
  } catch (error) {
    console.error(error);
    res.status(404).json("An error occurred");
  }
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
