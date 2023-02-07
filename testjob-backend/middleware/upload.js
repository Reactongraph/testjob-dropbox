const multer = require("multer");
const Aws = require("aws-sdk");


const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },  
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new Aws.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_ACCESS_KEY_SECRET,
});


module.exports = {upload , s3}