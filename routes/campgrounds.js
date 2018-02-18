//-------------------
// Title:   YelpCamp Website
// Author:  Jeff
// Date:    Feb 2018
//-------------------


var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
//middleware is a directory, here we can directly call the directory,
//and the system will automatically call the index.js in this directory
var middleware = require("../middleware")


//--------------------------------------------------------
//CAMPGROUNDS ROUTE: SHOW ALL THE CAMPGROUNDS IN THIS PAGE
//--------------------------------------------------------
router.get("/", function(req, res)
{
      //console.log(req.user);
      //res.render("campgrounds", {campgrounds:campgrounds});
      //get all the campgrounds from DB
      Campground.find({}, function(err, allcampgrounds)
      {
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.render("campgrounds/Index", {campgrounds:allcampgrounds});
          }
      });
});


//------------------------------
//CREATE NEW CAMPGROUND:POST
//------------------------------
router.post("/", middleware.isLoggedIn, function(req, res)
{
       //get data from form and add to campgrounds array
       //redirect back to campground page
      // var data = JSON.parse(req.body);
      var name = req.body.name;
      var image = req.body.url;
      var price = req.body.price;
      var description = req.body.description;
      var author = {
          id: req.user._id,
          username: req.user.username
      }
      var newCampgrounds = {name: name, price:price, image: image, description:description, author:author};
      //create a new campground and save to DB
      Campground.create(newCampgrounds,function(err, camp){
        if(err)
        {
            console.log(err);
        }
        else
        {
            //console.log("Newly created campground");
            res.redirect("/campgrounds");
        }
    });
});


//----------------------------------
//CREATE NEW CAMPGROUND:GET FORM
//----------------------------------
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});


//-------------------------------------------------------------------------------------------
//SHOW DETAILED INFORMATION FOR A CAMPGROUND WITH ITS ID
//-------------------------------------------------------------------------------------------
router.get("/:id", function(req, res)
{
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(foundCampground);
            //render show template with that campground
             res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//---------------------
//EDIT CAMPGROUND ROUTE
//---------------------
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            res.render("campgrounds/edit", {foundCampground:foundCampground}); 
        }
    });
});


//-----------------------
//UPDATE CAMPGROUND ROUTE
//----------------------
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //find and update the corresponding campground
    //redirect to the show page
    Campground.findByIdAndUpdate(req.params.id, req.body.newcampground, function(err, updatedCampground){
        if(err)
        {
            res.direct("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


//-------------------------
//DESTROY CAMPGROUND ROUTE
//------------------------
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        req.flash("success", "Successfully delete a campground!");
        res.redirect("/campgrounds");
    });
});

module.exports = router;