import express from "express";
import { demoData } from "../demoData";

const router = express.Router();

router.get("/data", (req, res) => {
  try {
    res.status(200).json(demoData);
  } catch (error) {
    console.error("Error fetching demo data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
