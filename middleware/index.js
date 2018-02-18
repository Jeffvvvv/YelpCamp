//-------------------
// Title:   YelpCamp Website
// Author:  Jeff
// Date:    Feb 2018
//-------------------

//-----------------------------
//All the middleware goes here
//-----------------------------
var middlewareObj = {};
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");


//---------------------------------
//Middleware: CheckCommentOwnership
//---------------------------------
middlewareObj.checkCommentOwnership = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You do not have permissions to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};


//-----------------------------------
//Middleware:checkCampgroundOwnerShip
//-----------------------------------
middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err)
            {
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else
            {
                if(foundCampground.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        req.flash("error", "You need to be logged in to do that")
        res.redirect("back");
    }
};


//--------------------------------------------------
//Middle: Check whether the users has been logged in
//--------------------------------------------------
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    };
    //A flash will show the message in the next page, then redirect to the next page
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};



module.exports = middlewareObj;