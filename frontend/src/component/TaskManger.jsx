import React, { useEffect, useState } from 'react'
import {FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash} from "react-icons/fa";
import {ToastContainer} from 'react-toastify'
import axios from 'axios';
import {toast} from "react-toastify"

const TaskManger = () => {
    const [input,setInput] = useState("");
    const [task,setTask] = useState([]);
    const [copyTask,setCopyTask] = useState([]);
    const [updateTask,setUpdateTask] = useState(null);


    // tostify
    const notify = (message,type)=>{
      toast[type](message)
    }

    const handleAddTask = ()=>{
      if(updateTask && input){
        //update api call
        const item = {
          taskName:input,
          isDone:updateTask.isDone,
          _id :updateTask._id
        }
        handleUpdateItem(item);
        console.log("update api call")
        setInput("")
      }else if(updateTask === null && input){
        // create api
        console.log("create api call")
        handleTask();
      }
    }

    useEffect(()=>{
       if(updateTask){
        setInput(updateTask.taskName)
       }
    },[updateTask])

    const handleTask = async() =>{
        const obj = {
            taskName : input,
            isDone : false
        }
        try {
            const response = await axios.post('http://localhost:8000/task', obj );
            // console.log('User created:', response.data);
            const {success,message} = response.data
            if(success){
              notify(message,"success")
            }else{
              notify(message,"error")
            }
            setInput('')
            getAll()
          } catch (error) {
            console.log('Error:', error.response?.data || error.message);
            notify("failed to create task","error")
          }
    }
     
    const getAll = async()=>{
      
      try {
        const response = await axios.get('http://localhost:8000/task');
            const data = response.data.data
            console.log("data",data)
            setTask(data);
            setCopyTask(data);
      } catch (error) {
       
      }
    }

    useEffect(()=>{
        getAll()
    },[])

   // handleDeleteTAsk
   
   const handleDeleteTAsk = async(id)=>{
       
    try {
          const res = await axios.delete(`http://localhost:8000/task/${id}`);
          const { success, message } = res.data;
  
           if (success) {
             notify(message, "success");
          } else {
             notify(message || "Failed to delete task", "error");
          }
          getAll()
           } catch (error) {
              notify("Failed to delete task", "error");
            console.error(error);
         }
       }

    // update task with check box
    const handleUpdateTask = async(item)=>{
       const {_id,isDone,taskName} = item
       const obj = {
        taskName:taskName,
        isDone:!isDone
       }
      try {
            const res = await axios.put(`http://localhost:8000/task/${_id}`,obj);
            const { success, message } = res.data;
    
             if (success) {
               notify(message, "success");
            } else {
               notify(message || "Failed to update task", "error");
            }
            getAll()
             } catch (error) {
                notify("Failed to update task", "error");
              console.error(error);
           }
         }
         // update task

         const handleUpdateItem =async (item)=>{
          const {_id,isDone,taskName} = item
          const obj = {
           taskName:taskName,
           isDone:isDone
          }
         try {
               const res = await axios.put(`http://localhost:8000/task/${_id}`,obj);
               const { success, message } = res.data;
       
                if (success) {
                  notify(message, "success");
               } else {
                  notify(message || "Failed to update task", "error");
               }
               getAll()
                } catch (error) {
                   notify("Failed to update task", "error");
                 console.error(error);
              }
         }

         // search 
         const handleSearch = (e)=>{
           const term = e.target.value.toLowerCase();
           const oldTasks = [...copyTask]
           const results = oldTasks.filter((item)=>item.taskName.toLowerCase().includes(term));
           setTask(results);
         }

  return (
    <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
      <h1 className='mb-4'>Task Manger App</h1>
      {/*Input and search Box  */}
    <div className='d-flex justify-content-between align-items-center mb-4 w-100 '>
    <div className='input-group flex-grow-1 me-2'>
        <input 
        
        className='from-control me-1'
        placeholder='Add New Task'
        type='text'
        onChange={(e)=>setInput(e.target.value)}
        value={input}
        />
        <button 
        onClick={handleAddTask}
        className='btn btn-success btn-sm me-2'>
            <FaPlus className='m-2'/>
            </button>
      </div>
      <div className='input-group flex-grow-1'>
          <input 
        onChange={handleSearch}
        className='from-control'
        type='text' placeholder='Search Task'/>
         <span className='input-group-text'><FaSearch/></span>
      </div>
    </div>
    {/*list of items  */}
    <div className='d-flex flex-column w-100'>
    
    {
      task.map((item,i)=>(
        <div className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center'key={i}>
        <span className={item.isDone? 'text-decoration-line-through':""}>
           {item.taskName}
        </span>
        <div className=''>
           <button 
           onClick={()=>handleUpdateTask(item)}
           className='btn btn-success btn-sm me-2'
           type='button'
            ><FaCheck/></button>
             <button 
             onClick={()=>setUpdateTask(item)}
           className='btn btn-primary btn-sm me-2'
           type='button'
            ><FaPencilAlt/></button>
             <button 
             onClick={()=>handleDeleteTAsk(item._id)}
           className='btn btn-danger btn-sm me-2'
           type='button'
            ><FaTrash/></button>
        </div>
       </div>
      ))
    }

    </div>

    {/*tostify  */}
    <ToastContainer
        position='top-right'
        autoClose = {3000}
    />
    </div>
  )
}

export default TaskManger