//-------------------
// Title:   YelpCamp Website
// Author:  Jeff
// Date:    Feb 2018
//-------------------


var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//----------
//ROOT ROUTE
//----------
router.get("/", function(req, res)
{
    res.render("landing");
});


//-----------------------
//REGISTER ROUTE:GET FORM
//-----------------------
router.get("/register", function(req,res)
{
    res.render("register");
});


//---------------------
//RESGISTER ROUTE:POST
//---------------------
router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req,res, function(){
                req.flash("success", "Welcome to YelpCamp" + req.body.username)
                res.redirect("/campgrounds");
            });
        }
    });
})


//--------------------
//LOGIN ROUTE:GET FORM
//--------------------
router.get("/login",function(req, res) {
   res.render("login"); 
});


//----------------
//LOGIN ROUTE:POST
//----------------
router.post("/login", passport.authenticate("local", {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req, res) {
    
});


//---------------------
//LOGOUT ROUTE:GET FORM
//---------------------
router.get("/logout", function(req, res)
{
    req.logout();
    req.flash("success", "Logged you out!!")
    res.redirect("/campgrounds");
});

module.exports = router;