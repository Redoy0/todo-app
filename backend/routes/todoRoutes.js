const express = require("express");
const Todo = require("../models/Todo.js");

const router = express.Router();

// create
router.post("/",async (req,res)=>{
    //Todo.create(req.body)
    const todo= await Todo.create(req.body);
    res.status(201).json(todo);
});

// read
router.get("/",async (req,res)=>{
    //Todo.find()
    const todos= await Todo.find();
    res.status(200).json(todos);
})

// update
router.put("/:id",async (req,res)=>{
    //Todo.findByIdAndUpdate(req.params.id,res.body,{new:true})
    const updated = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updated);
}
)

// delete
router.delete("/:id",async (req,res)=>{
    //Todo.findByIdAndDelete(req.params.id)
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Deleted"});
})

module.exports = router;