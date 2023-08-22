import mongoose from "mongoose"

const connectDB=async (url)=>{
    mongoose.set('strictQuery',true);
    await mongoose.connect(url,{
        useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(()=>console.log("db connected")).catch((e)=>console.log("db connection failed"));
}
export default connectDB;

