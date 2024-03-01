import React, { useContext, useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { LoginContext } from './LoginContext';
import './Signin.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signin() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  let [currentUserStatus, loggedInUser, loginUser, loginErr] = useContext(LoginContext);
  let [err, setErr] = useState("");
  let addNewUser = (newUser) => {
    // console.log(newUser)
    // axios.post("http://localhost:3500/user-api/signin", newUser)
    //     .then((res) => {
    //         console.log(res);
    //         if (res.status == 201) {
    //             setErr("");
    //             navigate("/")
    //         }
    //         else if(res.status==200)
    //         {
    //             setErr(res.data.message);
    //         }
    //     })
    // .catch(err => {
    //     console.log(err);
    //     if (err.response) {
    //         setErr(err.message)
    //     }
    //     else if (err.request) {
    //         setErr(err.message)
    //     }
    // })
    loginUser(newUser);
  }
  useEffect(() => {
    if (currentUserStatus === true)
      navigate("/");
  }, [currentUserStatus])


  return (

    <div className='container'>
      <div className='row '>
        {loginErr.length ? <h5 color='red' className='text-center text-danger'>{loginErr}</h5> : ""}
        <div className='col-sm-4 mx-auto   p-3 mb-5 border border-dark ' >
          <h1 className='text-center'>Sign in</h1>
          <br></br>
          <form className=' border-dark ' onSubmit={handleSubmit(addNewUser)}>
            <div className='input-group'>
              <span className='input-group-text'><FaUser /></span>
              < div className='form-floating'>
                <input
                  type="text"
                  className='form-control  '
                  placeholder="Enter your Name"
                  {...register('username', { required: true })}
                />
                <label htmlFor="">Enter username</label>
              </div>
            </div>
            {errors.username?.type == "required" && <p className='text-danger'>*Username is required</p>}
            <br></br>
            <div className='input-group'>
              <span className='input-group-text'><FaLock /></span>
              <div className='form-floating'>
                <input
                  type="password"
                  className='form-control  '
                  placeholder="Enter your password"
                  {...register('password', { required: true })}
                />
                <label htmlFor=''>Enter ur password</label>
              </div>

            </div>
            {errors.password?.type == "required" && <p className='text-danger'>*Password is required</p>}
            <br></br>
              <Link to="/login">Login as Member</Link>
            <button className='btn btn-primary sample123'>Signin</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin