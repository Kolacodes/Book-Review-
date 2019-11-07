// var mongoose = require ("mongoose");
// var Book_review = require ("./models/book");
// var Comment = require ("./models/comment");

// var data = [
//     {
//         title: "Beyond The Castle", 
//         author: "Bello K Mustapha",
//         image:  "https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore id obcaecati eaque quod nemo! Harum, voluptatum. Assumenda nisi, adipisci ratione reprehenderit quo totam incidunt, sed alias vitae, vel natus quae."
//     },
//     {
//         title: "Beyond The Castle", 
//         author: "Bello K Mustapha",
//         image:  "https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore id obcaecati eaque quod nemo! Harum, voluptatum. Assumenda nisi, adipisci ratione reprehenderit quo totam incidunt, sed alias vitae, vel natus quae."
//     },
//     {
//         title: "Beyond The Castle", 
//         author: "Bello K Mustapha",
//         image:  "https://images.pexels.com/photos/33283/stack-of-books-vintage-books-book-books.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore id obcaecati eaque quod nemo! Harum, voluptatum. Assumenda nisi, adipisci ratione reprehenderit quo totam incidunt, sed alias vitae, vel natus quae."
//     }
// ];


//  function seedDB(){
//      //remove all books
//         Book_review.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed all books!")
//     });
//     //add a few books using data
// data.forEach(function(seed){
//     Book_review.create(seed, function(err, newbook){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("added a new book");
//             Comment.create(
//                 {
//                     text: "Masha Allah!",
//                     name: "Abu Dugaanah"
//                 }, function(err, comment){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         newbook.comments.push(comment);
//                         newbook.save();
//                         console.log("a new comment added to newbook")
//                         console.log(comment);
//                     }
//                 }
//             )
//         }
//     })
// })

// };

// module.exports = seedDB;