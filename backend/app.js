const express = require('express');


const app = express();

app.use('/api/posts', (req, res, next) => {
   const posts = [
    { 
           "title": "title1",
        "description": "desc1"
    },
    { 
        "title": "title2",
        "description": "desc3"
    }
   ];
    res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: posts
    });
});

module.exports = app;