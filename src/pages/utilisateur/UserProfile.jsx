import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import HeaderUser from '../../components/HeaderUser';

const UserProfile = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="mb-5">
        <HeaderUser />
      </div>
      <div className="container mt-5 mb-5">
        <div className="">
          <div className="card-header d-flex justify-content-between align-items-center bg-light mb-5" style={{
            border: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "20px 20px 20px 20px",
            borderRadius: "10px"
          }}>
            <div>
              <h2 className="mb-0">Ny Kanto RANDRIA</h2>
              <p className="text-muted">Date d&apos;inscription : Janvier 2023</p>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" style={{
                  border: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}>
                  <div className="card-body">
                    <div className='mb-4'>
                      <h5 className="text-uppercase" style={{ fontSize: "17px", letterSpacing: "1px", marginBottom: "10px", opacity: "0.6" }}>À propos</h5>
                      <p><strong>Nom:</strong> RANDRIA</p>
                      <p><strong>Prénom:</strong> Ny Kanto</p>
                      <p><strong>Statut:</strong> <FontAwesomeIcon icon={faCheckCircle} className="text-success" /> Actif</p>
                      <p><strong>Rôle:</strong> Vendeur</p>
                      <p><strong>Localisation:</strong> <FontAwesomeIcon icon={faMapMarkerAlt} /> Région d&apos;Analamanga, Madagascar</p>
                    </div>

                    <div>
                      <h5 className="text-uppercase" style={{ fontSize: "17px", letterSpacing: "1px", marginBottom: "10px", opacity: "0.6" }}>Contacts</h5>
                      <p><FontAwesomeIcon icon={faPhone} /> +261 32 12 345 67</p>
                      <p><FontAwesomeIcon icon={faEnvelope} /> email@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Produits disponibles */}
                <div className="card mt-4" style={{
                  border: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}>
                  <div className="card-body">
                    <h5 className="text-uppercase" style={{ fontSize: "17px", letterSpacing: "1px", marginBottom: "10px", opacity: "0.6" }}>Produits Disponibles</h5>
                    <ul className="list-unstyled">
                      <li>Poulets (100 disponibles)</li>
                      <li>Oeufs (200 disponibles)</li>
                      <li>Légumes bio</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Activité récente */}
              <div className="col-md-8">
                <div className="card" style={{
                  border: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}>
                  <div className="card-body">
                    <h5 className="text-uppercase" style={{ fontSize: "17px", letterSpacing: "1px", marginBottom: "10px", opacity: "0.6" }}>Activité Récente</h5>
                    <ul className="timeline list-unstyled">
                      <li className="mb-3">
                        <span className="badge bg-danger">Aujourd&apos;hui</span>
                        <p className="mb-1">Commande reçue pour 50 poulets</p>
                      </li>
                      <li className="mb-3">
                        <span className="badge bg-warning">Il y a 2 jours</span>
                        <p className="mb-1">Ajout de 100 oeufs à l&apos;inventaire</p>
                      </li>
                      <li className="mb-3">
                        <span className="badge bg-info">Il y a 6 jours</span>
                        <p className="mb-1">Livraison effectuée à Antananarivo</p>
                      </li>
                      <li>
                        <span className="badge bg-success">Il y a 10 jours</span>
                        <p className="mb-1">Nouvelle évaluation positive reçue</p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Évaluations */}
                <div className="card mt-4" style={{
                  border: "none",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}>
                  <div className="card-body">
                    <h5 className="text-uppercase" style={{ fontSize: "17px", letterSpacing: "1px", marginBottom: "10px", opacity: "0.6" }}>Évaluations</h5>
                    <p>Moyenne des évaluations : ★★★★☆ (4.5)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
