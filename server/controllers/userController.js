import mongoose from "mongoose";
import Player from "../db/models/Player.js";

export const getUsers=async(req,res)=>{
try{
    const searchQuery=req.query.q;
    const users=await Player.find({username:{ $regex: new RegExp(searchQuery, "i")}});
    res.json(users)
}catch(err){
    console.log(err);
    res.stautus(500).json({message:"Internal Server Error"});
}
}

export const getProfile=async(req,res)=>{
    try{
const username=req.body.username;
const user=await Player.findOne({username:username})
res.json(user);
    }catch(error){
        console.log(err);
        res.stautus(500).json({message:"Internal Server Error"})
    }
}

