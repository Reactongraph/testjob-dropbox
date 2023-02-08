require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const usersRouter = require("./routes/usersRoute")
const filesRouter = require("./routes/filesRoute");
const mongoose = require('mongoose')
const { DB_URI } = process.env;
console.log("database connection string", DB_URI);
// require("./config/database").connect();

const port = process.env.PORT || 4000;
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

app.use(cors());
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.use(express.json())
app.use("/users",usersRouter);
app.use("/files",filesRouter);




module.exports = app;
