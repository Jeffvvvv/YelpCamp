var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

// Campground.remove({},function(err)
// {
//     if(err)
//     {
//         console.log(err);
//     }
// });

var data = [
    {   name:"Six Camping Forest", 
        image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb",
        description: "sfafadf fasdfasdfasf sdfasf"
    },
    {
        name:"Quiet Beach", 
        image:"https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb",
        description:"sfafdafadsfs"
    },
    {
        name:"Desert Camping", 
        image:"https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb",
        description: "sfasdfafassdfa"
    }
    ];

function seedDB()
{
    Campground.remove({}, function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("remove all data from the database");
            data.forEach(function(seed)
            {
                Campground.create(seed, function(err, campground){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("Add a data to the database");
                        //create a comment
                        Comment.create({
                            text:"dsafdfasdfa",
                            author: "Jeff"
                        }, function(err, comment){
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Create a new Comment");
                            }
                        });
                    }
                });
            });
        }
    });
    //add a few campground data
};

module.exports = seedDB;
