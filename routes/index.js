var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){ 
   res.render("landing");
});


//Auth Routes
//show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register",function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
       });
   });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});
//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        if(passport.authenticate.successRedirect) {
            req.flash("success", "Welcome back" + req.params.id);
            res.redirect(passport.authenticate.successRedirect);
        } else {
            req.flash("error", "Something went wrong, please try again");
            res.redirect(passport.authenticate.failureRedirect);
        }

});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("error", "You have been logged out");
    res.redirect("/campgrounds");
})

module.exports = router;