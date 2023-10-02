import mongoose from "mongoose";
import Player from "../db/models/Player.js";

export const getUsers=async(req,res)=>{
try{
    const searchQuery=req.query.q;
    const users=await Player.find({username:{ $regex: new RegExp(searchQuery, "i")}});
    res.json(users)
}catch(err){
    console.log(err);
   res.status(500).json({message:"Internal Server Error"}); 
};
}

export const getProfile=async(req,res)=>{
    try{
const username=req.query.id;
const user=await Player.findOne({username:username})
const profileData={
    reviews:user.reviews,
    availability:user.availability,
    record:user.record,
    friendsList:user.friendsList
}
res.json(profileData);

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const addFriend=async(req,res)=>{
    try{
const {loggedinUsername,friendToAdd}=req.body;
const user=await Player.findOne({username:loggedinUsername});
const friend=await Player.findOne({username:friendToAdd});
if (user===friend){
    res.status(201).json("You can't add yourself ?");
}
if (user.friendsList.includes(friend.username)) {
    return res.status(400).json({ message: "Friend already added" });
  }
user.friendsList.push(friend.username)
friend.friendsList.push(user.username)

await user.save();
await friend.save();
res.status(201).json("Friend Added");
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}
