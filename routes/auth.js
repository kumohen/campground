var router = require("express").Router();
var User = require("../model/user");
var passport = require("passport");


router.get('/register',function(req,res){
    res.render("auth/register");
})

router.post('/register',function(req,res){

    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return  res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        })
    })

})

router.get('/login',function(req,res){
    res.render("auth/login");
})
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    faliureRedirect:"/login"
}),function(req,res){

});

router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;