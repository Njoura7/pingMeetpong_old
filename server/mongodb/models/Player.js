import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required:true
  },
  password: { 
    type: String,
    required:true, 
    minlength:5
   },
  reviews: {
    type:Map,
    of:String
  },
  record: {
    Wins: Number,
    Losses: Number,
  },
  matchJoined:{
    type:String,
    default:""  
  },
  // //match history = array of objects , object {date , mode (1v1,2v2) , result(win or lose), score}         
  // matchHistory: {
  //   type:String,
  //   default
  // }
  availability: {
    type:Boolean,
    default:true
  }
})

const Player = mongoose.model("Player", userSchema, "players")

export default Player
