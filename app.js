var express = require ("express"),
    app = express(),
    bodyParser = require ("body-parser"),
    mongoose = require ("mongoose"),
    flash    =  require("connect-flash"),
    methodOverride = require("method-override"),
    Book_review = require ("./models/book"),
    Comment = require ("./models/comment"),
    passport = require ("passport"),
    LocalStrategy = require ("passport-local"),
    User   = require ("./models/user");
    seedDB   = require ("./seed");
    
    var commentRoutes = require("./routes/comments"),
        bookRoutes    = require("./routes/books"),
        indexRoutes   = require("./routes/index");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// mongoose.connect("mongodb://localhost/book_review", {useNewUrlParser: true, useUnifiedTopology: true} );

mongoose.connect("mongodb+srv://root:teedanjum@cluster0-7g0u4.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true} );


// mongodb+srv://root:<password>@cluster0-7g0u4.mongodb.net/test?retryWrites=true&w=majority



app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Once again Allah scales me through!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next ){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

//requiring routes
app.use("/", indexRoutes);
app.use("/books", bookRoutes);
app.use("/books/:id/comments", commentRoutes);


app.listen(3000, function(){
    console.log("The Book Review server just started")
});