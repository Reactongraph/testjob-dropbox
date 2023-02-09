const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

const uploadFile = (fileName, fileType, filePath) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME ,
    Key: fileName,
    Body: require('fs').createReadStream(filePath),
    ContentType: fileType
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
};



module.exports=uploadFile(fileName, fileType, filePath);