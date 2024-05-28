import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
    try {
        mongoose.connect(process.env.mongoDB)
        console.log("mongo connect")
    } catch (err) {
        console.log(err)
    }
}

Connection();