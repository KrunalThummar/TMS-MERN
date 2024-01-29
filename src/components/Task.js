import React, { useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TaskContext from '../context/TaskMaster/TaskContext'
import Swal from 'sweetalert2'


const Task = (props) => {
    const context = useContext(TaskContext)
    const {taskTypes, getTask, addTask, deleteTask, editTask} = context


    const [task, setTask] = useState({id: "", taskName: "", description: "", status: false })
    const [forEdit, setForEdit] = useState(false);


    let navigate = useNavigate();


    useEffect(()=>{
      if(localStorage.getItem('token')){
        getTask();
      }else{
        navigate("/login")
      }
      // eslint-disable-next-line
    }, [])
    

    const handleAddClick = (e)=>{
        e.preventDefault();
        ref.current.click();
        setTask({taskName: "", description: "", status: false })
        setForEdit(false)
        
    }

    const handleToggle = ()=>{
        setTask({...task, status: !task.status})
    }

    const handleSaveRole = (e)=>{
        
        e.preventDefault();
    if(!forEdit){
        addTask(task.taskName, task.description, task.status);
    }else{

        editTask(task.id, task.taskName, task.description, task.status);
        
    }
        
        setTask({taskName: "", description:"", status: false })
        closeRef.current.click()
        
    }
    
    const handleDeleteClick = (taskType)=>{
        

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
                    deleteTask(taskType._id)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Task has been Deleted',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    
                }
          })
    }

    const handleEditClick = (currentTask)=>{
        ref.current.click();
        setTask({id: currentTask._id, taskName: currentTask.taskName, description: currentTask.description, status: currentTask.status,  createdBy: currentTask.createdBy})
        setForEdit(true);
    }



    const ref = useRef(null)
    const closeRef = useRef(null)

    const onChange = (e)=>{
        setTask({...task, [e.target.name]: e.target.value})
    }


  return (
    <>
    
                {/* ////////////////////////////////////  View Task  ////////////////////////////// */}
                <main id="main" className="main">

<div className="pagetitle">
    <h1>Task Table</h1>
    <nav>
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Table</Link></li>
        <li className="breadcrumb-item">Tables</li>
        <li className="breadcrumb-item active">Task</li>
        </ol>
    </nav>
    {/* </div><!-- End Page Title --> */}

    <section className="section">
        <div className="d-flex">
            <div className="card " style={{width: '100%'}}>
                <div className="card-body " >
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5 className="card-title ">  </h5>
                        <i className="ri-add-circle-fill fs-2" style={{color: '#088FFA'}} onClick={handleAddClick}></i>
                    </div>
               



                {/* <!-- Table with stripped rows --> */}
                <table className="table table-striped text-center">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">created On</th> */}
                        <th scope="col">Updated On</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {taskTypes.map((taskType, i)=>{
                        return <tr key={taskType._id}>
                        <th scope="row" >{i+1}</th>
                        <td>{taskType.taskName}</td>
                        <td>{taskType.description}</td>
                        <td>{taskType.status ? <i className='ri-checkbox-circle-fill fs-4' style={{color: '#00D100'}}></i> : <i className="ri-close-circle-line fs-4" style={{color: '#E32227'}}></i> } </td>
                        <td>{taskType.updatedOn}</td>
                        { taskType.updatedBy ? <td>{taskType.updatedBy.fullName}</td> : <td>{taskType.createdBy.fullName}</td>  }
                        <td><i className="ri-edit-2-line fs-4 mx-2" style={{color: '#035CA3'}} onClick={()=>{handleEditClick(taskType)}}></i> <i className="ri-delete-bin-2-line fs-4" style={{color: '#BF181D'}} onClick={()=>{handleDeleteClick(taskType)}}></i></td>
                    </tr>
                    })}
                    

                    </tbody>
                </table>
                {/* <!-- End Table with stripped rows --> */}

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
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{forEdit ? 'Edit Task' : 'Add New Task'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='container my-3'>
                    <form className="my-3">
                        <div className="mb-3">
                        <label htmlFor="taskName" className="form-label">Task Name</label>
                        <input type="text" className="form-control" id="taskName" name="taskName" value={task.taskName} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={task.description} onChange={onChange} style={{height: "100px"}}></textarea>                           

                        </div>
                        
                        <div className="mb-3 form-check form-switch">
                        <label htmlFor="status" className="form-check-label" >Status</label>
                        <input className="form-check-input form-control" type="checkbox" role="switch" id="status" name="status" checked={task.status}  onChange={handleToggle}/>
                        <p>{task.status}</p>
                        </div>
                        
                    </form>
                </div>
                </div>
                <div className="modal-footer">
                    <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={task.taskName.length<1 || task.taskName.length>=50} type="submit" className="btn btn-primary" onClick={handleSaveRole}>{forEdit ? 'Save Edit Task' : 'Save Task'}</button>
                </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Task
