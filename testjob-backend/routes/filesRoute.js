const Api = require("../controllers/filesController");
const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const auth = require("../middleware/auth");
// const parser = require("body-parser").json();

const uploadPostData = (req, res, next) => {
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ])(req, res, (err) => {
    req.body.image = req.files.image;
    req.body.file = req.files.file;
    next();
  });
};

router.post("/upload", auth, uploadPostData, Api.uploadFile);
router.get("/", auth, Api.getALLFiles);
router.put('/update/:user_id',auth,uploadPostData,Api.updateFile)
router.delete("/delete/:user_id/:files_id", auth, Api.deleteFile);

module.exports = router;
