const User = require("../model/users");
const fileData = require("../model/fileData");
const { s3 } = require("../middleware/upload");
const { response } = require("express");

module.exports = class Api {
  static async uploadFile(req, res) {
    try {
      const { user_id } = req.body;
      console.log("+++++++++++++++++", user_id);
      const params = {
        Bucket: process.env.MY_AWS_BUCKET_NAME,
        Key: req.files.image[0].originalname,
        Body: req.files.image[0].buffer,
        ACL: "public-read-write",
        ContentType: "image/jpg",
      };

      s3.upload(params, async (error, data) => {
        if (error) {
          res.status(500).send({ err: error });
        }
        let newdata = {
          user_id,
          image: data.Location,
        };
        let params = {
          Bucket: process.env.MY_AWS_BUCKET_NAME,
          Key: req.files.file[0].originalname,
          Body: req.files.file[0].buffer,
          ACL: "public-read-write",
          ContentType: "application/pdf",
        };

        s3.upload(params, async (error, data) => {
          if (error) {
            res.status(500).send({ err: error });
          }

          const user = await User.findById({ _id: user_id });
          const finalData = {
            ...newdata,
            file: data.Location,
            user_id: user._id,
          };
          const uploaded = await fileData.create(finalData);
          console.log("After Upload", uploaded);

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
        console.log("user_id", user_id);
        const data = await fileData.findOne({ user_id: user_id });
        console.log("all data", data);

        res.json({ sucess: true, data });
      } else {
        res.json({ sucess: false, error: "Access token not found" });
      }
    } catch (e) {
      res.json({ sucess: false, error: e });
    }
  }

  static async deleteFile(req, res) {
    const { user_id, files_id } = req.params;

    try {
      console.log("++++++++", user_id, files_id);
      if (req.headers["x-access-token"]) {
        const user = await User.findById({ _id: user_id });
        if (user._id == user_id) {
          const updatedData = await fileData.deleteOne({ _id: files_id });
          res.json({
            message: "deleted successfully",
            sucess: true,
            data: updatedData,
          });
        } else {
          console.log("errrrrrrrrrrrrrrrrrrrrrr");
        }
      } else {
        console.log("in else block");
      }
    } catch (e) {
      console.log("Error in catch block", e);
    }
  }
};
