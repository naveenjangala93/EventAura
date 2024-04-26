import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { MdOutlineFeedback } from "react-icons/md";
import './NavigationBar.css'
function Navigationbar() {

    let navigate = useNavigate();
    const activeLink = {
        color: "black",
        fontSize: "130%"
    };
    const inactiveLink = {
        color: 'black',
        fontSize: "120%"
    };
    let [isUser, setisUser] = useState(false);
    let [ismember, setisMember] = useState(false);
    let [isadmin,setisAdmin]=useState(false);

    let logout = () => {
        localStorage.clear()
        setisUser(false)
        setisMember(false)
        setisAdmin(false)
    }
    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         // Check if the user is logged in
    //         const userLoggedIn = localStorage.getItem("username") !== null;
    //         setislogin(userLoggedIn);
    //       };

    //       // Add event listener for storage changes
    //       window.addEventListener('storage', handleStorageChange);

    //       // Initial check when the component mounts
    //       handleStorageChange();
    //       console.log(localStorage.getItem('username'))
    //       // Cleanup function to remove event listener
    //       return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //       };
    // }, [])
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        axios
            .post("http://localhost:3500/user-api/verify", { token: token })
            .then((res) => {
                if (res.data.message !== "success") {
                    localStorage.clear();
                    navigate("/");
                    setisUser(false)
                    setisMember(false)
                    setisAdmin(false)
                } else {
                    const user = localStorage.getItem("username");
                    const adminsuser=localStorage.getItem("adminusername")
                    const id= localStorage.getItem("id");
                    if (user === null && id===null)
                        setisAdmin(true);
                    else if(user===null && adminsuser===null)setisMember(true);
                    else if(id===null && adminsuser===null)setisUser(true);
                }
                // console.log(ismember)
            })
            .catch((err) => alert("Error: " + err.message));
    }, [localStorage.getItem("token")]);

    return (
        <div className=' sample  border border-dark p-2 '>
            <Navbar bg="" variant="" className='justify-content-start'>
                <div className='container '>
                    <Navbar.Brand href="/" className='hello123 fun1 fs-2 ms-0'>
                        EventAura</Navbar.Brand>
                    <Nav className="me-0 d-flex align-items-center">
                        <NavLink to="/" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5><CiHome/>Home</h5></NavLink>
                        {/* <NavLink to="/demo" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Demo</h5></NavLink> */}
                        {(!isUser && !ismember && !isadmin) &&
                            <NavLink to="/signup" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Signup</h5></NavLink>}

                        {(ismember) && <NavLink to="/committee" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Approvals</h5></NavLink>}
                        {(isadmin) && <NavLink to="/adminpanel" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>AdminPanel</h5></NavLink>}
                    
                        {(isUser || ismember||isadmin) ?
                            <NavLink to="/" className='text-danger sample1 nav-link' onClick={logout} ><h5 className=''>Logout<IoIosLogOut /></h5></NavLink>
                            : <NavLink to="/signin" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Login</h5></NavLink>}


                        {(isUser)&&<NavLink to="/feedback" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Feedback <MdOutlineFeedback /></h5></NavLink>}

                    </Nav>
                </div>
            </Navbar>
        </div>
    )
}
export default Navigationbar
