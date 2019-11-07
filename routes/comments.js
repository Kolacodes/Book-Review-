var express = require("express");
var router  = express.Router({mergeParams: true});

var Book_review = require("../models/book");
var middleware = require("../middleware");

var Comment = require("../models/comment");



// comment new

router.get("/new",  middleware.isLoggedIn, function(req, res){
    // find book by id 
    Book_review.findById(req.params.id, function(err, new_book){
      if(err){
        console.log(err)
      } else {
        res.render("comments/new", {new_book: new_book})
      }
    })
    
  });
  
  // comment create

  router.post("/",  middleware.isLoggedIn, function(req, res){
    Book_review.findById(req.params.id, function(err, new_book){
      if(err){
        console.log(err);
        res.redirect("/books");
      } else {
        
        Comment.create(req.body.comment, function(err, comment){
          if(err){
            console.log(err)
          } else {
            // add username and id to comment
           comment.name.id = req.user._id;
           comment.name.username = req.user.username;
        // save comment
            comment.save();
            new_book.comments.push(comment);
            new_book.save();
            console.log(comment);
            res.redirect('/books/' + new_book._id);
          }
        });
  
      }
    })
  });
  

// COMMENT EDIT ROUTE 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {new_book_id: req.params.id, comment: foundComment})

    };
  })
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/books/" + req.params.id);
    }
  });
  // res.send("UPDATE COMMENT");
});


// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("/books/" + req.params.id)
    }
  });
})


  
  module.exports = router;