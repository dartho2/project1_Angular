const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const db = "mongodb://darth:pawel1988@ds217002.mlab.com:17002/angulardb"
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

mongoose.connect(db, err => {
    if (err) {
        console.error("Someone Error!" + err )
    } else {
        console.log("DB connected")
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
module.exports = app;