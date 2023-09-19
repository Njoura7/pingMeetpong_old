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
}
}

export const getProfile=async(req,res)=>{
    try{
const username=req.query.id;
const user=await Player.findOne({username:username})
const profileData={
    reviews:user.reviews,
    availability:user.availability,
    record:user.record
}
res.json(profileData);

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

