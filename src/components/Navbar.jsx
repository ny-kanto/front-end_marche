import { useState } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "../assets/navbar.css";

function Navbar() {
  const [isStockOpen, setIsStockOpen] = useState(false);

  const location = useLocation();

  const toggleStock = () => {
    setIsStockOpen(!isStockOpen);
  };

  return (
    <div className="sidebar p-4">
      <div className="menu-section">
        <h6 className="menu-title text-uppercase">Menu</h6>
        <ul className="navbar-nav">
          <li className="nav-item mb-2">
            <a
              href="/front-end_marche/dashboard"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/dashboard" ? "text-warning" : ""
              }`}
            >
              <i className="ri-dashboard-line me-3"></i> Dashboards
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              href="#"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/apps" ? "active" : ""
              }`}
            >
              <i className="ri-apps-2-line me-3"></i> Apps
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              href="#"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/layouts" ? "active" : ""
              }`}
            >
              <i className="ri-layout-grid-line me-3"></i> Layouts
              <span className="badge bg-danger ms-2">Hot</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="menu-section mt-4">
        <h6 className="menu-title text-uppercase">Pages</h6>
        <ul className="navbar-nav">
          <li className="nav-item mb-2">
            <a
              href="/front-end_marche/product/list"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/product/list"
                  ? "text-warning"
                  : ""
              }`}
            >
              <i className="ri-pages-line me-3"></i> Produits
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              className="nav-link d-flex align-items-center"
              href="#"
              role="button"
              onClick={toggleStock}
            >
              <i className="ri-file-list-3-line me-3"></i> Stock
              <i
                className={`ri-arrow-${
                  isStockOpen ? "up" : "down"
                }-s-line ms-auto`}
              ></i>
            </a>

            <div
              className={`menu-dropdown ${isStockOpen ? "show" : ""}`}
              style={{ paddingLeft: "20px" }}
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item mb-2">
                  <a
                    href="/front-end_marche/product-stock/entree"
                    className={`nav-link ${
                      location.pathname === "/product-stock/entree"
                        ? "text-warning"
                        : ""
                    }`}
                  >
                    - Entrée
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    href="/front-end_marche/product-stock/etat"
                    className={`nav-link ${
                      location.pathname === "/product-stock/etat"
                        ? "text-warning"
                        : ""
                    }`}
                  >
                    - Etat de stock
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item mb-2">
            <a
              href="#"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/landing" ? "active" : ""
              }`}
            >
              <i className="ri-global-line me-3"></i> Landing
            </a>
          </li>
        </ul>
      </div>

      <div className="menu-section mt-4">
        <h6 className="menu-title text-uppercase">Components</h6>
        <ul className="navbar-nav">
          <li className="nav-item mb-2">
            <a
              href="#"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/base-ui" ? "active" : ""
              }`}
            >
              <i className="ri-shape-line me-3"></i> Base UI
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              href="#"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/advance-ui" ? "active" : ""
              }`}
            >
              <i className="ri-stack-line me-3"></i> Advance UI
            </a>
          </li>
          <li className="nav-item mb-2">
            <a
              href="#"
              className={`nav-link d-flex align-items-center ${
                location.pathname === "/widgets" ? "active" : ""
              }`}
            >
              <i className="ri-pantone-line me-3"></i> Widgets
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
