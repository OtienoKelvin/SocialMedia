import db from "../config/db.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Registration 
const register = ( req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    const { username, email, password, name } = req.body;

    db.query(q, [email, username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists!");

        //Hash password
        const salt = bycrypt.genSaltSync(10);
        const hashedPassword = bycrypt.hashSync(password, salt);

        //Insert new user
        const q = "INSERT INTO users(`username`, `email`, `password`, `name`) VALUES (?)";

        const values = [username, email, hashedPassword, name];

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        })
    })

    
}

//Login
const login = ( req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    const { username, password } = req.body;
    
    db.query(q, [username], (err, data) => {
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        const user = data[0];

        //Check password
        const isPasswordCorrect = bycrypt.compareSync(req.body.password, user.password);

        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

        const { password, ...others } = user;

          // Set cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            sameSite: 'Strict', // Prevent CSRF
            maxAge: 3600000 * 24, //  1 day
            path: '/',
        };
        //send response with cookie
        res.cookie ("access_token", token, cookieOptions )
        .status(200)
        .json(others)
    })
}


const logout = ( req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Logged out successfully!");    
}



export  { register, login, logout }