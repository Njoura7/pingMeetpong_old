import mongoose from "mongoose"

const userSchema=mongoose.Schema({
   /* I will have to add constraints for _id when adding new users to make them unique*/
   username:String,
   password:String,
   reviews:[{body:String,date:Date}],
   record:{
      Wins:Number,
      Losses:Number
   },
   matchHistory:String,
   availabilty:Boolean
})

const User=mongoose.model('User',userSchema);


export default User;