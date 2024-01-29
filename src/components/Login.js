import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'



const Login = (props) => {

    const[credentials, setCredential] = useState({email: "", password: ""})
    let navigate = useNavigate(); 

    const handelSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password:credentials.password})
          });
          const json = await response.json()
              
            if(json.success){
                //Save the Auth Token and then Redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/") 
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'LoggedIn Successfully',
                  showConfirmButton: false,
                  timer: 2000
                })
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Login Fail ',
                  text: json.error,
                  showConfirmButton: false,
                  timer: 3000
                })
              }
    }

    const onChange = (e)=>{
        setCredential({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div>
          <main>
    <div className="container">

      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div className="d-flex justify-content-center py-3">
                <Link to="/login" className="logo d-flex align-items-center w-auto">
                  <img src="assets/img/logo.png" alt=""/>
                  <span className="d-none d-lg-block">TMS</span>
                </Link>
              </div>
              {/* <!-- End Logo --> */}

              <div className="card mb-3">

                <div className="card-body">

                  <div className="">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p className="text-center small">Enter your email & password to login</p>
                  </div>

                  <form className="row g-3 needs-validation" onSubmit={handelSubmit}>

                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">Email</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email"  className="form-control" id="email" name="email" placeholder="name@example.com"  value={credentials.email} onChange={onChange}required/>
                        <div className="invalid-feedback">Please enter your email.</div>
                      </div>
                    </div>

                    <div className="col-12 mb-2">
                      <label htmlFor="yourPassword" className="form-label">Password</label>
                      <input type="password"  className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} required/>
                      <div className="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">Login</button>
                    </div>
                    
                  </form>

                </div>
              </div>

              

            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
  {/* <!-- End #main --> */}
    </div>
  )
}

export default Login
