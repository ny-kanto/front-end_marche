import {  HashRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './pages/auth/SignupForm';
import LoginForm from './pages/auth/LoginForm';
import ListProduit from './pages/produit/ListProduit';
import DetailProduit from './pages/produit/DetailProduit';
import Error from './components/Error';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="https://ny-kanto.github.io/front-end_marche/login" element={<LoginForm />} />
          <Route path="https://ny-kanto.github.io/front-end_marche/" element={<LoginForm />} />
          <Route path="https://ny-kanto.github.io/front-end_marche/signup" element={<SignupForm />} />
          <Route path="https://ny-kanto.github.io/front-end_marche/product/list" element={<ListProduit />} />
          <Route path="https://ny-kanto.github.io/front-end_marche/product/:id" element={<DetailProduit />} />
          <Route path="https://ny-kanto.github.io/front-end_marche/error/403" element={<Error errorCode="403" title="Forbidden" message="Access is denied" redirectLink="https://ny-kanto.github.io/front-end_marche/login" />} />
          <Route path="*" element={<Error errorCode="404" title="Page Not Found" message="We couldn't find the page you are looking for" redirectLink="https://ny-kanto.github.io/front-end_marche/login" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
