;import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
dotenv.config();

const port =process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());


const startServer=async()=>{
    try{
        connectDB(process.env.ATLAS_URI);
        app.listen(port,()=>console.log(`server has started on port ${port}}`));
    }catch(e){
        console.log(e);
    }
}
startServer();