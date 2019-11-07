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
mongoose.connect("mongodb://localhost/book_review", {useNewUrlParser: true, useUnifiedTopology: true} );
app.use(methodOverride("_method"));
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
  next();
});

//requiring routes
app.use("/", indexRoutes);
app.use("/books", bookRoutes);
app.use("/books/:id/comments", commentRoutes);


app.listen(3000, function(){
    console.log("The Book Review server just started")
});