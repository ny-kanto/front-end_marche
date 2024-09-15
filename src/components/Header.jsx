import { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '/assets/logo.jpeg';

function Header(refresh) {
  const navigate = useNavigate();

  const [personne, setPersonne] = useState({
    id: "",
    nom: "",
    prenom: "",
    contact: "",
    localisation: "",
    codePostal: "",
    role: { id: "", nom: "" },
    utilisateur: { id: "", email: "", password: "", isAdmin: "", pseudo: "" },
    typeProduction: "",
  });

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
      const response = await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        sessionStorage.clear();
        navigate("/login");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // <header
    //   className="bg-dark-subtle text-white p-3 mb-5"
    //   style={{ position: "fixed", top: 0, right: 0, left: 0, width: "100%", zIndex: "9999" }}
    // >
    //   <div className="container d-flex justify-content-between align-items-center">
    //     <h1 className="h3">LOGO</h1>
    //     <nav>
    //       <ul className="nav">
    //         <li className="nav-item">
    //           <a className="nav-link text-white" href="#" onClick={handleLogout}>
    //             <i className="fa fa-sign-out" aria-hidden="true"></i>
    //           </a>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </header>

    <Navbar
      bg="success"
      expand="lg"
      variant="dark"
      fixed="top"
      className="py-2"
    >
      <div className="container-fluid">
        {/* Logo */}
        <Navbar.Brand href="/front-end_marche/dashboard">
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
          {/* User Profile */}
          <Dropdown align="end" className="mx-2">
            <Dropdown.Toggle
              as={Nav.Link}
              className="text-white d-flex align-items-center"
            >
              <i className="bi bi-person fs-3"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.ItemText>
                <span className="d-block fw-bold">
                  {personne.prenom} {personne.nom}
                </span>
                <small className="text-muted">{personne.role.nom}</small>
              </Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item href="/front-end_marche/user/profile">
                Mon Profil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" onClick={handleLogout}>
                Se Déconnecter
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
