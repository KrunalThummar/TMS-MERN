import React, { useState } from 'react'
import TaskLogContext from './TaskLogContext'
import Swal from 'sweetalert2'


const TaskLogState = (props) => {

  const host = "http://localhost:5000"
  const TaskLogInitial = []

  const [taskLogs, setTaskLogs] = useState(TaskLogInitial)

              ////////////////////////////////////////////////// Get/Read/Featch All Task-Matser
              const getTaskLog = async ()=>{
                //API call to fetch all the Task-Master
              const response = await fetch(`${host}/api/tasklog/fetchalltasklogs`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
              });
              const json = await response.json();
              if(json.success){

                setTaskLogs(json.tasklog);
              }
        
            }


              ////////////////////////////////////////////////// Add All User-Master
              const addTaskLog = async (userId, projectId, taskTypeId, workDescription, estHours, actualHours, taskCompletionNote, anyDispute, anyDelay)=>{
                //API call to fetch all the User-Master
              const response = await fetch(`${host}/api/tasklog/create`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
                  body: JSON.stringify({userId, projectId, taskTypeId, workDescription, estHours, actualHours, taskCompletionNote, anyDispute, anyDelay})
              });
              const json = await response.json();

              if(json.success){
                setTaskLogs(taskLogs.concat(json.tasklog));
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'User has been saved',
                  showConfirmButton: false,
                  timer: 2000
                })
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'User Not Save ',
                  text: json.error,
                  showConfirmButton: false,
                  timer: 3000
                })
              }

              

            }


              ////////////////////////////////////////////////// Delete All Role-Matser
              const deleteTaskLog = async (id)=>{
                //API call to fetch all the User-Master
              const response = await fetch(`${host}/api/tasklog/deletetasklog/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify()
              });
              // eslint-disable-next-line
              const json =  response.json();

              if(json.success){
                  setTaskLogs(json)
              }

              //Logic to delete data
              const newTasklog = taskLogs.filter((tasklog)=>{return tasklog._id!==id});
              setTaskLogs(newTasklog); 
        
            }


            ////////////////////////////////////////////////// Edit All Task Log
            const editTaskLog = async (id, userId, projectId, taskTypeId, workDescription, estHours, actualHours, taskCompletionNote, anyDispute, anyDelay)=>{
              //API call to fetch all the Task Log
                const response = await fetch(`${host}/api/tasklog/updatetasklog/${id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                  },
                    body: JSON.stringify({id, userId, projectId, taskTypeId, workDescription, estHours, actualHours, taskCompletionNote, anyDispute, anyDelay})
                });
                  // eslint-disable-next-line
                  const json = await response.json();
                  if(json.success){
                    getTaskLog();
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Task Log has been Updated',
                      showConfirmButton: false,
                      timer: 2000
                    })
                  }else{
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Task Log Not Updated ',
                      text: json.error,
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }
    
            } 

  return (
    <TaskLogContext.Provider value={{taskLogs, getTaskLog, addTaskLog, deleteTaskLog, editTaskLog}}>
      {props.children}
    </TaskLogContext.Provider>
  )
}

export default TaskLogState
