import React from 'react'
import { Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import Project from './Project';
import RoleMasters from './RoleMasters';
import Task from './Task';
import User from './User';
import DashBoard from './DashBoard';
import TaskLog from './TaskLog';


const Home = () => {
  return (
    <>
        <NavBar/>
        <Routes>
        <Route exact path="/" element={<DashBoard/>}/>
        <Route exact path="/role" element={<RoleMasters/>}/>
        <Route exact path="/user" element={<User/>}/>
        <Route exact path="/project" element={<Project/>}/>
        <Route exact path="/task" element={<Task/>}/>
        <Route exact path="/tasklog" element={<TaskLog/>}/>
        </Routes>
      
    </>
  )
}

export default Home
