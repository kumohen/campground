var router = require("express").Router();
var Campground = require("../model/campground");
var Comment = require("../model/comment");

router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else {
            res.render("comment/comnew",{campground:campground});
        }
    })
   })
   router.post("/campgrounds/:id/comments",function(req,res){
       Campground.findById(req.params.id,function(err,campground){
           if(err){
               console.log(err);
           }else {
               var text = req.body.text
               var author = req.body.author
               var Newcomment = {text:text,author:author};
              Comment.create(Newcomment,function(err,comment){
                  if(err){
                      console.log(err);
                  }else{
                      comment.author.id = req.user._id;
                      comment.author.username = req.user.username;
                      comment.save();
                      campground.comments.push(comment);
                      campground.save();
                      res.redirect("/campgrounds/" + campground._id);
                  }
              })
           }
       })
      })


      
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

      module.exports = router ;