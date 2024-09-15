import { Navbar, Nav, Dropdown, Form, Badge, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Logo from '/assets/logo.jpeg';

function HeaderUser(refresh) {
  const [cartCount, setCartCount] = useState(0);
  const [personne, setPersonne] = useState({
    id: '',
    nom: '',
    prenom: '',
    contact: '',
    localisation: '',
    codePostal: '',
    role: { id: '', nom: '' },
    utilisateur: { id: '', email: '', password: '', isAdmin: '', pseudo: '' },
    typeProduction: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/panier/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setCartCount(response.data.data[0]);

          setPersonne(response.data.data[1]);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, [refresh]);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post('http://localhost:8080/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (response.status === 200) {
        sessionStorage.clear();
        navigate('/login');
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Navbar bg="success" expand="lg" variant="dark" fixed="top" className="py-2">
      <div className="container-fluid">
        
        {/* Logo */}
        <Navbar.Brand href="/front-end_marche/product-user/list">
          <img 
            src={Logo}
            alt="Logo"
            // width="50"
            height="50"
          />
        </Navbar.Brand>

        {/* Search Box */}
        <Form className="d-flex flex-grow-1 mx-3 justify-content-center">
          <Button variant="warning" size="sm" type="submit">
            <i className="bi bi-search"></i>
          </Button>
          <Form.Control 
            type="search" 
            placeholder="Rechercher des produits" 
            className="w-50 mx-3" 
            size="sm"
          />
        </Form>

        {/* Right Side Options */}
        <Nav className="d-flex flex-row align-items-center">
          {/* Cart */}
          <Nav.Item className="mx-2">
            <Nav.Link href="/front-end_marche/order/detail" className="text-white d-flex align-items-center">
              <i className="bi bi-cart fs-5"></i>
              <Badge bg="warning" text="dark" className="ms-1">{cartCount}</Badge>
              <div className="ms-2">Panier</div>
            </Nav.Link>
          </Nav.Item>

          {/* User Profile */}
          <Dropdown align="end" className="mx-2">
            <Dropdown.Toggle as={Nav.Link} className="text-white d-flex align-items-center">
            <i className="bi bi-person fs-3"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.ItemText>
                <span className="d-block fw-bold">{personne.prenom} {personne.nom}</span>
                <small className="text-muted">{personne.role.nom}</small>
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item href="/front-end_marche/user/profile">Mon Profil</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" onClick={handleLogout}>Se Déconnecter</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
    </Navbar>
  );
}

export default HeaderUser;
