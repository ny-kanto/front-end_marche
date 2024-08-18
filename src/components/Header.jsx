import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookie from 'js-cookies';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const token = Cookie.getItem("token");
      const response = await axios.post('https://back-endmarche-production.up.railway.app/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (response.status === 200) {
        Cookie.removeItem("token");
        Cookie.removeItem("email");
        navigate('/login');
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <header
      className="bg-dark-subtle text-white p-3 mb-5"
      style={{ position: "fixed", top: 0, right: 0, left: 0, width: "100%", zIndex: "9999" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3">LOGO</h1>
        <nav>
          <ul className="nav">
            {/* <li className="nav-item">
              <a className="nav-link text-white" href="#">
                <i className="fa fa-cart-plus"></i>
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link text-white" href="#" onClick={handleLogout}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
