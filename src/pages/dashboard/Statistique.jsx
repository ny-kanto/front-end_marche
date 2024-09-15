import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Statistique() {
  const [chartData, setChartData] = useState(null);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    console.log("token front : ", token);
    console.log("email front : ", sessionStorage.getItem("email"));
    if (!token) {
      navigate("/login");
    }
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
          "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

        const completeStats = monthOrder.map((month) => {
          const stat = stats.find((s) => s.mois === month);
          return stat ? stat.totalVentes : 0;
        });

        setChartData({
          labels: monthOrder,
          datasets: [
            {
              label: "Total des ventes",
              data: completeStats,
              backgroundColor: "#007bff",
              barThickness: 60
            },
          ],
        });
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/error/403");
        } else if (error.response && error.response.status === 404) {
          navigate("/error/404");
        } else {
          console.error('An error occurred:', error);
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
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Statistique;
