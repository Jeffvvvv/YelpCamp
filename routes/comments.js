//-------------------
// Title:   YelpCamp Website
// Author:  Jeff
// Date:    Feb 2018
//-------------------


var express = require("express");
var router = express.Router({mergeParams:true});
var Comment = require("../models/comment");
var Campground = require("../models/campgrounds");
var middleware = require("../middleware")


//------------------------------
//CREATE A NEW COMMENT: GET FORM
//------------------------------
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new", {campground:campground});
        }
    });
});


//--------------------------
//CREATE A NEW COMMENT: POST
//--------------------------
router.post("/", middleware.isLoggedIn, function(req, res){
    
     //lookup campground using ID
    //create a new comment
    //connect new comment to the campground
    //redirect to show page
    Campground.findById(req.params.id, function(err, foundCampground)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            Comment.create(req.body.comment, function(err, comment){
                if(err)
                {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                }
                else
                {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save the comment
                    comment.save();
                    foundCampground.comments.push(comment._id);
                    foundCampground.save();
                    req.flash("success", "Successfully create a new comment!!")
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});


//------------------
//EDIT COMMENT ROUTE
//-----------------
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById((req.params.comment_id), function(err, foundComment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            var campground_id = req.params.id;
            res.render("comments/edit", {campground_id:campground_id, comment:foundComment});
        }
    });
});


//--------------------
//UPDATE COMMENT ROUTE
//--------------------
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//------------------
//DELETE COMMENT
//-----------------
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            req.flash("error", "Successfully delete a comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;