import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TaskLogContext from '../context/TaskLog/TaskLogContext';
import UserContext from '../context/UserMaster/UserContext';
import ProjectContext from '../context/ProjectMaster/ProjectContext'
import TaskContext from '../context/TaskMaster/TaskContext'
import Swal from 'sweetalert2'



const TaskLog = () => {

  const taskLogContext = useContext(TaskLogContext)
  const userContext = useContext(UserContext);
  const projectContext = useContext(ProjectContext);
  const taskContext = useContext(TaskContext);
  
  const {taskLogs, getTaskLog, addTaskLog, deleteTaskLog, editTaskLog } = taskLogContext
  const {getActiveUser, activeUsers} = userContext
  const {getActiveProject, activeProjects} = projectContext
  const {getActiveTask, activeTaskTypes} = taskContext

  const[taskLog, setTaskLog] = useState({id: "", date: "", userId: "",  projectId: "", taskTypeId: "", workDescription: "", estHours: "", actualHours: "", taskCompletionNote: "", anyDispute: false, anyDelay: false })
  const [forEdit, setForEdit] = useState(false);

  let navigate = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getTaskLog();
      getActiveUser();
      getActiveProject();
      getActiveTask();
    }else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])


    const handleAnyDisputeToggle = ()=>{
        setTaskLog({...taskLog, anyDispute: !taskLog.anyDispute})
    }

    const handleAnyDelayToggle = ()=>{
        setTaskLog({...taskLog, anyDelay: !taskLog.anyDelay})
    }


  const handleChange = event => {
    // taskLog.userId(event.target.value);
    setTaskLog({...taskLog, [event.target.name]: event.target.value})
    // console.log(event.target.value)
    };


    const handleAddIcon = (e)=>{
        e.preventDefault();
        ref.current.click();
        setTaskLog({date: "", userId: "",  projectId: "", taskTypeId: "", workDescription: "", estHours: "", actualHours: "", taskCompletionNote: "", anyDispute: false, anyDelay: false});
        setForEdit(false)
    }

    const handleSaveUser = (e)=>{
        e.preventDefault();
        if(!forEdit){
            addTaskLog(taskLog.userId, taskLog.projectId, taskLog.taskTypeId, taskLog.workDescription, taskLog.estHours, taskLog.actualHours, taskLog.taskCompletionNote, taskLog.anyDispute, taskLog.anyDelay);
        }else{
            editTaskLog(taskLog.id, taskLog.userId, taskLog.projectId, taskLog.taskTypeId, taskLog.workDescription, taskLog.estHours, taskLog.actualHours, taskLog.taskCompletionNote, taskLog.anyDispute, taskLog.anyDelay);
        }
        setTaskLog({date: "", userId: "",  projectId: "", taskTypeId: "", workDescription: "", estHours: "", actualHours: "", taskCompletionNote: "", anyDispute: false, anyDelay: false})
        closeRef.current.click();

    }

    const handleDeleteTaskLog = (taskLog)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
              if(result.isConfirmed){
                deleteTaskLog(taskLog._id)
                // eslint-disable-next-line
                {/* onClick={()=>{deleteUser(user._id)}} */} 
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User has been Deleted',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    
                }
          })
    }

    const handleEditTaskLog = (currentTaskLog)=>{
        ref.current.click();
        setTaskLog({id: currentTaskLog._id, userId: currentTaskLog.userId._id, projectId: currentTaskLog.projectId._id, taskTypeId: currentTaskLog.taskTypeId._id, workDescription: currentTaskLog.workDescription, estHours: currentTaskLog.estHours,  actualHours: currentTaskLog.actualHours, taskCompletionNote: currentTaskLog.taskCompletionNote, anyDispute: currentTaskLog.anyDispute, anyDelay: currentTaskLog.anyDelay})
        setForEdit(true);
    }

const ref = useRef(null)
const closeRef = useRef(null)


