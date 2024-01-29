import React, { useEffect, useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectContext from '../context/ProjectMaster/ProjectContext'
import Swal from 'sweetalert2'


const Project = () => {

    const context = useContext(ProjectContext)
    const {projects, getProject, addProject, deleteProject, editProject} = context

    const [project, setProject] = useState({id: "", name: "", clientName: "", displayName: "", description: "", projectType: "", price: "", status: false })
    const [forEdit, setForEdit] = useState(false);


    let navigate = useNavigate();


    useEffect(()=>{
      if(localStorage.getItem('token')){
        getProject();
      }else{
        navigate("/login")
      }
      // eslint-disable-next-line
    }, [])


    const handleAddIcon = (e)=>{
        e.preventDefault();
        ref.current.click();
        setProject({name: "", clientName: "", displayName: "", description: "", projectType: "", price: "", status: false });
        setForEdit(false)
    }

    const handleStatusToggle = ()=>{
        setProject({...project, status: !project.status})
    }

    const handleSaveProject = (e)=>{
        e.preventDefault();
       
        if(!forEdit){
            addProject(project.name, project.clientName, project.displayName,project.description, project.projectType, project.price, project.status, );
        }else{
            editProject(project.id ,project.name, project.clientName, project.displayName,project.description, project.projectType, project.price, project.status, );
        }
        setProject({name: "", clientName: "", displayName: "", description: "", projectType: "", price: "", status: false })
        closeRef.current.click();

    }

    const handleDeleteUser = (project)=>{
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
                deleteProject(project._id)
                // eslint-disable-next-line
                {/* onClick={()=>{deleteUser(user._id)}} */} 
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Project has been Deleted',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    
                }
          })
    }

    const handleEditUser = (currentProject)=>{
        ref.current.click();
        setProject({id: currentProject._id, name: currentProject.name, clientName: currentProject.clientName, displayName: currentProject.displayName,
            description: currentProject.description, projectType: currentProject.projectType, price: currentProject.price, status: currentProject.status,  createdBy: currentProject.createdBy})
        setForEdit(true);
    }

    const handleProjectType = (projectType)=>{
        setProject({...project, projectType})
    }

    const ref = useRef(null)
    const closeRef = useRef(null)

    const onChange = (e)=>{
        setProject({...project, [e.target.name]: e.target.value})
    }

  return (
    <>
    s
                 {/* ////////////////////////////////////  View Users  ////////////////////////////// */}
      <main id="main" className="main">

<div className="pagetitle">
    <h1>Project Tables</h1>
    <nav>
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item">Tables</li>
        <li className="breadcrumb-item active">Project</li>
        </ol>
    </nav>
    {/* </div><!-- End Page Title --> */}

    <section className="section">
        <div className="d-flex">
            <div className="card " style={{width: '100%'}}>
                <div className="card-body " >
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5 className="card-title ">  </h5>
                        <i className="ri-add-circle-fill fs-2" style={{color: '#088FFA'}} onClick={handleAddIcon}></i>
                    </div>
               



                {/* <!-- Table with stripped rows --> */}
                <table className="table table-striped text-center">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">Display Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Project Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update On</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {projects.map((project, i)=>{
                        return <tr key={project._id}>
                        <th scope="row" >{i+1}</th>
                        <td>{project.name}</td>
                        <td>{project.clientName}</td>
                        <td>{project.displayName}</td>
                        <td>{project.description}</td>
                        <td>{project.projectType}</td>
                        <td>{project.price}</td>
                        <td>{project.status ? <i className='ri-checkbox-circle-fill fs-4' style={{color: '#00D100'}}></i> : <i className="ri-close-circle-line fs-4" style={{color: '#E32227'}}></i> } </td>
                        <td>{project.updatedOn}</td>
                        { project.updatedBy ? <td>{project.updatedBy.fullName}</td> : <td>{project.createdBy.fullName}</td>  }
                        <td><i className="ri-edit-2-line fs-4 mx-2" style={{color: '#035CA3'}} onClick={()=>{handleEditUser(project)}}></i> <i className="ri-delete-bin-2-line fs-4" style={{color: '#BF181D'}} onClick={()=>{handleDeleteUser(project)}}></i></td>
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
            <div className="modal-dialog modal-dialog-centered" style={{maxWidth: '60%'}}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{forEdit ? 'Edit Project' : 'Add New Project'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='container my-3'>
                    <form className="my-3">
                        <div className='d-flex'>

                            <div className="mb-3 me-4">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={project.name} onChange={onChange}/>
                            </div>

                            <div className="mb-3 me-4">
                                <label htmlFor="clientName" className="form-label">Client Name</label>
                                <input type="text" className="form-control" id="clientName" name="clientName" value={project.clientName} onChange={onChange}/>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="displayName" className="form-label">Display Name</label>
                                <input type="text" className="form-control" id="displayName" name="displayName" value={project.displayName} onChange={onChange}/>
                            </div>

                        </div>
                        
                        

                        <div className='mb-3'>
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea type="text" className="form-control" id="description" name="description" value={project.description} onChange={onChange} style={{height: "100px"}}></textarea>                           
                        </div>     

                        
                        
                        

                        <div className='d-flex justify-content-center'>
                        <fieldset className="me-5 ">
                        <legend className="col-form-label pt-0" >Project Type</legend>
                        <div className="d-flex">
                            <div className="form-check me-2">
                            <input className="form-check-input" type="radio" name="projectType" id="projectTypeHourly" onClick={()=>{handleProjectType("hourly")}} />
                            <label className="form-check-label" htmlFor="projectType">
                                Hourly
                            </label>
                            </div>
                            <div className="form-check me-2">
                            <input className="form-check-input" type="radio" name="projectType" id="projectTypeMonthly" onClick={()=>{handleProjectType("monthly")}}/>
                            <label className="form-check-label" htmlFor="projectType">
                                Monthly
                            </label>
                            </div>
                            <div className="form-check me-2">
                            <input className="form-check-input" type="radio" name="projectType" id="projectTypeFixed"  onClick={()=>{handleProjectType("fixed")}}/>
                            <label className="form-check-label" htmlFor="projectType">
                                Fixed
                            </label>
                            </div>
                        </div>
                        </fieldset>
                        
                            <div className="mb-3 me-5">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={project.price} onChange={onChange}/>
                            </div>

                            <div className="m-auto mx-5 form-check form-switch">
                                <label htmlFor="status" className="form-check-label" >Status</label>
                                <input className="form-check-input form-control" type="checkbox" role="switch" id="status" name="status" checked={project.status} onChange={handleStatusToggle}/>
                            </div>
                        </div>
                        
                    </form>
                </div>
                </div>
                <div className="modal-footer">
                    <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={handleSaveProject}>{forEdit ? 'Save Edit Project' : 'Save Project'}</button>
                </div>
                </div>
            </div>
        </div>



         {/* //////////////////////////////////// Delete Role  //////////////////////////// */}
       
                    {/* Swal - Sweet Alert 2 */}

    </>
  )
}

export default Project
