import { Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeaderHome = () => {
  return (
    <header>
      <Nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top py-2">
        <div className="container d-flex justify-content-between">
          <div>
            <NavbarBrand>
              <Link className="navbar-brand fw-bold fs-4" style={{ letterSpacing: "1px" }} to="/">Kolekta</Link>
            </NavbarBrand>
          </div>

          <div className='d-flex justify-content-center'>
            <Nav>
              <Nav.Item>
                <Nav.Link href='/front-end_marche/#home'>
                  <div className="ms-2 text-dark">Home</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/front-end_marche/#pourquoi'>
                  <div className="ms-2 text-dark">Pourquoi ?</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/front-end_marche/#categories'>
                  <div className="ms-2 text-dark">Catégories</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='/front-end_marche/#comment'>
                  <div className="ms-2 text-dark">Comment ?</div>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="ml-auto">
                <Link className="btn btn-success me-2" to='/signup'>S&apos;inscrire</Link>
                <Link className="btn btn-primary" to='/login'>Se connecter</Link>
              </div>
            </div>
          </div>
        </div>
      </Nav>
    </header>
  );
};

export default HeaderHome;
