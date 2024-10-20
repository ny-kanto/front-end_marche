import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-success text-white text-center p-3 mt-auto w-100" style={{ bottom: 0, left: 0, right: 0 }}>
      <div className="container">
        <p className="mb-0">
          &copy; 2024 Kolekta. Tous droits réservés.
        </p>
        <p className="mb-0">
          <a href="#" className="text-white">
            Politique de confidentialité
          </a>{" "}
          |
          <a href="#" className="text-white">
            {" "}
            Termes et conditions
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
