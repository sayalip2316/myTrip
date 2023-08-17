const express=require("express");
const app=express();
const {connection}=require("./config/db");
const dotenv=require("dotenv");
dotenv.config();
const {postRouter}=require("./routes/post.routes");

app.use(express.json());
app.use("/post",postRouter);


app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection
        console.log("Connected to db")
        console.log(`Server is listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})