//-------------------
// Title:   YelpCamp Website
// Author:  Jeff
// Date:    Feb 2018
//-------------------


var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campgrounds"),
    Comment      = require("./models/comment"),
    passport     = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy= require("passport-local"),
    User         = require("./models/user"),
    flash        = require("connect-flash");
    
//requiring routes
var commentRoutes     = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index")


//------------------------------------------------
//CONFIGURE ALL THE PACKAGES AND FUNCTIONS
//------------------------------------------------
mongoose.connect("mongodb://localhost/Yelp_Camp_Project");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//----------------------
//PASSPORT CONFIGURATION
//----------------------
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    //used for hash
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//-----------
//ROUTE FILES
//-----------
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("YelpCamp Server has started");
});



//------------------------------------------------------------------------------------------------------------------------------------------------------
// You can add some sample camping images to the website from the following recommendations
// var campgrounds = [
//       {name:"Six Camping Forest", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"Quiet Beach", image:"https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"Desert Camping", image:"https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"Wooden Table", image:"https://images.pexels.com/photos/5921/wood-holiday-vacation-garden.jpg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"Night Green Grass", image:"https://images.pexels.com/photos/112378/pexels-photo-112378.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"Peace Town", image:"https://images.pexels.com/photos/290448/pexels-photo-290448.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"Green Trees", image:"https://images.pexels.com/photos/730426/pexels-photo-730426.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"Blue Peace Mountain", image:"https://images.pexels.com/photos/743765/pexels-photo-743765.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"},
//       {name:"sfasdfa", image:"https://images.pexels.com/photos/213807/pexels-photo-213807.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb"}
//       ];
//------------------------------------------------------------------------------------------------------------------------------------------------------