const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require('ejs');
const _ = require('lodash')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://williespratt:test123@cluster0.vhgql.mongodb.net/wesBlogDB", {useNewUrlParser: true});




const homeContent = `Wes, Let's document your progress on your coding journey!`;


// Mongoose Schemas and Models

const postSchema = {
    title: String,
    content: String
  };

const Post = mongoose.model("Post", postSchema);

// Home Page Responses and Requests
app.get("/", function(req, res){

    Post.find({}, function(err, posts){
      res.render("home", {
        start: homeContent,
        posts: posts
        });
    });
  });
//Compose Page Responses and Requests
app.get("/compose", function(req, res){
    res.render("compose");
  });

  app.post("/compose", function(req, res){
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postContent
    });
  
  
    post.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });
  });

//Search Query Logic

app.get("/search", function(req, res){
    Post.find({}, function(err, posts){
        res.render("search", {
          posts: posts
          });
      });
});


// Posts Pages Response and Requests

app.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
      Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("post", {
          title: post.title,
          content: post.content
        });
      });
    
    });
    



app.listen(3000, function(){
  console.log("Server started on port 3000.");
});