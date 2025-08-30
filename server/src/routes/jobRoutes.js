import express from "express";
import Job from "../models/job.js";

const router = express.Router();

// Upload a new job (no file)
router.post("/", async (req, res) => {
  try {
    const { title, description, salary, location, company } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newJob = new Job({ title, description, salary, location, company });
    await newJob.save();

    res.json({ message: "Job uploaded successfully", job: newJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload job" });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

export default router;
