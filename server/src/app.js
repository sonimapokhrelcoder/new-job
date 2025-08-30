// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); 

// ------------------- MongoDB Connection -------------------
mongoose
  .connect("mongodb://localhost:27017/sonima", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------- Schemas -------------------

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  phone: String,
  avatar: String,
});
const User = mongoose.model("User", UserSchema);

// Job Schema
const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  salary: String,
  location: String,
  company: String,
  createdAt: { type: Date, default: Date.now },
});
const Job = mongoose.model("Job", JobSchema);

// ------------------- Multer Config -------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage });

// ------------------- API ROUTES -------------------

// GET profile by username
app.get("/api/profile", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ error: "Username is required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create/register a user
app.post("/api/users", async (req, res) => {
  try {
    const { name, username, phone } = req.body;
    const newUser = new User({ name, username, phone });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Upload avatar for a user
app.post("/api/upload/:username", upload.single("avatar"), async (req, res) => {
  try {
    const { username } = req.params;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const user = await User.findOneAndUpdate(
      { username },
      { avatar: `/uploads/${req.file.filename}` },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "File uploaded successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ------------------- Jobs API -------------------

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs: jobs || [] });
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    res.status(500).json({ success: false, error: "Failed to fetch jobs" });
  }
});

// Create/upload job
app.post("/api/jobs", async (req, res) => {
  try {
    const { title, description, salary, location, company } = req.body;
    if (!title || !description || !salary || !location || !company) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newJob = new Job({ title, description, salary, location, company });
    await newJob.save();

    res.status(201).json({ success: true, message: "Job uploaded successfully", job: newJob });
  } catch (err) {
    console.error("Failed to upload job:", err);
    res.status(500).json({ success: false, error: "Failed to upload job" });
  }
});

// Test route
app.get("/", (req, res) => res.send("Server is running"));

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
