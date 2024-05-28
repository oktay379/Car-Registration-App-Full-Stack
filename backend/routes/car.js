import express from "express";
import { createCar, getCars, singleCar, updateCar, deleteCar, warnUser, getNoti, commentOnCar, getComments } from "../controllers/car.js";
import { verifyUser } from "../controllers/auth.js";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({
    storage: storage
});


router.post("/create", verifyUser, upload.single('file'), createCar);
router.get("/getCars", getCars);
router.get("/getCar/:id", singleCar);
router.put("/updateCar/:id", upload.single('file'), updateCar);
router.delete("/deleteCar/:id", deleteCar);
router.post("/warnUser/:id", verifyUser, warnUser);
router.get("/getNoti/:id", upload.single('file'), getNoti);
router.post("/comment/:id", verifyUser, commentOnCar);
router.get("/getComments/:id", upload.single('file'), getComments);


export default router