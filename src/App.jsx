import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import ListProduit from './pages/produit/ListProduit';
import DetailProduit from './pages/produit/DetailProduit';
import Error from './components/Error';
import Entree from './pages/produit/Entree';
import EtatStock from './pages/produit/EtatStock';
import ListProduitUser from './pages/produit/ListProduitUser';
import DetailProduitUser from './pages/produit/DetailProduitUser';
import OrderList from './pages/produit/OrderList';
import UserProfile from './pages/utilisateur/UserProfile';
import Statistique from './pages/dashboard/Statistique';

function App() {

  return (
    <>
      <Router basename="/front-end_marche/">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/product-stock/entree" element={<Entree />} />
          <Route path="/product-stock/etat" element={<EtatStock />} />
          <Route path="/dashboard" element={<Statistique />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/product/list" element={<ListProduit />} />
          <Route path="/product-user/list" element={<ListProduitUser />} />
          <Route path="/product-user/:id" element={<DetailProduitUser />} />
          <Route path="/order/detail" element={<OrderList />} />
          <Route path="/product/:id" element={<DetailProduit />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/error/403" element={<Error errorCode="403" title="Forbidden" message="Access is denied" redirectLink="/front-end_marche/login" />} />
          {/* <Route path="*" element={<Error errorCode="404" title="Page Not Found" message="We couldn't find the page you are looking for" redirectLink="/login" />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;
