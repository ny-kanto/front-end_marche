import { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Navbar from "../../components/Navbar";
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function ListCommande() {
  const [commandes, setCommandes] = useState([]);
  const [idCommandeNL, setIdCommandeNL] = useState([]);
  const [idCommandeEC, setIdCommandeEC] = useState([]);
  const [commandeProduit, setCommandeProduit] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");
  const [noPage, setNoPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [selectedAcheteurId, setSelectedAcheteurId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("token front : ", token);
    console.log("email front : ", sessionStorage.getItem("email"));

    if (!token) {
      navigate("/login");
    }

    const fetchCommandes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/commande/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("data 0 : ", response.data.data[0]);

        const rawCommandes = response.data.data[0];
        const transformedCommandes = rawCommandes.map(commande => ({
          id_commande: commande.id,
          adresse_livraison: commande.adresseLivraison,
          date_commande: commande.dateCommande,
          id_client: commande.personne.id,
          nom_client: commande.personne.nom,
          prenom_client: commande.personne.prenom,
          num_client: commande.numClient,
          message_non_lus: commande.messageNonLus,
          montant_total: commande.montantTotal
        }));
        setCommandes(transformedCommandes);
        console.log("transformed Commandes : ", transformedCommandes);

        setNoPage(response.data.data[1]);
        setTotalPages(response.data.data[2]);
        setIdCommandeNL(response.data.data[3]);
        setIdCommandeEC(response.data.data[4]);
        setCommandeProduit(response.data.data[5]);
        console.log("data 5 : ", response.data.data[5]);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("An error occurred:", error);
          navigate("/error/403");
        } else if (error.response && error.response.status === 404) {
          console.error("An error occurred:", error);
          navigate("/error/404");
        } else {
          setError(error.message);
        }
      }
    };

    fetchCommandes();
  }, [navigate, refresh, selectedAcheteurId]);

  // PAGINATION
  const handlePagination = async (pageNumber) => {
    try {
      const token = sessionStorage.getItem("token");
      const params = new URLSearchParams({
        noPage: pageNumber
      });

      const response = await axios.get(`http://localhost:8080/commande/list?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("data 0 : ", response.data.data[0]);

      const rawCommandes = response.data.data[0];
      const transformedCommandes = rawCommandes.map(commande => ({
        id_commande: commande.id,
        adresse_livraison: commande.adresseLivraison,
        date_commande: commande.dateCommande,
        id_client: commande.personne.id,
        num_client: commande.numClient,
        nom_client: commande.personne.nom,
        prenom_client: commande.personne.prenom,
        message_non_lus: commande.messageNonLus
      }));
      setCommandes(transformedCommandes);
      console.log("transformed Commandes : ", transformedCommandes);

      setNoPage(response.data.data[1]);
      setTotalPages(response.data.data[2]);
      setIdCommandeNL(response.data.data[3]);
      setIdCommandeEC(response.data.data[4]);
      setCommandeProduit(response.data.data[5]);
      console.log("data 5 : ", response.data.data[5]);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };


  const handleOpenMessage = (acheteurId) => {
    setSelectedAcheteurId(acheteurId);

    console.log("id_acheteur: ", acheteurId);
  };

  const genererFacture = (commande) => {
    const doc = new jsPDF();

    const produitsFiltres = commandeProduit.filter(
      (produit) => produit.commande.id === commande.id_commande
    );

    // Ajouter les informations de l'entreprise
    doc.setFontSize(12);
    // doc.text("Mon Entreprise", 20, 20);
    // doc.text("22, Avenue Voltaire", 20, 30);
    // doc.text("13000 Marseille, France", 20, 40);
    // doc.text("Téléphone : +33 4 92 99 99 99", 20, 50);

    // Ajouter les informations du vendeur
    doc.text(`Vendeur:`, 20, 20);
    doc.text(`${produitsFiltres[0].produit.personne.prenom} ${produitsFiltres[0].produit.personne.nom}`, 20, 30);
    doc.text(`Téléphone : +261 ${produitsFiltres[0].produit.personne.contact}`, 20, 40);
    // doc.text(`${commande.adresse_livraison}`, 20, 90);
    // doc.text(`${commande.adresse_livraison}`, 20, 100);


    // Ajouter les informations du client
    doc.text(`Client:`, 20, 70);
    doc.text(`${commande.prenom_client} ${commande.nom_client}`, 20, 80);
    doc.text(`${commande.adresse_livraison}`, 20, 90);
    doc.text(`${commande.num_client}`, 20, 100);

    // Ajouter les informations de la commande
    doc.text(`Date: ${new Date(commande.date_commande).toLocaleDateString()}`, 140, 20);
    doc.text(`Numéro de commande: ${commande.id_commande}`, 140, 30);

    // Ajouter une table pour les détails de la commande
    const tableColumn = ["Produit", "Quantité", "Unité", "Prix unitaire (Ar)", "Total (Ar)"];
    const tableRows = [];

    let produit1 = [];

    produitsFiltres.forEach((produit) => {
      produit1 = [`${produit.produit.nom}`, `${Number(produit.quantite)}`, `${produit.produit.unite.nom}`, `${Number(produit.prixUnitaire)}`, `${Number(produit.total)}`];
      tableRows.push(produit1);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 110 });

    doc.text(`Total : ${commande.montant_total} Ar`, 140, 160);

    // Télécharger le PDF
    doc.save(`Facture_${commande.id_commande}.pdf`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="mb-5">
        <Header />
      </div>
      <div className="mt-5 mb-5">
        <Navbar />
        <div
          style={{ marginLeft: "350px" }}
        >
          <div className="min-vh-100">
            <div className="container-fluid">
              <div className="row mt-4">
                <div className="col-lg-12">

                  <div className="card">
                    <div className="card-header align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">Commandes</h4>
                    </div>
                    <div className="card-body">
                      <div className="row bg-light p-2 border-bottom">
                        {/* <div className="col-1 text-center"><strong>Numero</strong></div> */}
                        <div className="col-2 text-center"><strong>Client</strong></div>
                        <div className="col-2 text-center"><strong>Adresse de Livraison</strong></div>
                        <div className="col-2 text-center"><strong>Date de Commande</strong></div>
                        <div className="col-1 text-center"></div>
                        <div className="col-2 text-center"></div>
                        <div className="col-2 text-center"></div>
                      </div>

                      {/* Liste des commandes */}
                      {commandes.map((commande) => (
                        <div
                          key={commande.id_commande}
                          className="row align-items-center py-2 border-bottom"
                          style={
                            (!idCommandeNL.includes(commande.id_commande)
                              && !idCommandeEC.includes(commande.id_commande)) ? { backgroundColor: "#e1e1e1", color: "white" }
                              : {}
                          }
                        >
                          {/* <div className="col-1 text-center">
                            {commande.num_client}
                          </div> */}

                          <div className="col-2 text-center">
                            {commande.prenom_client} {commande.nom_client}
                          </div>

                          <div className="col-2 text-center">
                            {commande.adresse_livraison}
                          </div>

                          <div className="col-2 text-center">
                            {new Date(commande.date_commande).toLocaleString('fr-FR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            })}
                          </div>

                          <div className="col-1 text-center">
                            <a
                              href={`/front-end_marche/commande-produit/list/${commande.id_commande}`}
                              className="text-info text-decoration-none"
                            >
                              Détails
                            </a>
                          </div>

                          <div className="col-2 text-center">
                            <button
                              className="btn btn-info text-decoration-none position-relative"
                              style={{ color: "white" }}
                              onClick={() => handleOpenMessage(commande.id_client)}
                            >
                              Messagerie
                              {commande.message_non_lus > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                  {commande.message_non_lus}
                                </span>
                              )}
                            </button>
                          </div>

                          <div className="col-2 text-center">
                            <button className="btn btn-success text-decoration-none" style={{ color: "white" }} onClick={() => genererFacture(commande)}>
                              Générer facture
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                      <Pagination
                        noPage={noPage}
                        totalPages={totalPages}
                        baseUrl="http://localhost:8080/commande/list"
                        onPageChange={handlePagination}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedAcheteurId && (
            <Message
              acheteurId={selectedAcheteurId}
              onClose={() => setSelectedAcheteurId(null)}
            />
          )}
          <Footer />
        </div>
      </div>

    </div >
  );
}

export default ListCommande;
