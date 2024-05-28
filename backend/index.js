import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import carRouter from "./routes/car.js"
import messageRouter from "./routes/message.js"

import "./db.js";


const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser())
app.use(express.static("public")) // img map etmek icin kullanildi.



app.get("/", async (req, res) => {
    return res.json({msg: "VinVin Ready"})
});


app.use("/auth", authRouter)
app.use("/car", carRouter);
app.use("/messages", messageRouter);


app.listen(process.env.PORT, () => {
    console.log("VinVin Ready");
})