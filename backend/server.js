const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect("mongodb://localhost:27017/memeDB")
  .then(() => console.log("Підключено до MongoDB"))
  .catch(err => console.error("Помилка:", err));

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => console.log(`Сервер працює на порту ${PORT}`));

const memeRoutes = require("./routes/memes");
app.use("/api/memes", memeRoutes);