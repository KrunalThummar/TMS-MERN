import {useState} from 'react';
import RoleMasterContext from './RoleMasterContext';
import Swal from 'sweetalert2'


const RoleMasterState = (props) => {

    const host = "http://localhost:5000"
    const RoleMatserInitial = []

    const [roleMasters, setRoleMatsers] = useState(RoleMatserInitial)
    const [activeRoles, setActiveRoles] = useState(RoleMatserInitial)
    

        ////////////////////////////////////////////////// Get/Featch All Role-Matser
        const getRoleMaster = async ()=>{
            //API call to fetch all the Role-Master
          const response = await fetch(`${host}/api/roles/fetchallroles`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          });
          const json = await response.json();
          if(json.success){
            setRoleMatsers(json.roleMaster);
          }
    
        }
        
        ////////////////////////////////////////////////// Add All Role-Matser
        const addRoleMaster = async (roleName, status)=>{
            //API call to fetch all the Role-Master
          const response = await fetch(`${host}/api/roles/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              },
              body: JSON.stringify({roleName, status})
          });
          const role = await response.json();

          if(role.success){
            setRoleMatsers(roleMasters.concat(role.roleMaster));
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Role has been saved',
              showConfirmButton: false,
              timer: 3000
            })
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Role Not Save ',
              text: role.error,
              showConfirmButton: false,
              timer: 3000
            })
          }

          
    
        }

        ////////////////////////////////////////////////// Delete All Role-Matser
        const deleteRoleMaster = async (id)=>{
            //API call to fetch all the Role-Master
          const response = await fetch(`${host}/api/roles/deleteroles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify()
          });
          // eslint-disable-next-line
          const json =  response.json();

          //Logic to delete data
          const newRole = roleMasters.filter((roleMaster)=>{return roleMaster._id!==id});
          setRoleMatsers(newRole); 
    
        }

        ////////////////////////////////////////////////// Edit All Role-Matser
        const editRoleMaster = async (id, roleName, status)=>{
            //API call to fetch all the Role-Master
          const response = await fetch(`${host}/api/roles/updateroles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              },
              body: JSON.stringify({id, roleName, status})
          });
          // eslint-disable-next-line
          const json = await response.json();
          
          if(json.success){
            getRoleMaster();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Role has been Updated',
              showConfirmButton: false,
              timer: 3000
            })
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Role Not Updated ',
              text: json.error,
              showConfirmButton: false,
              timer: 3000
            })
          }
           
        }

                ////////////////////////////////////////////////// Get/Featch Active Role-id & roleName for User-Maste
                const getActiveRole = async ()=>{
                  //API call to fetch all the Role-Master
                const response = await fetch(`${host}/api/roles/fetchactiveroles`, {
                  method: 'GET',
                });
                const json = await response.json();

                if(json.success){
                  setActiveRoles(json.roles)
                }
          
              }
              

  return (
    <RoleMasterContext.Provider value={{roleMasters, getRoleMaster, addRoleMaster, deleteRoleMaster, editRoleMaster, getActiveRole, activeRoles}} >
        {props.children}
    </RoleMasterContext.Provider>
  )
}

export default RoleMasterState
