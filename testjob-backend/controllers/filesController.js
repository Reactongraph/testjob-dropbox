const User = require("../model/users");
const fileData = require("../model/fileData");
const { s3 } = require("../middleware/upload");
const path = require("path");
module.exports = class Api {
  static async uploadFile(req, res) {
    const fileName= req.files.file[0].originalname
    const fileBody = req.files.file[0].buffer
    const fileType = path.extname(fileName);
    try {
      const { user_id } = req.body;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileBody,
        ACL: "public-read-write",
        ContentType: fileType,
      };

      s3.upload(params, async (error, data) => {
        if (error) {
          res.status(500).send({ err: error });
        }
        let newData={
          user_id,
          file: data.Location,
          fileName: fileName,
          contentType:fileType
        }
        const createdData= await fileData.create(newData)
        res.json({message: "file uploaded Sucessfully", data: createdData})
      });
    } catch (e) {
      console.log("error creating",e)
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
    console.log("in updateFile",req.file)
    let user_id = req.params.user_id;
    let file_id = req.body.id;
    const fileName= req.files.file[0].originalname
    const fileBody = req.files.file[0].buffer
    const fileType = path.extname(fileName);
    try {
     if(req.headers["x-access-token"]){
      console.log("in if block")
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileBody,
        ACL: "public-read-write",
        ContentType: fileType,
      };

      s3.upload(params, async (error, data) => {
        if (error) {
          console.log("upload error", error)
          res.status(500).send({ err: error });
        }
        let newData={
          user_id,
          file: data.Location,
          fileName: fileName,
          contentType:fileType
        }
        const updatedData= await fileData.findByIdAndUpdate(file_id, newData)
        res.json({message: "file updated Sucessfully", data: updatedData})
      });
     }
    } catch (e) {
      console.log("error in put", e)
      res.json({message: "oops something went wrong", error: e});
    }
  }

  static async deleteFile(req, res) {
    const { user_id, files_id } = req.params;

    try {
      if (req.headers["x-access-token"]) {
        const data = await fileData.findById({ _id: files_id });
        if (data.user_id == user_id && data._id == files_id) {
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
}