const onChange = (e)=>{
  setTaskLog({...taskLog, [e.target.name]: e.target.value})
}
  return (
    <>
    
      {/* ////////////////////////////////////  View Users  ////////////////////////////// */}
      <main id="main" className="main">

<div className="pagetitle">
  <h1>Task Logs</h1>
    <nav>
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item">Tables</li>
        <li className="breadcrumb-item active">Task-Logs</li>
        </ol>
    </nav>
    {/* </div><!-- End Page Title --> */}


    <section className="section">
        <div className="d-flex ">
            <div className="card " >
                <div className="card-body " >
                    <div className='d-flex justify-content-between align-items-center position-relative mb-5'>
                        <i className="ri-add-circle-fill fs-2 position-absolute top-0 end-0" style={{color: '#088FFA'}} onClick={handleAddIcon}></i>
                    </div>
               


                <div style={{height: '455px', width: '100%', overflowY: 'auto'}}>

                    {/* <!-- Table with stripped rows --> */}
                <table className="table table-striped text-center">
                    <thead>
                    <tr className=''>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">User Name</th>
                        {/* <th scope="col">Leader</th> */}
                        <th scope="col">Project Name</th>
                        <th scope="col">Task Name</th>
                        {/* <th scope="col">Task Des.</th> */}
                        <th scope="col">Work Des.</th>
                        <th scope="col">Est. Hours</th>
                        <th scope="col">Actual Hours</th>
                        <th scope="col">Task Comp. Note</th>
                        <th scope="col">Any Disput</th>
                        <th scope="col">Any Delay</th>
                        <th scope="col">Update On</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {taskLogs.map((taskLog, i)=>{
                        return <tr key={taskLog._id}>
                        <th scope="row" >{i+1}</th>
                        <td>{taskLog.date}</td>
                        <td>{taskLog.userId.fullName}</td>
                        {/* <td>{taskLog.leaderId.isLeader ? <i className='ri-bookmark-3-fill fs-3' style={{color: '#0476D0'}}></i> : <i className="ri-briefcase-2-line fs-4" style={{color: '#024376'}}></i>}</td> */}
                        <td>{taskLog.projectId.name}</td>
                        <td>{taskLog.taskTypeId.taskName}</td>
                        {/* <td>{taskLog.taskDescription.description}</td>  */}
                        <td>{taskLog.workDescription}</td>
                        <td>{taskLog.estHours}</td>
                        <td>{taskLog.actualHours}</td>
                        <td>{taskLog.taskCompletionNote}</td>
                        <td>{taskLog.anyDispute ? <i className="ri-bug-line fs-4" style={{color: '#E32227'}}></i> : <i className='ri-thumb-up-fill fs-4' style={{color: '#00D100'}}></i> }</td>
                        <td>{taskLog.anyDelay ? <i className="ri-chat-history-line fs-4" style={{color: '#E32227'}}></i> : <i className='ri-github-fill fs-4' style={{color: '#00D100'}}></i> }</td>
                        
                        
                        <td>{taskLog.updatedOn}</td>
                        { taskLog.updatedBy ? <td>{taskLog.updatedBy.fullName}</td> : <td>{taskLog.createdBy.fullName}</td>  }
                        <td><i className="ri-edit-2-line fs-4 mx-2" style={{color: '#035CA3'}} onClick={()=>{handleEditTaskLog(taskLog)}}></i> <i className="ri-delete-bin-2-line fs-4" style={{color: '#BF181D'}} onClick={()=>{handleDeleteTaskLog(taskLog)}}></i></td>
                    </tr>
                    })}  

                    </tbody>
                </table>
                {/* <!-- End Table with stripped rows --> */}

                </div>
                

                </div>
            </div>
        </div>
    </section>
</div>
</main>


        {/* //////////////////////////////////// Add & Edit Role  //////////////////////////// */}

        <button ref={ref} type="button" className="btn btn-primary d-none" style={{marginLeft: "500px"}} data-bs-toggle="modal" data-bs-target="#roleModal">
            Launch demo modal
        </button>

        <div className="modal" id="roleModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" style={{maxWidth: '50%'}}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{forEdit ? 'Edit Task Log' : 'Add New Task Log'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='container my-3'>
                    <form className="my-3">
                        

                        <div className='row'>

                        <div className="col mb-3">
                        <label className="col-form-label">User</label>
                            <div className="">
                                <select className="form-select" aria-label="Default select example" name='userId' value={taskLog.userId} onChange={handleChange}>
                                    <option> --- Select User ---</option>
                                {activeUsers.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.fullName}
                                </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="col mb-3">
                        <label className="col-form-label">Project</label>
                            <div className="">
                                <select className="form-select" aria-label="Default select example" name='projectId' value={taskLog.projectId} onChange={handleChange}>
                                    <option> --- Select Project ---</option>
                                {activeProjects.map(project => (
                                <option key={project._id} value={project._id}>
                                    {project.name}
                                </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="col mb-3">
                        <label className=" col-form-label">Task</label>
                            <div className="">
                                <select className="form-select" aria-label="Default select example" name='taskTypeId' value={taskLog.taskTypeId} onChange={handleChange}>
                                    <option> --- Select Task ---</option>
                                {activeTaskTypes.map(taskType => (
                                <option key={taskType._id} value={taskType._id}>
                                    {taskType.taskName}
                                </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        
                        </div>


                        

                        <div className='mb-3'>
                            <label htmlFor="workDescription" className="form-label">Work Description</label>
                            <textarea type="text" className="form-control" id="workDescription" name="workDescription" value={taskLog.workDescription} onChange={onChange} style={{height: "100px"}}></textarea>                           
                        </div>

                        <div className="mb-3">
                            <label htmlFor="taskCompletionNote" className="form-label">Task Completion Note</label>
                            <input type="text" className="form-control" id="taskCompletionNote" name="taskCompletionNote" value={taskLog.taskCompletionNote} onChange={onChange} style={{height: "50px"}}/>
                        </div>

                        

                        <div className='d-flex justify-content-center mb-3'>

                            <div className="mb-3 me-5">
                                    <label htmlFor="estHours" className="form-label">Est. Hours</label>
                                    <input type="number" min="0" max="12" className="form-control" id="estHours" name="estHours" value={taskLog.estHours} onChange={onChange}/>
                                    <small>Office hours are 9am to 5pm</small>
                            </div>
                            <div className="mb-3 me-5">
                                    <label htmlFor="actualHours" className="form-label">Actual Hours</label>
                                    <input type="number" min="0" max="12" className="form-control" id="actualHours" name="actualHours" value={taskLog.actualHours} onChange={onChange}/>
                                    <small>Office hours are 9am to 5pm</small>
                            </div>

                        </div>

                        

                        <div className='d-flex justify-content-center'>
                            <div className="mb-3 form-check form-switch">
                                <label htmlFor="anyDispute" className="form-check-label" >Any Dispute</label>
                                <input className="form-check-input form-control" type="checkbox" role="switch" id="anyDispute" name="anyDispute" checked={taskLog.anyDispute}  onChange={handleAnyDisputeToggle}/>
                            </div>
                            <div className="mb-3 mx-5 form-check form-switch">
                                <label htmlFor="anyDelay" className="form-check-label" >Any Delay</label>
                                <input className="form-check-input form-control" type="checkbox" role="switch" id="anyDelay" name="anyDelay" checked={taskLog.anyDelay}  onChange={handleAnyDelayToggle}/>
                            </div>
                        </div>
                        
                    </form>
                </div>
                </div>
                <div className="modal-footer">
                    <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={handleSaveUser}>{forEdit ? 'Save Edit Task Log' : 'Save Task Log'}</button>
                </div>
                </div>
            </div>
        </div>




       
        {/* //////////////////////////////////// Delete Role  //////////////////////////// */}
       
                                    {/* Swal - Sweet Alert 2 */}
    </>
  )
}

export default TaskLog
