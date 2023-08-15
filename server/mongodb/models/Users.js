import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  /* I will have to add constraints for _id when adding new users to make them unique*/
  username: {
    type: String,
    unique: true,
  },
  password: String,
  reviews: [{ body: String, date: Date }],
  record: {
    Wins: Number,
    Losses: Number,
  },
  matchHistory: String,
  availability: Boolean,
})

const User = mongoose.model("User", userSchema)

export default User
