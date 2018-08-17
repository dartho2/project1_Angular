const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post')
const app = express();
const db = "mongodb://darth:pawel1988@ds217002.mlab.com:17002/angulardb"

mongoose.connect(db, err => {
    if (err) {
        console.error("Someone Error!" + err )
    } else {
        console.log("DB connected")
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
   const post = new Post({
       title: req.body.title,
       content: req.body.content
   });
    post.save((err, posts) => {
        if (err) {
            console.log(err)
        } else {
            // let payload = { subject: posts}
            res.status(200).json({          // json or send
                message: "Correctly Saved"
            })
        }
    })
});
// app.get('/api/', (req, res) => {
//     res.send('From API')
// })
// app.get('/api/posts', (req,res) => { 
//     Post.find({}, (err,posts) => {
//         res.status(200).json({
//                     message: 'Posts fetched succesfully',
//                     posts: posts
//                 });
//     });
// });
app.get('/api/posts', (req, res, next) => {  //realy need next ?
   Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts fetched succesfully',
                posts: documents
        });
    });
});
// app.delete('/api/posts', (req,res,next) =>{
//     Post.findById(post._id)
//         .then(document)
    
// })

module.exports = app;