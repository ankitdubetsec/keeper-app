const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const app = express();
const connectdb = require("./db/connect.js");
const { Note } = require("./models/notemodel.js");
const File = require("./models/filemodel.js");
const notesroute = require("./routes/notesroute.js");
require("dotenv").config();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "chrome-extension://feajpgnlggegigfocjblpcppkpbnhicd",
  "https://66597fae3975c9ef0dea3b09--flourishing-cat-b6127f.netlify.app",
  "https://flourishing-cat-b6127f.netlify.app/",
  "https://main--flourishing-cat-b6127f.netlify.app/",
  "https://66598e30497f3a0067aaf9c3--comfy-marshmallow-9b6d3e.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

const storage = multer.memoryStorage(); // Use memory storage for multer

const upload = multer({ storage: storage });

app.use("/api/v1/notes", notesroute);

app.get("/", (req, res) => {
  res.status(200).send("hello home");
});

app.post("/api/v1/notes/upload", upload.single("file"), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      fileContent: req.file.buffer, // Store file content as Buffer
    });

    const savedFile = await file.save();
    res.status(201).json({ file: savedFile });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
});

app.get("/api/v1/files", async (req, res) => {
  try {
    const files = await File.find({});
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
});

app.get("/api/v1/files/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.set({
      "Content-Type": file.mimetype,
      "Content-Disposition": `attachment; filename="${file.originalname}"`,
    });

    res.send(file.fileContent);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Error downloading file" });
  }
});

const start = async () => {
  try {
    await connectdb(process.env.MONGO_URI);
    app.listen(5500, () => {
      console.log("listening to port 5500");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
