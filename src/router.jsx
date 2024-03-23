import { createBrowserRouter } from 'react-router-dom';

import MainPage from './view/PaginaPrincipal';
import GroupPage from './view/PaginaGrupo';


export const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage></MainPage>,
    },
    {
        path: '/GroupPage/:id',
      element: <GroupPage></GroupPage>

    }
  ]);