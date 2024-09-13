import db from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

    const values = parseInt([req.query.followedUserId]);

    db.query(q, [values], (err, data) => {
        if(err) return res.status(500).json(err);
        
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    })
    
    
}

const addRelationship = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json("Invalid token!");

        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.userId        
        ]

        db.query(q, [values], (err, data) =>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Following.");
        })
    })   
}

const removeRelationship = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json("Invalid token!");

        const q = "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?";
        db.query(q, [userInfo.id, req.query.followedUserId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Unfollowed.");
        })
    })
    
}




export { getRelationships, addRelationship, removeRelationship }