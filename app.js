var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require('express-session')
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var {mongodbURL} = require('./config/database');


var Campground = require("./model/campground");
var Comment = require("./model/comment");
var User = require("./model/user");
var seedDB = require("./seeds");

var app = express();

// mongoose.connect("mongodb://localhost:27017/yelp_git",{ useNewUrlParser: true });
mongoose.connect(mongodbURL,{ useNewUrlParser: true }).then(()=>{
    console.log("mongodb is connected");
})
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/",function(req,res){
    res.render("landing");
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));


passport.use(new LocalStrategy(User.authenticate()));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());  
app.use(bodyParser.urlencoded({ extended: true }));

   

app.set("view engine","ejs");

var campgroundsRoutes = require("./routes/campgrounds");
var commentsRoutes = require("./routes/comments");
var authRoutes = require("./routes/auth");

app.use("/",campgroundsRoutes);
app.use("/",commentsRoutes);
app.use("/",authRoutes);




const port = process.env.PORT || 3000 ;

app.listen(port,function(req,res){
    console.log("it is ok");
})