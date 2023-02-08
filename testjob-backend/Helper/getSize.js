const request = require('request');

const getImageSize = (imageUrl) => {
  return new Promise((resolve, reject) => {
    request({url: imageUrl, encoding: null}, (error, response, data) => {
      if (!error && response.statusCode == 200) {
        const imageSizeInBytes = Buffer.byteLength(data, 'utf8');
        const imageSizeInKB = imageSizeInBytes / 1024;
        resolve(imageSizeInKB.toFixed(2));
      } else {
        reject(error);
      }
    });
  });
};

module.exports = getImageSize