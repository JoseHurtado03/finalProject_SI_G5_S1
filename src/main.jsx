import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router.jsx'
import {RouterProvider} from 'react-router-dom';
import { UserContextProvider } from './context/user.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
 
    <UserContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>,
   

)