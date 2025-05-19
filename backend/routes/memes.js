const express = require("express");
const multer = require("multer");
const Meme = require("../models/Meme");
const router = express.Router();

// Налаштування Multer для зберігання зображень
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Завантажити мем
router.post("/", upload.single("image"), async (req, res) => {
  const { title } = req.body;
  const imageUrl = req.file.filename;
  const newMeme = new Meme({ title, imageUrl });
  await newMeme.save();
  res.status(201).json(newMeme);
});

// Отримати всі меми
router.get("/", async (req, res) => {
  const memes = await Meme.find().sort({ createdAt: -1 });
  res.json(memes);
});

// Додати лайк
router.put("/:id/like", async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  meme.likes += 1;
  await meme.save();
  res.json(meme);
});

module.exports = router;