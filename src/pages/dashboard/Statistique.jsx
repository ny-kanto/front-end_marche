import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistique() {
  const [chartData, setChartData] = useState(null);
  const [stat, setStat] = useState([]);
  const [produits, setProduits] = useState([]);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/statistique/all",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { idProduit: 1, annee: 2024 },
            withCredentials: true,
          }
        );
  
        const stats = response.data.data[0];
        
        const monthOrder = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ];
  
        // Utilisation de monthOrder pour forcer l'ordre des mois
        const orderedStats = monthOrder.map((month) => {
          const stat = stats.find((s) => s.mois === month);
          return {
            mois: month,
            totalVentes: stat ? stat.totalVentes : 0,
            nomProduit: stat ? stat.nomProduit : "",
            nomUnite: stat ? stat.nomUnite : "",
            totalVendus: stat ? stat.totalVendus : 0,
            annee: stat ? stat.annee : 2024, // par défaut à 2024 si aucune donnée
          };
        });

        console.log("stat : ", stat);
        console.log("stats : ", stats);
  
        // Mise à jour du graphique avec les données ordonnées
        setChartData({
          labels: monthOrder,
          datasets: [
            {
              label: "Total des ventes",
              data: orderedStats.map((s) => s.totalVentes),
              backgroundColor: "#007bff",
              barThickness: 60,
            },
          ],
        });
  
        setProduits(response.data.data[1]);
        setStat(orderedStats); // Utilise les statistiques ordonnées pour la table

        console.log("ordered : ", orderedStats);
  
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/error/403");
        } else if (error.response && error.response.status === 404) {
          navigate("/error/404");
        } else {
          console.error("An error occurred:", error);
        }
      }
    };
  
    fetchData();
  }, [token, navigate]);
  

  const cardColor = "#ffffff"; // Couleur de fond de la carte
  const borderColor = "#e0e0e0"; // Couleur de la bordure
  const labelColor = "#6c757d"; // Couleur des labels
  const headingColor = "#343a40"; // Couleur du texte principal
  const legendColor = "#495057"; // Couleur des légendes

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: borderColor,
          drawBorder: false,
          borderColor: borderColor,
          drawOnChartArea: false,
        },
        ticks: {
          color: labelColor,
        },
        barPercentage: 0.5, // Ajuste cette valeur pour rendre les barres plus minces
        categoryPercentage: 0.5, // Ajuste cette valeur pour rendre les barres plus minces
      },
      y: {
        min: 0,
        ticks: {
          color: labelColor,
          stepSize: 10000,
        },
        grid: {
          color: borderColor,
          drawBorder: false,
          borderColor: borderColor,
          // drawOnChartArea: false,
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: cardColor,
        titleColor: headingColor,
        bodyColor: legendColor,
        borderWidth: 1,
        borderColor: borderColor,
      },
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          padding: 35,
          boxWidth: 6,
          boxHeight: 6,
          color: legendColor,
        },
      },
    },
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="mb-5">
        <Header />
      </div>
      <div className="mt-5 mb-5">
        <Navbar />
        <div
          className="container"
          style={{ marginLeft: "340px", maxWidth: "1500px" }}
        >
          <div className="row mb-4 min-vh-100">
            <div className="col-12">
              <div className="card">
                <div className="card-header header-elements">
                  <div>
                    <h5 className="card-title mb-0">Statistics</h5>
                    <small className="text-muted">
                      Commercial networks and enterprises
                    </small>
                  </div>
                  <div className="card-header-elements ms-auto py-0">
                    <h5 className="mb-0 me-3">$ 78,000</h5>
                  </div>
                </div>
                <div className="card-body pt-2" style={{ height: "500px" }}>
                  {chartData ? (
                    <Bar data={chartData} options={options} />
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Produit</h4>
                </div>
                <div className="card-body">
                  <div className="live-preview">
                    <div className="table-responsive modal-body-pdf">
                      <table
                        className="table align-middle table-nowrap mb-0"
                        id="myTable"
                      >
                        <thead>
                          <tr>
                            <th scope="col">Produit</th>
                            <th scope="col">Unité</th>
                            <th scope="col">Total Vendus</th>
                            <th scope="col">Total Ventes</th>
                            <th scope="col">Mois</th>
                            <th scope="col">Année</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stat.map((st, index) => (
                            <tr key={`${st.idProduit}-${index}`}>
                              <td>{st.nomProduit}</td>
                              <td>{st.nomUnite}</td>
                              <td>{st.totalVendus}</td>
                              <td>{st.totalVentes}</td>
                              <td>{st.mois}</td>
                              <td>{st.annee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Statistique;
