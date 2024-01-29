import React, { useEffect, useContext, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserMaster/UserContext';
import Swal from 'sweetalert2'
import roleMasterContext from '../context/RoleMaster/RoleMasterContext';

const User = (props) => {
    const userContext = useContext(UserContext);
    const roleContext = useContext(roleMasterContext);
    const {users, getUser, addUser, deleteUser, editUser} = userContext
    const {getActiveRole, activeRoles} = roleContext

    const [user, setUser] = useState({id: "", fullName: "", email: "", password: "", RoleId: "", isLeader: false, status: false })
    const [forEdit, setForEdit] = useState(false);


    let navigate = useNavigate();


    useEffect(()=>{
      if(localStorage.getItem('token')){
        getUser();
        getActiveRole();
      }else{
        navigate("/login")
      }
      // eslint-disable-next-line
    }, [])

        
        const handleChange = event => {
        // user.RoleId(event.target.value);
        setUser({...user, [event.target.name]: event.target.value})
        };

    // useEffect(()=>{
    //     getUser();
    //     getActiveRole();
    // },[])

    const handleAddIcon = (e)=>{
        e.preventDefault();
        ref.current.click();
        setUser({fullName: "", email: "", password: "", RoleId: "", isLeader: false, status: false});
        setForEdit(false)
    }

    const handleStatusToggle = ()=>{
        setUser({...user, status: !user.status})
    }

    const handleLeaderToggle = ()=>{
        setUser({...user, isLeader: !user.isLeader})
    }

    const handleSaveUser = (e)=>{
        e.preventDefault();
        if(!forEdit){
            addUser(user.fullName, user.email, user.password, user.RoleId, user.isLeader, user.status);
        }else{
            editUser(user.id, user.fullName, user.email, user.RoleId, user.isLeader, user.status);
        }
        setUser({fullName: "", email: "", password: "", RoleId: "", isLeader: false, status: false})
        closeRef.current.click();

    }

    const handleDeleteUser = (user)=>{
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
                deleteUser(user._id)
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

    const handleEditUser = (currentUser)=>{
        ref.current.click();
        setUser({id: currentUser._id, fullName: currentUser.fullName, email: currentUser.email, password: currentUser.password, RoleId: currentUser.RoleId._id, isLeader: currentUser.isLeader, status: currentUser.status,  createdBy: currentUser.createdBy})
        setForEdit(true);
    }
 
    const ref = useRef(null)
    const closeRef = useRef(null)


    const onChange = (e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

  return (
    <>
    
      {/* ////////////////////////////////////  View Users  ////////////////////////////// */}
      <main id="main" className="main">

<div className="pagetitle">
    <h1>User Tables</h1>
    <nav>
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item">Tables</li>
        <li className="breadcrumb-item active">User</li>
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
                        <th scope="col">Email</th>
                        {/* <th scope="col">Password</th> */}
                        <th scope="col">Role Name</th>
                        <th scope="col">Leader</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update On</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {users.map((user, i)=>{
                        return <tr key={user._id}>
                        <th scope="row" >{i+1}</th>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        {/* <td>{user.password}</td> */}
                        <td>{user.RoleId.roleName}</td>
                        <td>{user.isLeader ? <i className='ri-bookmark-3-fill fs-3' style={{color: '#0476D0'}}></i> : <i className="ri-briefcase-2-line fs-4" style={{color: '#024376'}}></i> } </td>
                        <td>{user.status ? <i className='ri-checkbox-circle-fill fs-4' style={{color: '#00D100'}}></i> : <i className="ri-close-circle-line fs-4" style={{color: '#E32227'}}></i> } </td>
                        <td>{user.updatedOn}</td>
                        { user.updatedBy ? <td>{user.updatedBy.fullName}</td> : <td>{user.createdBy.fullName}</td>  }
                        <td><i className="ri-edit-2-line fs-4 mx-2" style={{color: '#035CA3'}} onClick={()=>{handleEditUser(user)}}></i> <i className="ri-delete-bin-2-line fs-4" style={{color: '#BF181D'}} onClick={()=>{handleDeleteUser(user)}}></i></td>
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
                    <h5 className="modal-title">{forEdit ? 'Edit User' : 'Add New User'}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='container my-3'>
                    <form className="my-3">
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="fullName" name="fullName" value={user.fullName} onChange={onChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={onChange}/>
                        </div>
                        {forEdit ? "" :
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={onChange}/>
                        </div> 
                        }
                        
                        <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Role</label>
                            <div className="col-sm-10">
                                <select className="form-select" aria-label="Default select example" name='RoleId' value={user.RoleId} onChange={handleChange}>
                                    <option> --- Select Role ---</option>
                                {activeRoles.map(role => (
                                <option key={role._id} value={role._id}>
                                    {role.roleName}
                                </option>
                                ))}
                                </select>
                            </div>
                        </div>


                        <div className='d-flex justify-content-center'>
                            <div className="mb-3 form-check form-switch">
                                <label htmlFor="leader" className="form-check-label" >Leader</label>
                                <input className="form-check-input form-control" type="checkbox" role="leader" id="leader" name="leader" checked={user.isLeader}  onChange={handleLeaderToggle}/>
                            </div>
                            <div className="mb-3 mx-5 form-check form-switch">
                                <label htmlFor="status" className="form-check-label" >Status</label>
                                <input className="form-check-input form-control" type="checkbox" role="switch" id="status" name="status" checked={user.status}  onChange={handleStatusToggle}/>
                            </div>
                        </div>
                        
                    </form>
                </div>
                </div>
                <div className="modal-footer">
                    <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" onClick={handleSaveUser}>{forEdit ? 'Save Edit User' : 'Save User'}</button>
                </div>
                </div>
            </div>
        </div>


        {/* //////////////////////////////////// Delete Role  //////////////////////////// */}
       
                                    {/* Swal - Sweet Alert 2 */}
    </>
  )
}

export default User
