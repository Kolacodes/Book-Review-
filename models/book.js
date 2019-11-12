var mongoose = require ("mongoose");

// SCHEMA SETUP
var book_reviewSchema = new mongoose.Schema({
    title: String,
    price: String,
    author: String,
    postedBy: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
    },
    image: String,
    review: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "Comment"
        }
    ]
  });
  
  module.exports = mongoose.model("Book_review", book_reviewSchema);
  
    