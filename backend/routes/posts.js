const express = require("express");
const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
});

post.save().then(createdPost => {
    res.status(200).json({
    message: "Post added Success",
    postId: createdPost._id
});
});
});
router.put("/:id", (req, res, next) => {
const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
});
Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({message: "Update Done"});
});
});

// post.save((err, posts) => {
//     if (err) {
//         console.log(err)
//     } else {
//         // let payload = { subject: posts}
//         res.status(200).json({          // json or send
//             message: "Correctly Saved"
//         })
//     }
// })

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
router.get("", (req, res, next) => {  //realy need next ?
Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully',
            posts: documents
    });
});
});
router.get("/:id", (req, res, next) => {
Post.findById(req.params.id).then(post => {
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found!" });
  }
});
});

router.delete("/:id", (req,res,next) =>{
// Post.findById(post.id);
Post.deleteOne({_id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({message: 'Post Deleted'});
});  
});

module.exports = router;