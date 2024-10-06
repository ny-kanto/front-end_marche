import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./Loading";
import Pagination from "./Pagination";
import Message from "../pages/commande/Message";

const Commande = ({
    commandes,
    error,
    noPage,
    totalPages,
    handlePagination,
    count,
    countLivree,
    countNonLivree,
    countEnCours
}) => {
    const [selectedAcheteurId, setSelectedAcheteurId] = useState(null);

    if (!commandes) {
        return <Loading />;
    }

    const handleOpenMessage = (acheteurId) => {
        setSelectedAcheteurId(acheteurId);

        console.log("id_acheteur: ", acheteurId);
    };

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-12">
                    <h4>Vos Commandes</h4>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            )}

            <div className="d-flex justify-content-end mt-3 mb-4">
                <Pagination
                    noPage={noPage}
                    totalPages={totalPages}
                    baseUrl="http://localhost:8080/commande/list"
                    onPageChange={handlePagination}
                />
            </div>
            {/* Navigation avec nav-tabs de Bootstrap */}
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link text-black active" href="#">Tous ({count})</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-black" href="#">En cours ({countEnCours})</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-black" href="#">Non livrée ({countNonLivree})</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-black" href="#">Livrée ({countLivree})</a>
                </li>
            </ul>
            <div className="row bg-light p-2">
                <div className="col-4">
                    <strong>Produit</strong>
                </div>
                <div className="col-2 text-center">
                    <strong>Prix Unitaire (Ar)</strong>
                </div>
                <div className="col-1 text-center">
                    <strong>Quantité</strong>
                </div>
                <div className="col-1 text-center">
                    <strong>Status</strong>
                </div>
                <div className="col-2 text-center">
                    <strong>Total (Ar)</strong>
                </div>
                <div className="col-2"></div>
            </div>

            {commandes.map((commande, index) => (
                <div className="row py-3 border-bottom align-items-center" key={index}>
                    <div className="col-4 d-flex">
                        <img
                            src={`data:${commande.photoMimeType};base64,${commande.photoBase64}`}
                            alt={commande.nom_produit}
                            className="img-fluid object-fit-cover"
                            style={{ maxWidth: "80px", marginRight: "20px" }}
                        />
                        <div>
                            <h6 className="text-uppercase">
                                {commande.nom_produit} ({commande.unite})
                            </h6>
                        </div>
                    </div>
                    <div className="col-2 text-center">
                        {commande.prix_produit.toLocaleString("fr-FR")}
                    </div>
                    <div className="col-1 text-center">
                        {commande.quantite.toLocaleString("fr-FR")}
                    </div>
                    <div className="col-1 text-center">{commande.status}</div>
                    <div className="col-2 text-center">
                        {commande.total.toLocaleString("fr-FR")}
                    </div>
                    <div className="col-2 text-center">
                        <button
                            className="btn btn-info text-decoration-none"
                            style={{ color: "white" }}
                            onClick={() => handleOpenMessage(commande.id_acheteur)}
                        >
                            Messagerie
                        </button>
                    </div>
                </div>
            ))}

            {selectedAcheteurId && (
                <Message
                    acheteurId={selectedAcheteurId}
                    onClose={() => setSelectedAcheteurId(null)}
                />
            )}
        </div>
    );
};

export default Commande;
