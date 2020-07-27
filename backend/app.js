const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

// var mongoDB = 'mongodb+srv://Albert:M1ncv4f0K1lQWkh5@cluster0.3rgou.mongodb.net/<dbname>?retryWrites=true&w=majority';

// mongoose.connect(mongoDB,{ useUnifiedTopology: true, useNewUrlParser: true })
//   .then(()=>{
//     console.log('Connected to Database');

//   })
//   .catch(()=>{
//     console.log('Connection Failed');
//   });
var mongoDB = 'mongodb://127.0.0.1/jobs-n-places';
mongoose.connect(mongoDB, { useNewUrlParser: true,useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
