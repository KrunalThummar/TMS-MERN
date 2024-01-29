import React, { useContext, useEffect, useRef, useState } from 'react'
import roleMasterContext from '../context/RoleMaster/RoleMasterContext';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';

const RoleMasters = (props) => {
    const context = useContext(roleMasterContext);
    const {getRoleMaster, roleMasters, addRoleMaster, deleteRoleMaster, editRoleMaster} = context

    const [role, setRole] = useState({id: "", roleName: "", status: false})
    const [forEdit, setForEdit] = useState(false);


    let navigate = useNavigate();


    useEffect(()=>{
      if(localStorage.getItem('token')){
        getRoleMaster();
      }else{
        navigate("/login")
      }
      // eslint-disable-next-line
    }, [])


    const handleSaveRole = (e)=>{
        
        e.preventDefault();
        if(!forEdit){

            addRoleMaster(role.roleName, role.status);
            
        }else{

            editRoleMaster(role.id, role.roleName, role.status);
            
        }
        setRole({roleName: "", status: false})
        closeRef.current.click()
        // props.showAlert("Role Added Successfully", "success");
        
    }

    const handleToggle = ()=>{
        setRole({...role, status: !role.status})
    }

    const handleAddClick = (e)=>{
        e.preventDefault();
        ref.current.click();
        setRole({roleName: "", status: false})
        setForEdit(false)
        
    }
 

    const handleDeleteClick = (roleMaster)=>{
        

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
                    deleteRoleMaster(roleMaster._id)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Role has been Deleted',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    
                }
          })
    }

    const handleEditClick = (currentRole)=>{
        ref.current.click();
        setRole({id: currentRole._id, roleName: currentRole.roleName, status: currentRole.status, createdBy: currentRole.createdBy})
        setForEdit(true);
    }

    const ref = useRef(null)
    const closeRef = useRef(null)

    const onChange = (e)=>{
        setRole({...role, [e.target.name]: e.target.value})
    }



  return (
    <>
    
        {/* ////////////////////////////////////  View Role  ////////////////////////////// */}
        <main id="main" className="main">

            <div className="pagetitle">
                <h1>Role Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item">Tables</li>
                    <li className="breadcrumb-item active">Role</li>
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
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                    {/* <th scope="col">created By</th> */}
                                    <th scope="col">Updated On</th>
                                    <th scope="col">Updated By</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                
                                {roleMasters.map((roleMaster, i)=>{
                                    return <tr key={roleMaster._id}>
                                    <th scope="row" >{i+1}</th>
                                    <td>{roleMaster.roleName}</td>
                                    <td>{roleMaster.status ? <i className='ri-checkbox-circle-fill fs-4' style={{color: '#00D100'}}></i> : <i className="ri-close-circle-line fs-4" style={{color: '#E32227'}}></i> } </td>
                                    {/* <td>{roleMaster.createdBy.fullName}</td> */}
                                    <td>{roleMaster.updatedOn}</td>
                                    { roleMaster.updatedBy ? <td>{roleMaster.updatedBy.fullName}</td> : <td>{roleMaster.createdBy.fullName}</td>  }
                                    <td><i className="ri-edit-2-line fs-4 mx-2" style={{color: '#035CA3'}} onClick={()=>{handleEditClick(roleMaster)}}></i> <i className="ri-delete-bin-2-line fs-4" style={{color: '#BF181D'}} onClick={()=>{handleDeleteClick(roleMaster)}}></i></td>
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
                    <h5 className="modal-title">{forEdit ? 'Edit Role' : 'Add New Role'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='container my-3'>
                    <form className="my-3">
                        <div className="mb-3">
                        <label htmlFor="roleName" className="form-label">Role Name</label>
                        <input type="text" className="form-control" id="roleName" name="roleName" value={role.roleName} onChange={onChange} />
                        </div>

                        {/* <div className="mb-3 form-check form-switch">
                        <label htmlFor="status" className="form-label" >Status</label>
                        {/* <input type="text" className="form-control" id="status" name="status" value={role.status} onChange={onChange} /> */}
                        {/* <input className="form-check-input form-control" type="checkbox" id="status" name="status" value={role.status} onChange={onChange} role="switch" /> */}
                        {/* <input className="form-check-input" type="checkbox" role="switch" id="status" name="status" value={role.status} onChange={onChange} /> */}
                        {/* </div> */} 
                        
                        <div className="mb-3 form-check form-switch">
                        <label htmlFor="status" className="form-check-label" >Status</label>
                        <input className="form-check-input form-control" type="checkbox" role="switch" id="status" name="status" checked={role.status}  onChange={handleToggle}/>
                        <p>{role.status}</p>
                        </div>
                        
                    </form>
                </div>
                </div>
                <div className="modal-footer">
                    <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={role.roleName.length<1 || role.roleName.length>=50} type="submit" className="btn btn-primary" onClick={handleSaveRole}>{forEdit ? 'Save Edit Role' : 'Save Role'}</button>
                </div>
                </div>
            </div>
        </div>



        {/* //////////////////////////////////// Delete Role  //////////////////////////// */}
       
                                    {/* Swal - Sweet Alert 2 */}
                                



    </>
  )
}

export default RoleMasters
