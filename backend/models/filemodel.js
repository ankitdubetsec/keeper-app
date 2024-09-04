const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  path: String,
  fileContent: Buffer,
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
