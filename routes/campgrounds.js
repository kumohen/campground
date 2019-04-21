var router = require("express").Router();
var Campground = require("../model/campground");
var Comment = require("../model/comment");



router.get("/campgrounds",function(req,res){
           
    Campground.find({},function(err,campgrounds){
if(err){
    console.log(err);
}else{
    res.render("campground",{campgrounds:campgrounds});
}
})


});

router.post("/campgrounds",isLoggedIn,function(req,res){
var name = req.body.username;
var image = req.body.image;
var description = req.body.description;
var author = {
    id:req.body._id,
    username:req.user.username
}
var newCampground = {name:name,image:image,description:description,author:author};
Campground.create(newCampground,function(err,newlyCampground){
if(err){
console.log(err);
}else{
res.redirect("/campgrounds");
}
})





});
router.get("/campgrounds/new",isLoggedIn,function(req,res){
res.render("new");
});

router.get("/campgrounds/:id",function(req,res){
Campground.findById(req.params.id).populate('comments').exec(function(err,campground){
if(err){
    console.log(err);
}else{
    res.render("show",{campground:campground});
}
})
})


router.get("/campgrounds/:id/edit",function(req,res){

    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                console.log(err);
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    res.render("camedit",{campground:foundCampground});
                }else{
                    res.send("you donot have permission");
                }
                
            }
        })
    }else{
        console.log("you should login in first");
        res.send("you should login in first");
    }
  
    
    })

    router.put("/campgrounds/:id/edit",function(req,res){
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
            if(err){
                console.log(err);
            }else{
                res.redirect("/campgrounds/" + req.params.id);
            }
        })
        
        })   

        router.delete("/campgrounds/:id",function(req,res){
            Campground.findByIdAndDelete(req.params.id,function(err,updatedCampground){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/campgrounds");
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