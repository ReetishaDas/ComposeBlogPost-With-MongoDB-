//jshint esversion:6
//LODASH ==== string features for NodeJS (like java concat lower case etc)
//WITH MONGOOSE

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Setting up connection
main().catch((err) => console.log("Mongo Server Not Connected"));

async function main() {
  const url = "mongodb://127.0.0.1:27017";
  const dbPath = "/blogpostDB";
  await mongoose.connect(url + dbPath, {
    useNewUrlParser: true,
  });

  const composeSchema = mongoose.Schema({
    title: String,
    content: String
  });
  const Post = mongoose.model("Post", composeSchema);


app.get("/", function (req, res) {
  Post.find({}).then(function(foundPosts){
    res.render("home", {
      homeDefaultContent: homeStartingContent,
      homeData: foundPosts
    });
  }).catch(function(err){
      console.log("No Posts Found\n\n",err);
  });

});

app.get("/blogPosts/:postID", function (req, res) {
  //converting all to lowercase anf without kebabs (-) 
  const postID = req.params.postID;
  Post.findOne({_id: postID}).then(function(foundPost){
    res.render("post", {
            currentTitle: foundPost.title,
            currentPost: foundPost.content
          });
  }).catch(function(err){
    console.log(err);
  });
});


app.get("/about", function (req, res) {
  res.render("about", { aboutData: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactData: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const postDoc = new Post({
    title: req.body.composeMessageTitle,
    content: req.body.composeMessageData
  });
  postDoc.save();
  res.redirect("/");
});









app.listen(3060, function () {
  console.log("Server started on port 3060");
});


}



