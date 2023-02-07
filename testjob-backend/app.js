require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const usersRouter = require("./routes/usersRoute")
const filesRouter = require("./routes/filesRoute");
require("./config/database").connect();


const port = process.env.PORT || 4000;


app.use(cors());
app.use("/users",usersRouter);
app.use("/files",filesRouter);

app.use(bodyParser.urlencoded({ extended: true }));



module.exports = app;
