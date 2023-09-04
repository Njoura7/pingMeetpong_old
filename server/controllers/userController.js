import mongoose from "mongoose";
import Player from "../db/models/Player.js";

export const getUser=async(req,res)=>{
try{
    console.log(req.query.q)
    const searchQuery=req.query.q;
    const users=await Player.find({username:{ $regex: new RegExp(searchQuery, "i")}});
    res.json(users)
}catch(err){
    console.log(err);
    res.stautus(500).json({message:"Internal Server Error"});
}
}