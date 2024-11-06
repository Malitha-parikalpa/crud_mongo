const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT||3000


//schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
    timestamps : true
})

const usertModel = mongoose.model("user",schemaData)

//read
//http://localhost:3000/
app.get("/",async(req,res)=>{
    const data = await usertModel.find({})

    res.json({success: true, data : data})
    })

//create data 
//http://localhost:3000/create
/*
{
    name;
    email,
    mobile
}
*/
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new usertModel(req.body)
    await data.save()
    res.send({success : true, message : "data save successfully",data : data}) 
})


//update data
//http://localhost:3000/update
/*
    id : " "
    name : " "
    email : " "
    mobile : ""
*/

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body
    const data = await usertModel.updateOne({_id :_id},rest)
    res.send({success : true, message:"data update succesfully",data : data})
})


//delete api
//http://localhost:3000/delete/id 
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id) 
    const data = await usertModel.deleteOne({_id : id}) 
    res.send({success : true, message:"data delete succesfully",data : data})
}
)






mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{
    console.log("Connect to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))



 
