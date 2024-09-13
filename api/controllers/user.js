import db from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const getUser = (req, res) => {
    const userId = req.params.userId;
    
    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [userId], (err, data) => {
        if(err) return res.status(500).json(err);
        const {password, ...other} = data[0];
        return res.status(200).json(other);
    })
}

const updateUser = (req, res) => {
    console.log(req.body)
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Invalid token!");

        const q = "UPDATE users SET `username` = ?, `name` = ?, `coverPic` = ?, `profilePic` = ?, `city` = ?, `website` = ? WHERE id = ?";
        const values = [
            req.body.username,
            req.body.name,
            req.body.coverPic,
            req.body.profilePic,
            req.body.city,
            req.body.website,
            userInfo.id
        ]

        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json("User has been updated.");
            return res.status(403).json("You can't update this user!");
        })
    })  
}


export { getUser, updateUser }