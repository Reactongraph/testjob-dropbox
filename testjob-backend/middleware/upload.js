const multer = require("multer");
const Aws = require("aws-sdk");


const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },  
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype === "application/msword" || file.mimetype === "application/image/gif" || file.mimetype === "application/xml" || file.mimetype === "application/vnd.ms-excel" || file.mimetype === "audio/mpeg" || file.mimetype === "video/mp4" || file.mimetype === "text/csv" || file.mimetype === "text/plain" || file.mimetype === "application/vnd.oasis.opendocument.spreadsheet" || file.mimetype === "application/vnd.oasis.opendocument.text") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});


module.exports = {upload , s3}