const Api = require("../controllers/filesController");
const express = require("express");
const router = express.Router();
const { uploadPostData } = require("../middleware/upload");
const auth = require("../middleware/auth");


router.post("/upload", auth, uploadPostData, Api.uploadFile);
router.get("/", auth, Api.getALLFiles);
router.put('/update/:user_id',auth,uploadPostData,Api.updateFile)
router.delete("/delete/:user_id/:files_id", auth, Api.deleteFile);

module.exports = router;
