
# Welcome to YelpCamp
A full-stack Node.js online website for campgrounds recommendation and display. 

Users can register/login/logout, create/edit/delete/show a campground, post/edit/delete comments.

You can share any great campgrounds you like. 

We are happy to see you!!!!!

## Deployment
The website is deployed on [here](https://boiling-lowlands-77762.herokuapp.com).

The website is deployed on a cloud application platform **Heroku** with a cloud database MongoDB service **MLab**.

## Development IDE
Old Version **Cloud9**. 

## Front-end
HTML

CSS

JavaScript

Bootstrap

## Back-end
DataBase: **MongoDB**

Frame: **Express**

Run-time Environment: **Node.js**

## Routes
"/": YelpCamp home page - see animation

"/register": User Sign up

"/login": User Log in

"/logout": User Log out

"/campgrounds": show all the campgrounds' images

"/campgrounds/new": create a new campground

"/campgrounds/:id": show detailed information for a campground

"/campgrounds/:id/edit": edit and update the detailed information for a campground

"/campgrounds/:id/comments/new": post a new comment for a campground

"/campgrounds/:id/comments/:comment_id/edit": edit and update a comment for a campground

"/campgrounds/:id/comments/:comment_id": DELETE request - delete a comment

Note: You can only delete the comment and campground that you create!! You do not have permissions to modify others' comments and campgrounds, and you will not see **Edit** and **Delete** button when you read others comments and campgrounds info.


