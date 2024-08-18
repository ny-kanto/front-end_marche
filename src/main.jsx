import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './pages/auth/LoginForm.jsx'
import SignupForm from './pages/auth/SignupForm.jsx'
import ListProduit from './pages/produit/ListProduit.jsx'
import DetailProduit from './pages/produit/DetailProduit.jsx'
import Error from './components/Error.jsx'

const router = createHashRouter([
  {
    path: "/front-end_marche/",
    element: <LoginForm />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "product/list",
        element: <ListProduit />,
      },
      {
        path: "product/:id",
        element: <DetailProduit />,
      },
      {
        path: "error/403",
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
