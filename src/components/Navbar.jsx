import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="app-menu navbar-menu">
      {/* LOGO */}
      <div className="navbar-brand-box">
        {/* Dark Logo*/}
        <NavLink to="./index.html" className="logo logo-dark">
          <span className="logo-sm">
            <img src="./assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="./assets/logo-dark.png" alt="" height="40" />
          </span>
        </NavLink>
        {/* Light Logo */}
        <NavLink to="./index.html" className="logo logo-light">
          <span className="logo-sm">
            <img src="./assets/images/logo-sm.png" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="./assets/logo-light.png" alt="" height="40" />
          </span>
        </NavLink>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">
              <i className="ri-more-fill"></i>{" "}
              <span data-key="t-pages">Pages</span>
            </li>

            <li className="nav-item">
              <a
                className="nav-link menu-link"
                href="#sidebarPages"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarPages"
              >
                <i className="ri-pages-line"></i>{" "}
                <span data-key="t-pages">Classements</span>
              </a>
              <div className="collapse menu-dropdown" id="sidebarPages">
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item">
                    <NavLink
                      to="./user/classement/list"
                      className="nav-link"
                      data-key="t-starter"
                    >
                      Général
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="./user/classement-etape/list"
                      className="nav-link"
                      data-key="t-starter"
                    >
                      Étape
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="./user/classement-equipe/list"
                      className="nav-link"
                      data-key="t-starter"
                    >
                      Équipe
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <NavLink to="./user/etape/list" className="nav-link menu-link">
                <i className="ri-file-list-3-line"></i>{" "}
                <span data-key="t-forms">Étapes</span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* Sidebar */}
      </div>

      <div className="sidebar-background"></div>
    </div>
  );
}

export default Navbar;
