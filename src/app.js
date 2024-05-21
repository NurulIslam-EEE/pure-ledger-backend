const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const { restart } = require("nodemon");

// middleware
app.use(express.json());
app.use(cors());

// route
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

const userRoute = require("../src/app/modules/users/users.route");

app.use("/api/v1/user", userRoute);

// posting to database

module.exports = app;
