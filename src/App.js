
import React, { useState } from 'react'

import Home from './components/Home'
import RootLayout from './components/RootLayout'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Book from './components/Book'
import Committee from './components/Committee'
import Signup from './components/Signup'
import Signin from './components/Signin'

function App() {
  
  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        {
          path:'/signin',
          element:<Signin/>
        },
        {
          path:'/book',
          element:<Book/>
        },
        {
          path:'/committee',
          element:<Committee />
        }
      ]
    }
  ])
  return (
    <div className=''>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
