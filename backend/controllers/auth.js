import { UserModel } from "../models/UserModel.js";
import { CarModel } from "../models/CarModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({message: "No Token"});
    }
    else {
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if(err) {
                return res.json("Wrong Token")
            }
            else {
                req.userData = decoded; 
                next();
            }
        })
    }
}
const verify = async (req, res) => {
    return res.json(req.userData);
}



const register = async (req, res) => {
    try {
        const count = await UserModel.countDocuments();
        const firstAcc = count === 0;

        const { username, password, email } = req.body;
        const user = await UserModel.findOne({ email });
    
        if(user) {
            return res.status(500).json({msg: "Kayitli Email."});
        };
    
        if(password.length < 4) {
            return res.status(500).json({msg: "Sifreniz 5'den büyük degere sahip olmalidir."});
        };
    
        const passwordHash = await bcrypt.hash(password, 10);
    
        if(!isEmail(email)) {
            return res.status(500).json({msg: "Email Tipinde degildir."});
        }

        let newUser;
        if(firstAcc) {
            newUser = await UserModel.create({username, password: passwordHash, email, role: "admin"});
        }
        else {
            newUser = await UserModel.create({username, password: passwordHash, email, role: "user"});
        }

        res.status(201).json({
            status: true,
            newUser
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}



const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json({users});
    } catch (err) {
        return res.status(500).json({msg: "Kullanicilar Getirilemiyor."});
    }
};



const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        return res.status(200).json({status:true ,user});
    } catch (err) {
        return res.status(500).json(err);
    }
};



const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.userData.id;
        const filteredUsers = await UserModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json(error);
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if(!user) {
            return res.status(500).json({msg: "Email Bulunamadi."});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(500).json({msg: "Password Yanlis."});
        }

        const token = jwt.sign({email: user.email, username: user.username, role: user.role, id: user._id}, process.env.KEY, {expiresIn: "1d"});
        res.cookie("token", token, {httpOnly: true, secure: true});

        return res.status(201).json({status: true, msg: "Giris Basarili.", token});
    } catch (err) {
        return res.status(500).json(err);
    }
}

/* 
...req.body tum degerleri al demek. Sen daha once zaten file adında bir şey tanımlamadığın için girişte register gibi file tanım yapmadın
bu yuzden biz update yaparken file adında yeni bir deger yarattık...
*/ 
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate({ _id: id }, { ...req.body, file: req.file.filename }, { new: true });
        return res.status(200).json({update: true, user});
    } catch (error) {
        return res.status(500).json(error);
    }
};



const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);

        if(!user) {
            return res.status(500).json({msg: "Kullanici Bulunamadi"});
        }
        
        return res.status(200).json({ msg: "Kullanici Silindi." });

    } catch (error) {
        return res.status(500).json(err);
    }
}



const logout = async (req, res) => {
   res.clearCookie("token");
   return res.json("Success");
}


const dashboard = async (req, res) => {
    try {
        const car = await CarModel.countDocuments();
        const user = await UserModel.countDocuments();
        return res.json({status: true, car, user})
    } catch (error) {
        return res.status(500).json(error);
    }
}


function isEmail(emailAddress) {
    let regex =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(emailAddress);
}


export { register, getUsers, getSingleUser, login, deleteUser, verifyUser, verify, logout, dashboard, updateUser, getUsersForSidebar };