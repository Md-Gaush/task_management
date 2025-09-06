const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
   taskName:{
    type:String,
    required:true
   },
   isDone:{
    type:Boolean,
    required:true
   },
  })


  const todo = mongoose.model('todo',TaskSchema)

  module.exports = todo