import mongoose, { Schema } from "mongoose"

const matchSchema = mongoose.Schema({
  matchID: { 
    type: String, 
    unique: true },
  //this will be fetched from the logged in user already not from database
  hostUsername:{
    type:String,
    lowercase:true},
  eventTitle: String,
  playersList: [],
  status: Boolean,
  location: {
    x: Number,
    y: Number,
  },
  date: Date,
  // considering using "timestamp" --not sure though
  time: String,
})
// matchSchema.pre("save",async function(next){
//     try {
//         this.matchID = await generateMatchID();
//         next();
//       } catch (error) {
//         next(error);
//       }
// })



const Match = mongoose.model("Match", matchSchema, "matches")


export default Match
