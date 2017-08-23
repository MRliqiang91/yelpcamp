var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
    
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "http://cdn.onlyinyourstate.com/wp-content/uploads/2016/04/5733464781_8787e851b0_b-700x467.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]    
    
function seedDB(){
    //Remove all campground
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
        console.log("removed campground");
        //Add a few campground
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //Create comments
                    Comment.create({text: "This place is great, but i wish I had internet",
                                    author: "Bart"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Comments created");
                        }
                    });
                }
            })
        });
        }
    });


}

module.exports = seedDB;
