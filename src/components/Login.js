import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import './Login.css';
import { LoginContext } from './LoginContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    let { register, handleSubmit, formState: { errors } } = useForm();
    let [currentUserStatus, loggedInUser, loginUser, loginErr] = useContext(LoginContext)
    function submitForm(memberObj) {
        loginUser(memberObj)
    }

    useEffect(() => {
        console.log(currentUserStatus)
        console.log(loggedInUser)
        if (currentUserStatus == true) {
            navigate('/committee')
        }
    }, [currentUserStatus])
    return (

        <div className='login1 border'>
            <h1 className='text-center mt-5 mb-3 w3 text-bold'>Glorious Event Planners and Designers!!</h1>
            <div className="container mt-5 d-flex align-items-center  ">
                <div className="row d-flex justify-content-around w-100 mt-5">
                    <div className="col-md-9 col-lg-6 col-xl-5 text-center">
                        <img src="https://i.etsystatic.com/9917841/r/il/83c4b0/906026129/il_570xN.906026129_2y2a.jpg"
                            className="img-fluid rounded-2 w-75" alt="Sample image" />
                    </div>

                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        {(loginErr.length != 0) && <p className='lead text-danger text-center fs-3'>{loginErr}</p>}
                        <form onSubmit={handleSubmit(submitForm)} className='mt-5'>
                            {/* {err.length != 0 && <p className='text-danger'>*Invalid ID or Password</p>} */}
                            <div className="form-outline mb-4 mt-4">
                                <input type="text" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter Member ID" {...register('MemberID', { required: true })} />
                                {errors.memberID?.type == 'required' && <p className='text-danger'>*This field is required</p>}
                            </div>


                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" {...register('Password', { required: true })} />
                                {errors.password?.type == 'required' && <p className='text-danger'>*This field is required</p>}
                            </div>

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" for="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <Button className="btn btn-primary" type='submit'
                                >Login</Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login