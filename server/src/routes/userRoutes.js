import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/user.js";

const router = express.Router();

// Multer config for avatar upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET profile by username
router.get("/profile", async (req, res) => {
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

// Register user
router.post("/users", async (req, res) => {
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

// Upload avatar
router.post("/upload/:username", upload.single("avatar"), async (req, res) => {
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

export default router;
