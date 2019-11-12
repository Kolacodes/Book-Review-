//all middleware goes here
var Book_review = require("../models/book");
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
                  req.flash("error", "You do not have permission to do that");                
              }
           }
      });
    } else {
      req.flash("error", "You need to be logged in to do that");      

    }


}

middlewareObj.checkCommentOwnership = function (req, res, next){
  if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
              req.flash("error", "Book not found");
              res.redirect("back");
              //  res.redirect("/back");
           } else {
          // does user own the comment?
              if(String(foundComment.name.id) === String(req.user._id)){
               next();
              } else {
              req.flash("error", "You don't have permission to do that");
                res.redirect("back");
                
              }
           }
      });
    } else {
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");

    }

};


middlewareObj.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login")
};



module.exports = middlewareObj