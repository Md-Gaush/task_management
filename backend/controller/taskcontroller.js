const todo = require('../models/taskmodel')

// craete task
const createtask =async (req,res)=>{
    const data = req.body;
    try {
        const todoTask = new todo(data)
         await todoTask.save();
         res.status(201).json({
            message:"Task is created",
            success:true
         })
    } catch (error) {
        res.status(500).json({
            message:"Failed to create task",success:false
        })
    }
}
// get all task
const fetchAllTask =async (req,res)=>{
   
    try {
        const data = await todo.find({});
        
         res.status(201).json({
            message:"all task",
            success:true,
            data
         })
    } catch (error) {
        res.status(500).json({
            message:"Failed to create task",success:false
        })
    }
}
// update task
const updateTask =async (req,res)=>{
   
    try {
        const {id} = req.params
        console.log(id);
       const body = req.body
       console.log(body)
        const data = await todo.findByIdAndUpdate(id,req.body,{new:true});
        
         res.status(200).json({
            message:"update task",
            success:true,
            data
         })
    } catch (error) {
        res.status(500).json({
            message:"Failed to update task",success:false
        })
    }
}

// detete all task
const deleteTask =async (req,res)=>{
   
    try {
        const {id} = req.params
        console.log(id);
      
        const data = await todo.findByIdAndDelete(id);
        
         res.status(200).json({
            message:"delete task",
            success:true,
            data
         })
    } catch (error) {
        res.status(500).json({
            message:"Failed to delete task",success:false
        })
    }
}



module.exports ={
    createtask,
    fetchAllTask,
    updateTask,
    deleteTask
}

