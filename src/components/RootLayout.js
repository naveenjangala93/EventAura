import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigationbar from './Navigationbar'
import Footer from './Footer'
import './RootLayout.css'

function RootLayout() {
  return (
    <div className='page1 '>
        <Navigationbar/>
        <Outlet className="vh-100"/>
        {/* <Footer className="fixed-bottom"/> */}
    </div>
  )
}
export default RootLayout
