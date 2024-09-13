import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from  "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import relationshipRoutes from "./routes/relationships.js";
import multer from "multer";

dotenv.config();
const app = express();


//Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const upload = multer({ storage: storage });



db.connect((err) => {
  if (err) {
    console.log("Error connecting to database", err.stack);
    return;
  } else {
    console.log("Database connected");
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/relationships", relationshipRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});