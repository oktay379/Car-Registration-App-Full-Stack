import express from "express"
import { register, getUsers, getSingleUser, login, deleteUser, verifyUser, verify, logout, dashboard, updateUser, getUsersForSidebar } from "../controllers/auth.js";
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


router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/getSingle/:id", getSingleUser);
router.delete("/delete/:id", deleteUser);
router.put("/updateUser/:id", upload.single('file'), updateUser);
router.get("/verify", verifyUser, verify);
router.get("/sidebar", verifyUser, getUsersForSidebar);
router.get("/logout", logout);
router.get("/dashboard", dashboard);

export default router