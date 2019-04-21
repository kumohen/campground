var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Schema =  mongoose.Schema;
var UserSchema = new Schema({
    text:String,
    author:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users",UserSchema);