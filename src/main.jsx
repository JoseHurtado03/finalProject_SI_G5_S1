import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router.jsx'
import {RouterProvider} from 'react-router-dom';
import UserProvider from './Provider/UserProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
 
    <UserProvider>
    <RouterProvider router={router}></RouterProvider>
    </UserProvider>,
   

)