import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../../components/Footer";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "nykantorandri@gmail.com",
    password: "123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://localhost:8080/rest/auth/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("email", response.data.email);

        if (response.data.role === "USER_ACHETEUR") {
          navigate("/product-user/list");
        } else if (response.data.role === "USER_VENDEUR") {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("Une erreur est survenue lors de la connexion.");
        }
        console.error("Login Error: ", error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-5 mb-5 d-flex justify-content-center">
        <div
          className="col-md-6 mt-5 p-5"
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-5">
              <div className="row g-3 mt-1">
                <div className="col-md-12">
                  <div className="form-floating form-floating-outline">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="email">E-mail</label>
                  </div>
                </div>
              </div>

              <div className="row g-3 mt-1">
                <div className="col-md-12">
                  <div className="input-group input-group-merge">
                    <div className="form-floating form-floating-outline">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="password">Mot de passe</label>
                    </div>
                    <span
                      className="input-group-text"
                      onClick={toggleShowPassword}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}

            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn btn-primary">
                SE CONNECTER
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center mt-4">
            <div>
              <small>Pas encore de compte ?</small>
              <a href="/front-end_marche/signup"> S&apos;inscrire</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginForm;
