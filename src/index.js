import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


import App from './App';
import More from './More';


const root = ReactDOM.createRoot(document.getElementById('root'));
let allRout= createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
{
  path:'app/:id',
  element:<More/>
}

])
root.render(
  <React.StrictMode>
    <RouterProvider router={allRout} />
  </React.StrictMode>
);

