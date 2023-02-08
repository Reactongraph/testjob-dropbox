const User = require("../model/users");
const fileData = require("../model/fileData");
const { s3 } = require("../middleware/upload");
const path = require("path");
module.exports = class Api {
  static async uploadFile(req, res) {
    try {
      const { user_id } = req.body;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.files.image[0].originalname,
        Body: req.files.image[0].buffer,
        ACL: "public-read-write",
        ContentType: "image/jpg",
      };

      s3.upload(params, async (error, data) => {
        if (error) {
          res.status(500).send({ err: error });
        }
        const imageName = path.basename(data.Location);
        const imageType = path.extname(data.Location);
        let newdata = {
          user_id,
          image: data.Location,
          imageName: imageName,
          contentType: imageType,
        };
        let params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: req.files.file[0].originalname,
          Body: req.files.file[0].buffer,
          ACL: "public-read-write",
          ContentType: "application/pdf",
        };

        s3.upload(params, async (error, data) => {
          if (error) {
            res.status(500).send({ err: error });
          }
          const fileName = path.basename(data.Location);
          const fileType = path.extname(data.Location);
          const user = await User.findById({ _id: user_id });
          const finalData = {
            ...newdata,
            file: data.Location,
            user_id: user._id,
            fileName,
            contentType: fileType,
          };
          const uploaded = await fileData.create(finalData);

          res
            .status(201)
            .send({ message: "file uploaded successfully", uploaded });
        });
      });
    } catch (e) {
      res.status(500).send({ message: "oops! something went wrong", error: e });
    }
  }

  static async getALLFiles(req, res) {
    const user_id = req.query.user_id;
    try {
      if (req.headers["x-access-token"]) {
        const data = await fileData.find({ user_id: user_id });

        res.json({ sucess: true, data });
      } else {
        res.json({ sucess: false, error: "Access token not found" });
      }
    } catch (e) {
      res.json({ sucess: false, error: e });
    }
  }

  static async updateFile(req, res) {
    let user_id = req.params.user_id;
    let file_id = req.body.id;
    const { image = {}, file } = req.files;
    try {
      if (image || file) {
        if (image && file) {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.files.image[0].originalname,
            Body: req.files.image[0].buffer,
            ACL: "public-read-write",
            ContentType: "image/jpg",
          };

          s3.upload(params, async (error, data) => {
            if (error) {
              res.status(500).send({ err: error });
            }
            let params = {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: req.files.file[0].originalname,
              Body: req.files.file[0].buffer,
              ACL: "public-read-write",
              ContentType: "application/pdf",
            };
            const imageName = path.basename(data.Location);
            const imageType = path.extname(data.Location);
            let newdata = {
              image: data.Location,
              file,
              imageName: imageName,
              contentType: imageType,
            };
            s3.upload(params, async (error, data) => {
              if (error) {
                res.status(500).send({ err: error });
              }
              const fileName = path.basename(data.Location);
              const fileType = path.extname(data.Location);
              const finalData = {
                ...newdata,
                file: data.Location,
                fileName,
                contentType: fileType,
              };

              const updatedData = await fileData.findByIdAndUpdate(
                file_id,
                finalData
              );
              res.status(200).send({ message: "Image updated", updatedData });
            });
          });
        } else if (image) {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.files.image[0].originalname,
            Body: req.files.image[0].buffer,
            ACL: "public-read-write",
            ContentType: "image/jpg",
          };

          s3.upload(params, async (error, data) => {
            if (error) {
              res.status(500).send({ err: error });
            }
            const imageName = path.basename(data.Location);
            const imageType = path.extname(data.Location);
            let newData = {
              image: data.Location,
              file,
              imageName: imageName,
              contentType: imageType,
            };
            const updatedData = await fileData.findByIdAndUpdate(
              file_id,
              newData
            );
            res.status(200).send({ message: "Image updated", updatedData });
          });
        } else {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.files.file[0].originalname,
            Body: req.files.file[0].buffer,
            ACL: "public-read-write",
            ContentType: "application/pdf",
          };

          s3.upload(params, async (error, data) => {
            if (error) {
              res.status(500).send({ err: error });
            }
            const fileName = path.basename(data.Location);
            const fileType = path.extname(data.Location);
            let newData = {
              image,
              file: data.Location,
              fileName,
              contentType: fileType,
            };
            const updatedData = await fileData.findByIdAndUpdate(
              file_id,
              newData
            );
            res.status(200).send({ message: "File updated", updatedData });
          });
        }
      } else {
        let newData = req.body;
        const data = await fileData.findByIdAndUpdate(file_id, newData);
        res.status(200).json(data);
      }
    } catch (e) {
      console.log("error updating", e);
      res.json({message: "oops something went wrong", error: e});
    }
  }

  static async deleteFile(req, res) {
    const { user_id, files_id } = req.params;

    try {
      if (req.headers["x-access-token"]) {
        const user = await User.findById({ _id: user_id });
        if (user._id == user_id) {
          const updatedData = await fileData.deleteOne({ _id: files_id });
          res.json({
            message: "deleted successfully",
            sucess: true,
            data: updatedData,
          });
        }
      } else {
        console.log("in else block");
      }
    } catch (e) {
      console.log("Error in catch block", e);
      res.json({message: "oops something went wrong", error: e});
    }
  }
};
