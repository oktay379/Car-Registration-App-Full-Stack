import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    email: {
        type: String
    },
    plate: {
        type: String,
        required: true
    },
    parkNoti: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true 
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
				ref: "users",
				required: true
            }
        }
    ]
},{timestamps: true});

export const CarModel = mongoose.model("cars", CarSchema);
