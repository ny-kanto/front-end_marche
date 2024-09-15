import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination, Scrollbar, Zoom, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import 'swiper/css/effect-coverflow';
import '../../assets/detailProduit.css';
import Loading from "../../components/Loading";

const DetailProduit = () => {
  const { id } = useParams();
  const [produits, setProduits] = useState();
  const [stock, setStock] = useState(0);
  const[produitPhotos, setProduitPhotos] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/produit/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setProduits(response.data.data[0]);
        setProduitPhotos(response.data.data[1]);
        setStock(response.data.data[2]);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
      }
      console.log(produitPhotos);
    };
  
    fetchProduct();
  }, [id, navigate, token]);

  
  if (!produits && !stock) {
    return <Loading />
  }

  return (
    <div>
      <div className="main-content d-flex flex-column min-vh-100 mt-5">
        <div className="mb-5">
            <Header />
        </div>
        <div className="page-content mt-5">
          <div className="container">

            <div className="row mt-4">
              <div className="col-lg-12">
                <div>
                  <Swiper
                    effect={'coverflow'}
                    spaceBetween={100}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    navigation
                    grabCursor={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    zoom={true}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    modules={[EffectCoverflow, Autoplay, Navigation, Pagination, Scrollbar, Zoom]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                  >
                    {produitPhotos.map((photo, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`data:${photo.mimeType};base64,${photo.base64}`}
                          alt={produits.nom}
                          className="img-fluid d-block"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="row mt-4">
                <div className="col-lg-12">
                  <h1 className="text-center text-uppercase">{produits.nom}</h1>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-5 offset-lg-1">
                  <h3>Description</h3>
                  <p>{produits.description}</p>
                </div>
                <div className="col-lg-5 offset-lg-1">
                  <h3>Détails</h3>
                  <div className="col-lg-12 col-sm-6">
                    <div className="p-2 border border-dashed rounded">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm me-2">
                          <div className="avatar-title rounded bg-transparent text-success fs-24">
                            <i className="ri-file-copy-2-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="text-muted mb-1">
                            Prix :
                          </p>
                          <h5 className="mb-0">
                          {produits.prix.toLocaleString('fr-FR')} Ar
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-6 mt-1">
                    <div className="p-2 border border-dashed rounded">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm me-2">
                          <div className="avatar-title rounded bg-transparent text-success fs-24">
                            <i className="ri-file-copy-2-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="text-muted mb-1">
                            Unite :
                          </p>
                          <h5 className="mb-0">
                          {produits.unite.nom}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-6 mt-1">
                    <div className="p-2 border border-dashed rounded">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm me-2">
                          <div className="avatar-title rounded bg-transparent text-success fs-24">
                            <i className="ri-file-copy-2-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="text-muted mb-1">
                            Stock :
                          </p>
                          <h5 className="mb-0">
                          {stock.toLocaleString('fr-FR')}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-6 mt-1">
                    <div className="p-2 border border-dashed rounded">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm me-2">
                          <div className="avatar-title rounded bg-transparent text-success fs-24">
                            <i className="ri-file-copy-2-fill"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="text-muted mb-1">
                            Catégorie :
                          </p>
                          <h5 className="mb-0">
                          {produits.categorie.nom}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="mt-4 mb-2" style={{ color: '#28a745', borderBottom: '2px solid #28a745', paddingBottom: '5px' }}>
                    Conditions de vente
                  </h5>
                  <ul style={{ paddingLeft: '20px', lineHeight: '1.7', color: '#555' }}>
                    <li style={{ marginBottom: '10px' }}>
                      <strong>Minimum de commande :</strong> {produits.minCommande}
                    </li>
                    <li>
                      <strong>Délais de livraison :</strong> {produits.delaisLivraison} j
                    </li>
                  </ul>
                </div>

                <div className="text-start mb-5">
                  <button
                    type="button"
                    className="btn btn-info bg-gradient"
                    onClick={() => navigate("/product/list")}
                  >
                    Retour
                  </button>
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

export default DetailProduit;
