import React from 'react'
import { Link, useNavigate } from "react-router-dom";


const NavBar = () => {
  let navigate = useNavigate();
  
  const handelLogOut = ()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <div className=''>

{/* <!-- ======= Header ======= --> */}
  <header id="header" className="header fixed-top d-flex align-items-center">

    <div className="d-flex align-items-center justify-content-between">
      <Link to="/" className="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt=""/>
        <span className="d-none d-lg-block">TMS</span>
      </Link>
      <i className="bi bi-list toggle-sidebar-btn"></i>
    </div>
    {/* <!-- End Logo --> */}

    <div className="search-bar">
      <form className="search-form d-flex align-items-center" method="POST" action="#">
        <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
        <button type="submit" title="Search"><i className="bi bi-search"></i></button>
      </form>
    </div>
    {/* <!-- End Search Bar --> */}

    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">

        <li className="nav-item d-block d-lg-none">
          <Link className="nav-link nav-icon search-bar-toggle" to="/search">
            <i className="bi bi-search"></i>
          </Link>
        </li>
        {/* <!-- End Search Icon--> */}

    
      </ul>
    </nav>
    
    {/* <!-- End Icons Navigation --> */}

  </header>
  {/* <!-- End Header --> */}

  {/* <!-- ======= Sidebar ======= --> */}
  <aside id="sidebar" className="sidebar">

    <ul className="sidebar-nav" id="sidebar-nav">

      <li className="nav-item">
        <Link className="nav-link " to="/">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      {/* <!-- End Dashboard Nav --> */}


      <li className="nav-item">
        <Link className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" to="/tableDropDown">
          <i className="bi bi-layout-text-window-reverse"></i><span>Tables</span><i className="bi bi-chevron-down ms-auto"></i>
        </Link>
        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/role">
              <i className="bi bi-circle"></i><span>Role Master</span>
            </Link>
          </li>
        </ul>
        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/user">
              <i className="bi bi-circle"></i><span>User Master</span>
            </Link>
          </li>
        </ul>
        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/project">
              <i className="bi bi-circle"></i><span>Project Master</span>
            </Link>
          </li>
        </ul>
        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/task">
              <i className="bi bi-circle"></i><span>Task Type</span>
            </Link>
          </li>
        </ul>
        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="/tasklog">
              <i className="bi bi-circle"></i><span>Task Log</span>
            </Link>
          </li>
        </ul>
      </li>
      {/* <!-- End Tables Nav --> */}



      <li className="nav-heading">Pages</li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="users-profile.html">
          <i className="bi bi-person"></i>
          <span>Profile</span>
        </Link>
      </li>
      {/* <!-- End Profile Page Nav --> */}

      {/* <!-- End Login Page Nav --> */}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/login" onClick={handelLogOut}>
        <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </Link>
      </li>
      {/* <!-- End Logout Page Nav --> */}





    </ul>

  </aside>
  {/* <!-- End Sidebar--> */}

    </div>
  
  )
}

export default NavBar
