const express = require("express");
const app = express();
const mongose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//connect to DB
mongose.connect(process.env.DB_CONNECTION, () =>
    console.log("connect to DB🌛"),
);

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/posts", (req, res) => {
    console.log("This is a middleware running");
});
// Import routes
const postRouter = require("./routes/posts");

// routes
app.use("/posts", postRouter);
app.get("/", (req, res) => {
    res.send("This is the landing page");
});

// Listen to the server
app.listen(3300);
