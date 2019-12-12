var express = require("express");
var router  = express.Router();

var Book_review = require("../models/book");
var middleware = require("../middleware");
var Comment = require("../models/comment");


// INDEX ROUTE 1

router.get("/", function(req, res) {
    // get all new_books from book_review DB 
    Book_review.find({}, function(err, new_books){
      if(err){console.log(err);
      } else {
        res.render("books/index", {new_books:new_books, currentUser: req.user} )
      }
  
    });
  });
  
  
//  CREATE ROUTE 2
  
  router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form 
    var title = req.body.title;
    var price = req.body.price;
    var image = req.body.image;
    var review = req.body.review;
    var postedBy = {
      id: req.user._id,
      username: req.user.username
    };
    var new_book = {title:title, price:price, image: image, review: review, postedBy:postedBy}
    // create a new book and save in the DB
    Book_review.create(new_book, function(err, new_book){
      if(err){console.log(err);
      } else {
        // console.log(newlyCreated)
        res.redirect("/");
      }
    });
  
  
  });
  
  
  // NEW - shows form to create new book 3
  
  router.get("/new", middleware.isLoggedIn, function(req, res) {
      res.render("books/new")
     });
  
  
     // SHOW ROUTE 4 -- shows more info about a new book

  router.get("/:id", function(req, res){
    // FIND THE CAMPROUND WITH PROVIDED ID
    Book_review.findById(req.params.id).populate("comments").exec(function(err, foundBook){
      if(err){console.log(err);
      } else {
        console.log(foundBook);
        res.render("books/show", {new_book: foundBook})
      }
    });
    // render show template with the specific book
  
  });



  // EDIT BOOK ROUTE
  router.get("/:id/edit", middleware.checkBookOwnership, function(req, res){
    Book_review.findById(req.params.id, function(err, foundBook){
                 res.render("books/edit", {new_book: foundBook});
    });
    
  });


  // UPDATE BOOK ROUTE
router.put("/:id", middleware.checkBookOwnership, function(req, res){
  //find and update the correct new_book
  Book_review.findByIdAndUpdate(req.params.id, req.body.new_book, function(err, updatedBook){
    if(err){
      //res.redirect("/books");
      console.log(err);
    } else{
      res.redirect("/books/" + req.params.id);
    }
  })
  //redirect somewhere usually the show page
});


// DESTROY BOOK ROUTE
router.delete("/:id", middleware.checkBookOwnership, function(req, res){
  Book_review.findByIdAndRemove(req.params.id, function(err, deletedBook){
    if(err){
      console.log(err)
    } else {
      res.redirect("/books")
    }
  })
});



//middleware

  module.exports = router;