import React from 'react'
import { useState } from 'react'
import ProjectContext from './ProjectContext'
import Swal from 'sweetalert2'

const ProjectState = (props) => {

    const host = "http://localhost:5000"
    const ProjectInitial = []

    const [projects, setProjects] = useState(ProjectInitial)
    const [activeProjects, setActiveProjects] = useState(ProjectInitial)

    ////////////////////////////////////////////////// Get/Read/Featch All Project-Matser
    const getProject = async ()=>{
        //API call to fetch all the Project-Master
      const response = await fetch(`${host}/api/project/fetchallprojects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();

      if(json.success){

        setProjects(json.projectMaster);
      }

    }


     ////////////////////////////////////////////////// Add All Project-Master
     const addProject = async (name, clientName, displayName, description, projectType, price, status)=>{
      //API call to fetch all the Project-Master
    const response = await fetch(`${host}/api/project/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
        body: JSON.stringify({name, clientName, displayName, description, projectType, price, status})
    });
    const json = await response.json();

    if(json.success){
      setProjects(projects.concat(json.projectMaster));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Project has been saved',
        showConfirmButton: false,
        timer: 2000
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Project Not Save ',
        text: json.error,
        showConfirmButton: false,
        timer: 3000
      })
    }
  }

  
      ////////////////////////////////////////////////// Delete All Project-Matser
      const deleteProject = async (id)=>{
        //API call to fetch all the Project-Master
      const response = await fetch(`${host}/api/project/deleteproject/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify()
      });
      // eslint-disable-next-line
      const json =  response.json();

      if(json.success){
          setProjects(json)
      }

      //Logic to delete data
      const newProject = projects.filter((project)=>{return project._id!==id});
      setProjects(newProject);
    

  }


        ////////////////////////////////////////////////// Edit All Project-Matser
        const editProject = async (id, name, clientName, displayName, description, projectType, price, status)=>{
          //API call to fetch all the Project-Master
            const response = await fetch(`${host}/api/project/updateproject/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              },
                body: JSON.stringify({id, name, clientName, displayName, description, projectType, price, status})
            });
              // eslint-disable-next-line
              const json = await response.json();
              
              if(json.success){
                getProject();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Project has been Updated',
                  showConfirmButton: false,
                  timer: 2000
                })
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Project Not Updated ',
                  text: json.error,
                  showConfirmButton: false,
                  timer: 3000
                })
              }
          }


          ////////////////////////////////////////////////// Get/Featch Active Project - id & name for Task-Log
          const getActiveProject = async ()=>{
            //API call to fetch all the Project-Master
          const response = await fetch(`${host}/api/project/fetchprojectname`, {
            method: 'GET',
          });
          const json = await response.json();

          if(json.success){
            setActiveProjects(json.projectMaster)
          }
    
        }


  return (
    <ProjectContext.Provider value={{projects, getProject, addProject, deleteProject, editProject, getActiveProject, activeProjects}}>
      {props.children}
    </ProjectContext.Provider>
  )
}

export default ProjectState
