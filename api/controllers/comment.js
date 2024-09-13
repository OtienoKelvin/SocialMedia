import db from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import moment from "moment/moment.js"



const getComments = async (req, res) => {
    const q = "SELECT c.*, u.username, u.profilePic FROM comments c JOIN users u ON c.userId = u.id WHERE c.postId = ? ORDER BY c.createdAt DESC"

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}


const addComment = async (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json("Invalid token!");

        const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created.");
        })
    })    
}


export { getComments , addComment }