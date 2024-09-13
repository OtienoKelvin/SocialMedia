import db from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment/moment.js";
dotenv.config();

const getPosts = (req, res) => {
    console.log(req.query)
    const userId = req.query.userId;
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json("Invalid token!");
    

        const q = userId ? "SELECT P.*, u.id userId, u.username, u.profilePic FROM posts p JOIN users u ON p.userId = u.id WHERE p.userId = ? ORDER BY p.createdAt DESC" : 
        "SELECT P.*, u.id userId, u.username, u.profilePic FROM posts p JOIN users u ON p.userId = u.id LEFT JOIN relationships r ON p.userId = r.followedUserId WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";
        

        db.query(q, [userId ? userId : userInfo.id, userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    }) 
    console.log(userId)   
}


const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json("Invalid token!");
    

        const q = "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been created.");
        })
    })    
}


export { getPosts, addPost }