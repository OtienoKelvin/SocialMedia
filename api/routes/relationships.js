import express from "express";
import { addRelationship, getRelationships, removeRelationship } from "../controllers/relationships.js";



const router = express.Router();

router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", removeRelationship);





export default router