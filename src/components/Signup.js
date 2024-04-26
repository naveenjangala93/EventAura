import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'
//import './Signup.css'
<FaUser />
function Signup() {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    let [err, setErr] = useState("");
    let addNewUser = (newUser) => {
        console.log(newUser)
        axios.post("http://localhost:3500/user-api/signup", newUser)
            .then((res) => {
                console.log(res);
                if (res.status == 201) {
                    setErr("");
                    navigate("/signin")
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
         {err.length?<h5 color='red' className='text-center text-danger'>{err}</h5>:""}
            <div className='row  '>
                <div className='col-sm-4 mx-auto  mt-3 rounded-4 test  mt-5 p-3 mb-5 ' >
                    <h1 className='text-center fun1 mb-3'>Sign Up</h1>
                    <form onSubmit={handleSubmit(addNewUser)}>
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
                            <span className='input-group-text'><TfiEmail /></span>

                            <div className='form-floating'>
                                <input
                                    type="email"
                                    className='form-control '
                                    placeholder="Enter your email"
                                    {...register('email', { required: true })}
                                />
                                <label htmlFor="">Enter ur email id</label>
                            </div>
                           
                        </div>
                        {errors.email?.type == "required" && <p className='text-danger'>*Email is required</p>}
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
                        <button type="submit" className="btn btn-success">Signup</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Signup








