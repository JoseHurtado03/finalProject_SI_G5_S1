import { createBrowserRouter } from 'react-router-dom';

import MainPage from './view/PaginaPrincipal';
import GroupPage from './view/PaginaGrupo';
import Sign from './view/SignIn';
import Login from "./view/LogIn"


export const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage></MainPage>,
    },
    {
        path: '/GroupPage/:id',
      element: <GroupPage></GroupPage>

    },
    {
      path: `/SignIn`,
      element:<Sign></Sign>

    },{
      path: `/Login`,
      element:<Login></Login>

    }


  ]);