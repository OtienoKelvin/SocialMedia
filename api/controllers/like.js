import db from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const getLikes = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    })
}

const addLike = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json("Invalid token!");

        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.postId        
        ]

        db.query(q, [values], (err, data) =>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked.");
        })
    })   
}

const removeLike = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json("Invalid token!");

        const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";
        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked.");
        })
    })
}




export { getLikes, addLike, removeLike }