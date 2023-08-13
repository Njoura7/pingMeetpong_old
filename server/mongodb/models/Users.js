import mongoose from "mongoose"

const userSchema=mongoose.Schema({
   /* I will have to add constraints for _id when adding new users to make them unique*/
   _id:String,
   Password:String,
   Reviews:[{body:String,date:Date}],
   Record:{
      Wins:Number,
      Losses:Number
   },
   MatchHistory:String,
   Availabilty:Boolean
})

const user=mongoose.model('User',userSchema);


export default user;