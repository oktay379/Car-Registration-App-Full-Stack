import { CarModel } from "../models/CarModel.js";

const createCar = async (req, res) => {
    try {
        const {title, desc, file, email, plate} = req.body;

        if(!plate) {
            return res.status(400).json({error: 'Plaka Girisi Yapiniz'});
        }

        if (!validatePlate(plate)) {
            return res.status(400).json({ error: 'Plaka formatı geçersiz' });
        }

        const newCar = new CarModel({
            title: title,
            desc: desc,
            file: req.file.filename,
            email: email,
            plate: plate
        })
        await newCar.save();
        return res.status(201).json({added: true ,newCar});
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getCars = async (req, res) => {
    try {
        const cars = await CarModel.find();
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const singleCar = async (req, res) => {
    try {
        const id = req.params.id
        const car = await CarModel.findById({ _id: id });
        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updateCar = async (req, res) => {
    try {
        const id = req.params.id
        const { title, desc, plate } = req.body;
        const file = req.file.filename; // Dosya update yapmak için bu şekilde kullanılır.

        if (!validatePlate(plate)) {
            return res.status(400).json({ error: 'Plaka formatı geçersiz' });
        }
        
        const car = await CarModel.findByIdAndUpdate(id, { title, desc, file, plate }, { new: true });

        return res.status(200).json({ update: true, car });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
};

const deleteCar = async (req, res) => {
    try {
        const id = req.params.id
        const car = await CarModel.findByIdAndDelete({ _id: id })
        return res.status(200).json({deleted: true, car});  
    }   
    catch (error) {
        return res.status(500).json(error)
    }
}

const validatePlate = (plate) => {
    const plateRegex = /^[0-9]{2}[A-Z]{1,3}[0-9]{1,4}$/;
    return plateRegex.test(plate);
};


// comment
export const commentOnCar = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: carId } = req.params;
        const userId = req.userData.id;

        if(!text) {
            return res.status(400).json({ error: "Yorum Yapiniz." });
        }
        const car = await CarModel.findById(carId);
        
        if(!car) {
            return res.status(404).json({ error: "Arac Bulunamadi." });
        }

        car.comments.push({ user: userId, text })
        await car.save();

        res.status(200).json(car);
    } catch (error) {
        console.log("Error in commentOnPost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
    
}
export const getComments = async (req, res) => {
    try {
        const { id: carId } = req.params;
        
        // Yorumları ve kullanıcı bilgilerini almak için populate kullanımı
        const car = await CarModel.findById(carId).populate({
            path: "comments.user",
            select: "username file"
        });
    
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }
    
        // Yorumları ve kullanıcı bilgilerini formatlama
        const formattedComments = car.comments.map(comment => ({
            text: comment.text,
            user: {
                username: comment.user.username,
                profileImage: comment.user.file
            }
        }));
    
        res.status(200).json(formattedComments);
        
    } catch (error) {
        console.error("Error fetching comments: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// notifications
export const warnUser = async (req, res) => {
    try {
        const userId = req.userData.id;
		const { id: carId } = req.params;

        const car = await CarModel.findById(carId);

        if(!car) {
			return res.status(404).json({ error: "Car not found" });
        }

        const userPark = car.parkNoti.includes(userId); // true veya false donecektir

        if(userPark) {  // true dondu // userId degeri varsa
            car.parkNoti.pull(userId);
			await car.save();
        }
        else {  // false donerse // userId degeri yoksa
            car.parkNoti.push(userId); // userId degeri push ekleme islemi yapilir
			await car.save();
        }

		const parkNotiUsers = car.parkNoti;
		res.status(200).json(parkNotiUsers);
    } catch (error) {
        console.log("Error in parkCar controller: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
}
export const getNoti = async (req, res) => {
    const { id: carId } = req.params;
    const car = await CarModel.findById(carId).populate({
        path: "parkNoti",
        select: "username file"
    });

    if (!car) {
        return res.status(404).json({ error: "Car not found" });
    }

    const formattedUsers = car.parkNoti.map(user => ({
        username: user.username,
        profileImage: user.file
    }));

    res.status(200).json(formattedUsers);
}


export { createCar, getCars, singleCar, updateCar, deleteCar };