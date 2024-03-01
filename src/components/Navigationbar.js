import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LoginContext } from './LoginContext';
function Navigationbar() {
    let [currentUserStatus, loggedInUser, loginUser, loginErr,logoutuser]=useContext(LoginContext)

    const activeLink = {
        color: "black",
        fontSize: "130%"
    };
    const inactiveLink = {
        color: 'green',
        fontSize: "120%"
    };


    return (
        <div className=' sample bg-opacity-50'>
            <Navbar bg="" variant="" className=''>
                <div className='container '>
                    <Navbar.Brand href="#home"><img src='https://i.etsystatic.com/9917841/r/il/83c4b0/906026129/il_570xN.906026129_2y2a.jpg'
                        className='rounded-5' width={90} /></Navbar.Brand>
                    <Nav className="me-0 d-flex align-items-center">
                        <NavLink to="/" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Home</h5></NavLink>
                        <NavLink to="/signup" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Signup</h5></NavLink>
                        {currentUserStatus?
                        <NavLink to="/" className='text-danger' onClick={logoutuser}><h5>Logout</h5></NavLink>
                        :<NavLink to="/signin" className='nav-link' style={({ isActive }) => { return isActive ? activeLink : inactiveLink }}><h5>Login</h5></NavLink>}
                 

                    </Nav>
                </div>
            </Navbar>
        </div>
    )
}

export default Navigationbar