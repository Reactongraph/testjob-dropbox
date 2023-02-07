const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  ContentLength: {
    type: Number,
  },
  ContentType: {
    type: String,
  },
  fileName: {
    type: String,
  },
  image: {
    type: String,
  },
  file: {
    type: String,
  },
});

fileSchema.set("timestamps", true);
module.exports = mongoose.model("fileData", fileSchema);
