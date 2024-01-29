import React from 'react'
import { useState } from 'react'
import UserContext from './UserContext'
import Swal from 'sweetalert2'


const UserState = (props) => {

    const host = "http://localhost:5000"
    const UserInitial = []

    const [users, setUsers] = useState(UserInitial)
    const [activeUsers, setActiveUsers] = useState(UserInitial)

            ////////////////////////////////////////////////// Get/Read/Featch All User-Matser
            const getUser = async ()=>{
                //API call to fetch all the USer-Master
              const response = await fetch(`${host}/api/user/fetchalluser`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                },
              });
              const json = await response.json();
              if(json.success){

                setUsers(json.users);
              }
        
            }

      
      ////////////////////////////////////////////////// Add All User-Master
      const addUser = async (fullName, email, password, RoleId, isLeader, status)=>{
          //API call to fetch all the User-Master
        const response = await fetch(`${host}/api/user/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
            body: JSON.stringify({fullName, email, password, RoleId, isLeader, status})
        });
        const json = await response.json();

        if(json.success){
          setUsers(users.concat(json.user));
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
        const deleteUser = async (id)=>{
                //API call to fetch all the User-Master
              const response = await fetch(`${host}/api/user/deleteusers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify()
              });
              // eslint-disable-next-line
              const json =  response.json();

              if(json.success){
                  setUsers(json)
              }
    
              //Logic to delete data
              const newUser = users.filter((user)=>{return user._id!==id});
              setUsers(newUser); 
        
      }

      
      ////////////////////////////////////////////////// Edit All Role-Matser
        const editUser = async (id, fullName, email, RoleId, isLeader, status)=>{
          //API call to fetch all the Role-Master
            const response = await fetch(`${host}/api/user/updateuser/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              },
                body: JSON.stringify({id, fullName, email, RoleId, isLeader, status})
            });
              // eslint-disable-next-line
              const json = await response.json();
              
              if(json.success){
                getUser();
                  Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'User has been Updated',
                  showConfirmButton: false,
                  timer: 2000
                })
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'User Not Updated ',
                  text: json.error,
                  showConfirmButton: false,
                  timer: 3000
                })
              }
          }       


          ////////////////////////////////////////////////// Get/Featch Active User - id & fullName for Task-Log
          const getActiveUser = async ()=>{
            //API call to fetch all the User-Master
          const response = await fetch(`${host}/api/user/fetchusername`, {
            method: 'GET',
          });
          const json = await response.json();

          if(json.success){
            setActiveUsers(json.user)
          }
    
        } 
            
  return ( 
    <UserContext.Provider value={{users, getUser, addUser, deleteUser, editUser, getActiveUser, activeUsers}}>
       {props.children}
    </UserContext.Provider>
  )
}

export default UserState
