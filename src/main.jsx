import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './pages/auth/LoginForm.jsx'
import SignupForm from './pages/auth/SignupForm.jsx'
import ListProduit from './pages/produit/ListProduit.jsx'
import DetailProduit from './pages/produit/DetailProduit.jsx'
import Error from './components/Error.jsx'

const router = createBrowserRouter([
  {
    path: "/front-end_marche/",
    element: <LoginForm />,
    children: [
      {
        path: "/front-end_marche/login",
        element: <LoginForm />,
      },
      {
        path: "/front-end_marche/signup",
        element: <SignupForm />,
      },
      {
        path: "/front-end_marche/product/list",
        element: <ListProduit />,
      },
      {
        path: "/front-end_marche/product/:id",
        element: <DetailProduit />,
      },
      {
        path: "/front-end_marche/error/403",
        element: <Error errorCode="403" title="Forbidden" message="Access is denied" redirectLink="/front-end_marche/login" />,
      },
      {
        path: "*",
        element: <Error errorCode="404" title="Page Not Found" message="We couldn't find the page you are looking for" redirectLink="/front-end_marche/login" />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
