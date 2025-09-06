const { createtask,fetchAllTask,updateTask,deleteTask } = require("../controller/taskcontroller");

const router = require("express").Router()


// to get the all task
router.get('/',fetchAllTask);


// create task
router.post('/',createtask)

// update task
router.put('/:id',updateTask)

// delete task
router.delete('/:id',deleteTask)


module.exports = router