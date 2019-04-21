var mongoose = require("mongoose");
var Campground = require("./model/campground");
var Comment = require("./model/comment");
var data = [
  {
    name:"picture1",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbybRCcoRWb4e-Y5PtDB7O0dYx7An7T1dHPjTNuL4v8NbePid",
    description:"Chandigarh, the capital of the northern Indian states of Punjab and Haryana, was designed by the Swiss-French modernist architect, Le Corbusier. His buildings include the Capitol Complex with its High Court, Secretariat and Legislative Assembly, as well as the giant Open Hand Monument. The nearby Rock Garden is a park featuring sculptures made of stones, recycled ceramics and industrial relics."
  },
     {
       name:"picture2",
       image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8MIiP5xI1ZZGR4Guqa4ElpjRnQqhG5E5uG5E6zMKI435HO3fH",
       description:"Chandigarh, the capital of the northern Indian states of Punjab and Haryana, was designed by the Swiss-French modernist architect, Le Corbusier. His buildings include the Capitol Complex with its High Court, Secretariat and Legislative Assembly, as well as the giant Open Hand Monument. The nearby Rock Garden is a park featuring sculptures made of stones, recycled ceramics and industrial relics."
   },
    {name:"picture3",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAk7DuOAePMziFEeG5RJRCzkPgg0YiTQNHOoBxg2KiYK8MpJUNow",
    description:"nice picture3"
  }
]
function seedDB(){
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campground");
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else {
                    console.log("added a campground");
                    Comment.create({
                        text:"kssssssssssssssssssss",
                        author:"charan"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("create new comment");
                        }
                    })
                }
            })
        })
    });
 
}


// function seedDB(){
//   Campground.deleteMany({},(err)=>{
//     if(err){
//       console.log(err)
//     }
//     console.log("remove campground");
//     data.forEach(function(seed){
//       Campground.create(seed,(err,data)=>{
//         if(err){
//           console.log(err);
//         }else{
//           console.log("added new campground");
//           Comment.create({
//             text:"it was good t",
//             author:"charan"
//           },(err,comment)=>{
//             if(err){
//               console.log(err);
//             }else{
//               data.comments.push(comment);
//               data.save();
//               console.log("comment is created");
//             }
//           });
//         }
//       });
//     });
//   });
// }
module.exports = seedDB;
