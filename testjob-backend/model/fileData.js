const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  contentType: {
    type: String,
  },
  fileName: {
    type: String,
  },
  file: {
    type: String,
  },
});

fileSchema.set("timestamps", true);
module.exports = mongoose.model("fileData", fileSchema);
