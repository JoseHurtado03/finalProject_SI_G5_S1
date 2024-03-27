import { createBrowserRouter } from 'react-router-dom';

import MainPage from './view/PaginaPrincipal';
import GroupPage from './view/PaginaGrupo';
import Sign from './view/SignIn';
import Login from "./view/LogIn"
import PerfilUsuario from "./view/PerfilUsuario"
import Search from './view/Search'
import Paypal from "./Components/paypal"
import Admin from './view/Admin';

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

    },

    {
      path: '/PefilUsuario',
      element: <PerfilUsuario></PerfilUsuario>
    },

    {
      path: '/Search',
      element: <Search></Search>
    },
    {
      path: '/Admin',
      element: <Admin></Admin>
    },



  ]);