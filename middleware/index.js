//all middleware goes here
var Book = require("../models/book");
var Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkBookOwnership = function(req, res, next){
  if(req.isAuthenticated()){
          Book_review.findById(req.params.id, function(err, foundBook){
            if(err){
              console.log(err);
              //  res.redirect("/back");
           } else {
          // does user own the book?
              if(String(foundBook.postedBy.id) === String(req.user._id)){
               next();
              } else {
                res.send("YOU AREN'T THE OWNER");
              }
           }
      });
    } else {
      res.send("YOU WILL HAVE TO LOGIN TO DO THAT");

    }


}

middlewareObj.checkCommentOwnership = function (req, res, next){
  if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
              console.log(err);
              //  res.redirect("/back");
           } else {
          // does user own the comment?
              if(String(foundComment.name.id) === String(req.user._id)){
               next();
              } else {
                res.send("YOU AREN'T THE OWNER");
              }
           }
      });
    } else {
      res.send("YOU WILL HAVE TO LOGIN TO DO THAT");

    }

};


middlewareObj.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
};



module.exports = middlewareObj