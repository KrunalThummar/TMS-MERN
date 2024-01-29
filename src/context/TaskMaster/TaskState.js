import React from 'react'
import { useState } from 'react'
import TaskContext from './TaskContext'
import Swal from 'sweetalert2'


const TaskState = (props) => {

    const host = "http://localhost:5000"
    const TaskInitial = []

    const [taskTypes, setTaskTypes] = useState(TaskInitial)
    const [activeTaskTypes, setActiveTaskTypes] = useState(TaskInitial)

        ////////////////////////////////////////////////// Get/Read/Featch All Task-Matser
        const getTask = async ()=>{
            //API call to fetch all the Task-Master
          const response = await fetch(`${host}/api/task/fetchalltask`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
          const json = await response.json();
    
          if(json.success){
    
            setTaskTypes(json.taskType);
          }
    
        }


         ////////////////////////////////////////////////// Add All Task-Matser
        const addTask = async (taskName, description, status)=>{
                    //API call to fetch all the Task-Master
                  const response = await fetch(`${host}/api/task/create`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'auth-token': localStorage.getItem('token')
                    },
                      body: JSON.stringify({taskName, description, status})
                  });
                  const json = await response.json();
        
                  if(json.success){
                    setTaskTypes(taskTypes.concat(json.taskType));
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Task has been saved',
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }else{
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Task Not Save ',
                      text: json.error,
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }
        
                  
            
        }


        ////////////////////////////////////////////////// Delete All Task-Matser
        const deleteTask = async (id)=>{
                    //API call to fetch all the Role-Master
                  const response = await fetch(`${host}/api/task/deletetask/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify()
                  });
                  // eslint-disable-next-line
                  const json =  response.json();
        
                  //Logic to delete data
                  const newTask = taskTypes.filter((taskType)=>{return taskType._id!==id});
                  setTaskTypes(newTask); 
            
        }


        ////////////////////////////////////////////////// Edit All Task-Matser
        const editTask = async (id, taskName, description, status)=>{
                    //API call to fetch all the Task-Master
                  const response = await fetch(`${host}/api/task/updatetask/${id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'auth-token': localStorage.getItem('token')
                    },
                      body: JSON.stringify({id, taskName, description, status})
                  });
                  // eslint-disable-next-line
                  const json = await response.json();
                  
                  if(json.success){
                    getTask();
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Task has been Updated',
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }else{
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Task Not Updated ',
                      text: json.error,
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }
                   
        }


         ////////////////////////////////////////////////// Get/Featch Active Task - id & taskName, description for Task-Log
         const getActiveTask = async ()=>{
          //API call to fetch all the Task-Master
        const response = await fetch(`${host}/api/task/fetchtaskname`, {
          method: 'GET',
        });
        const json = await response.json();

        if(json.success){
          setActiveTaskTypes(json.taskType)
        }
  
      }

      
  return (
    <TaskContext.Provider value={{taskTypes, getTask, addTask, deleteTask, editTask, getActiveTask, activeTaskTypes }}>
        {props.children}
    </TaskContext.Provider>
  )
}

export default TaskState
