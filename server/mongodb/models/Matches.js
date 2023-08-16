import mongoose from "mongoose"

const matchSchema=mongoose.Schema({
    matchID:{type:String,
        unique:true},
    hostUsername:String,
    playersList:[],
    status:Boolean,
    location:{
        x:Number,
        y:Number
    },
    date:Date,
    time:String
});

const Match=mongoose.model('Match',matchSchema,'matches');

export default Match;