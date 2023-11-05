// import express module
const express = require ("express");
// import body-parser module
const bodyParser = require("body-parser");
//import mongoose module  
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/educationDB"); 
//importation du module path(interne : pas d'installation)
const path = require("path");
const usersRouter=require("./routes/users-router");
const coursesRouter=require("./routes/courses-router");
const newsRouter=require("./routes/news-router");
// create express application
const app = express();
// Configuration  :
// 1) Send JSON responses
app.use(bodyParser.json());
// 2) Get object from request
app.use(bodyParser.urlencoded({ extended: true }));
// configuration des images
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
}); 


app.use("/users",usersRouter);
app.use("/courses",coursesRouter);
app.use("/news",newsRouter);
// make app impotable from another files
module.exports = app;