const mongoose = require('mongoose')
const { DB_URI } = process.env;
exports.connect = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database sucessfully");
    })
    .catch((error) => {
      console.log("error in database connection", error);
    });
};
