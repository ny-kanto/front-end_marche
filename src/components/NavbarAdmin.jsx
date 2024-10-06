import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "../assets/navbar.css";

function NavbarAdmin() {
  const location = useLocation();

  return (
    <div className="sidebar p-4">
      <div className="menu-section">
        <h6 className="menu-title text-uppercase">Menu</h6>
        <ul className="navbar-nav">
          <li className="nav-item mb-2">
            <a
              href="/front-end_marche/admin-dashboard"
              className={`nav-link d-flex align-items-center ${location.pathname === "/admin-dashboard" ? "active" : ""
                }`}
            >
              <i className="ri-dashboard-line me-3"></i> Dashboard
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarAdmin;
