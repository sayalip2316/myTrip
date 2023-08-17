const express=require("express");
const postRouter=express.Router();
const {PostModel}=require("../model/post.model");

postRouter.post("/add",async(req,res)=>{
    const{Name,Email,Destination,NoOfTravelers,BudgetPerPerson}=req.body;
    try {
        const post=new PostModel({Name,Email,Destination,NoOfTravelers,BudgetPerPerson})
        await post.save();
        res.status(200).send({msg:"Post added successfully"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

postRouter.get("/",async(req,res)=>{
    const {filterBy,sortBy}=req.query;
    try {
        const sortValue=(sortBy==="asc")?1:-1;
        if(filterBy && !sortBy){
            const posts=await PostModel.find({Destination:filterBy})
            return res.status(200).json(posts)  
        }
        if(!filterBy && sortBy){
            const posts=await PostModel.find().sort({BudgetPerPerson:sortValue})
            return res.status(200).json(posts)  
        }
        if(filterBy && sortBy){
            const posts=await PostModel.find({Destination:filterBy}).sort({BudgetPerPerson:sortValue})
            return res.status(200).json(posts)
        }
        const posts=await PostModel.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const{id}=req.params
    try {
        await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Post deleted successfully"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})


module.exports={postRouter}