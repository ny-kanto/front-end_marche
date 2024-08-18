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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/product/list" element={<ListProduit />} />
          <Route path="/product/:id" element={<DetailProduit />} />
          <Route path="/error/403" element={<Error errorCode="403" title="Forbidden" message="Access is denied" redirectLink="/login" />} />
          <Route path="*" element={<Error errorCode="404" title="Page Not Found" message="We couldn't find the page you are looking for" redirectLink="/login" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
