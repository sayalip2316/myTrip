const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    Name:{type:String, required:true},
    Email:{type:String, required:true},
    Destination:{type:String, enum:["India", "Africa", "Europe", "America"], required:true},
    NoOfTravelers :{type:Number, required:true},
    BudgetPerPerson :{type:Number, required:true}
})

const PostModel=mongoose.model("post",postSchema);

module.exports={PostModel};