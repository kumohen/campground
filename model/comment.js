var mongoose = require("mongoose");
var Schema =  mongoose.Schema;
var CommentSchema = new Schema({
    text:String,
    author:{
        
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            username:String
        }
    
});
module.exports = mongoose.model("Comment",CommentSchema);