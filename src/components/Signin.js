import React, { useContext, useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import './Signin.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signin() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  let [err, setErr] = useState("");
  let addNewUser = (newUser) => {
   // console.log(newUser)
    axios.post("http://localhost:3500/user-api/signin", newUser)
        .then((res) => {
            console.log(res);
            if (res.status === 201) {
                   localStorage.setItem("token", res.data.token)
                    localStorage.setItem("username",res.data.username)
                    localStorage.setItem("useremail",res.data.email)
                setErr("");
                navigate("/")
            }
            else if(res.status==200)
            {
                setErr(res.data.message);
            }
        })
    .catch(err => {
        console.log(err);
        if (err.response) {
            setErr(err.message)
        }
        else if (err.request) {
            setErr(err.message)
        }
    })
  }
  return (
    <div className='container'>
      <div className='row '>
        {err.length? <h5 color='red' className='text-center text-danger'>{err}</h5> : ""}
        <div className='  col-sm-8 col-md-4 mx-auto   p-3 mb-5 mt-4 test rounded-4 p-4 ' >
          <h1 className='text-center fun1'>Login</h1>
          <br></br>
          <form className=' border-dark ' onSubmit={handleSubmit(addNewUser)}>
            <div className='input-group'>
              <span className='input-group-text'><FaUser /></span>
              < div className='form-floating'>
                <input
                  type="text"
                  className='form-control'
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
              <div className='logins'>
              <div >
                <h5 className='test1'>Admin</h5>
              <Link to="/adminlogin" ><img src="https://tse1.mm.bing.net/th?id=OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa&pid=Api&P=0&h=180"className='admin' /></Link><br></br>
              <br></br>
              </div>
              <div>
                <h5 className='test1'>Member</h5>
              <Link to="/login"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXrZ-9oNeGvIzM1setjvCI2KxW7MZTTXsylA&usqp=CAU" className='admin'/></Link><br></br>
              </div>
              </div>
              <br></br>
                  <button className='btn btn-primary sample123 '>Signin</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Signin