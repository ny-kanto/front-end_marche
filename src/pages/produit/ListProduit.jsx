import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Produit from "../../components/Produit";
import Cookie from "js-cookies";
import Pagination from '../../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';

function ListProduit() {
  const [produits, setProduits] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [categories, setCategories] = useState([]);
  const [unites, setUnites] = useState([]);
  const [typeProduits, setTypeProduits] = useState([]);
  const [sort, setSort] = useState();
  const [column, setColumn] = useState();
  const [noPage, setNoPage] = useState();
  const [formData, setFormData] = useState({
    filtre_nom: '',
    filtre_prix_min: '',
    filtre_prix_max: '',
    filtre_unite: '',
    filtre_categorie: '',
    filtre_type_produit: ''
  });

  const [refresh, setRefresh] = useState(false);
  const token = Cookie.getItem("token");
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!token) {
      navigate("/front-end_marche/login");
    }
  
    const fetchProduits = async () => {
      try {
        const response = await axios.get('https://back-endmarche-production.up.railway.app/produit/all', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        const rawProduits = response.data.data[0];
        const transformedProduits = rawProduits.map(produit => ({
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix,
          description: produit.description,
          minCommande: produit.minCommande,
          delaisLivraison: produit.delaisLivraison,
          id_unite: produit.unite.id,
          nom_unite: produit.unite.nom,
          id_categorie: produit.categorie.id,
          nom_categorie: produit.categorie.nom
        }));
        setProduits(transformedProduits);
  
        setTotalPages(response.data.data[1]);
        setCategories(response.data.data[2].map(categorie => ({
          id: categorie.id,
          nom: categorie.nom,
        })));
        setUnites(response.data.data[3].map(unite => ({
          id: unite.id,
          nom: unite.nom,
        })));
        setTypeProduits(response.data.data[4].map(typeProduit => ({
          id: typeProduit.id,
          nom: typeProduit.nom,
        })));
        setNoPage(response.data.data[5]);
        setSort(response.data.data[6]);
        setColumn(response.data.data[7]);
        console.log(response.data.data[0]);

      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/front-end_marche/error/403");
        } else if (error.response && error.response.status === 404) {
          navigate("/front-end_marche/error/404");
        } else {
          console.error('An error occurred:', error);
        }
      }
    };
  
    fetchProduits();
  }, [navigate, token, refresh]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };
  
  // SUPPRESSION
  const handleDelete = (deletedId) => {
    setProduits(produits.filter(produit => produit.id !== deletedId));
  };

  // MODIFICATION
  const handleUpdate = (updatedProduit) => {
    console.log('Produit à mettre à jour:', updatedProduit);
    setProduits((prevProduits) =>
      prevProduits.map((produit) =>
        produit.id === updatedProduit.id ? updatedProduit : produit
      )
    );

    setRefresh(!refresh);
  };

  // AJOUT
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [newProductData, setNewProductData] = useState({
    nom: '',
    description: '',
    prix: '',
    unite: { id: '' },
    minCommande: '',
    delaisLivraison: '',
    categorie: { id: '' },
    files: []
  });

  const handleShowAdd = () => setShowModalAdd(true);
  const handleCloseAdd = () => setShowModalAdd(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id_unite') {
      setNewProductData({ ...newProductData, unite: { id: value } });
    } else if (name === 'id_categorie') {
      setNewProductData({ ...newProductData, categorie: { id: value } });
    } else {
      setNewProductData({ ...newProductData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setNewProductData({ ...newProductData, files: e.target.files });
  };

  const onAddProduct = (newProduct) => {
    console.log('Produit ajouté avec succès:', newProduct);
    setProduits(prevProducts => [...prevProducts, newProduct]);

    setRefresh(!refresh);
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();  // Crée une instance de FormData
      formData.append('nom', newProductData.nom);
      formData.append('description', newProductData.description);
      formData.append('prix', newProductData.prix);
      formData.append('id_unite', newProductData.unite.id);
      formData.append('min_commande', newProductData.minCommande);
      formData.append('delais_livraison', newProductData.delaisLivraison);
      formData.append('id_categorie', newProductData.categorie.id);

      for (let i = 0; i < newProductData.files.length; i++) {
        formData.append('photo', newProductData.files[i]);
      }

      const response = await axios.post('https://back-endmarche-production.up.railway.app/produit/save', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Réponse ", response.data);
      
      if (response.status === 200) {
        onAddProduct(response.data);
        setShowModalAdd(false);
      } else {
        console.error('Erreur lors de l\'ajout du produit:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  };

  // FILTRE
  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
        filtre_nom: formData.filtre_nom,
        filtre_prix_min: formData.filtre_prix_min,
        filtre_prix_max: formData.filtre_prix_max,
        filtre_unite: formData.filtre_unite,
        filtre_categorie: formData.filtre_categorie,
        filtre_type_produit: formData.filtre_type_produit
    });

    axios.get(`https://back-endmarche-production.up.railway.app/produit/all?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${Cookie.getItem("token")}`
        }
    })
    .then((response) => {
      const rawProduits = response.data.data[0];
      const transformedProduits = rawProduits.map(produit => ({
        id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        description: produit.description,
        minCommande: produit.minCommande,
        delaisLivraison: produit.delaisLivraison,
        id_unite: produit.unite.id,
        nom_unite: produit.unite.nom,
        id_categorie: produit.categorie.id,
        nom_categorie: produit.categorie.nom
      }));
      setProduits(transformedProduits);

      setTotalPages(response.data.data[1]);

      const rawCategorie = response.data.data[2];
      const transformedCategorie = rawCategorie.map(categorie => ({
        id: categorie.id,
        nom: categorie.nom,
      }));
      setCategories(transformedCategorie);

      const rawUnite = response.data.data[3];
      const transformedUnite = rawUnite.map(unite => ({
        id: unite.id,
        nom: unite.nom,
      }));
      setUnites(transformedUnite);

      const rawTypeProduit = response.data.data[4];
      const transformedTypeProduit = rawTypeProduit.map(typeProduit => ({
        id: typeProduit.id,
        nom: typeProduit.nom,
      }));
      setTypeProduits(transformedTypeProduit);

      setNoPage(response.data.data[5]);

      setSort(response.data.data[6]);

      setColumn(response.data.data[7]);
      
      console.log(response.data.data[0])
    })
    .catch((error) => {
        console.error(error);
    });
};

// TRIAGE
const handleSort = async (sortOrder, columnName) => {
  try {
    const token = Cookie.getItem("token");
    const params = new URLSearchParams({
        column: columnName,
        sort: sortOrder,
        filtre_nom: formData.filtre_nom,
        filtre_prix_min: formData.filtre_prix_min,
        filtre_prix_max: formData.filtre_prix_max,
        filtre_unite: formData.filtre_unite,
        filtre_categorie: formData.filtre_categorie,
        filtre_type_produit: formData.filtre_type_produit
    });

    const response = await axios.get(`https://back-endmarche-production.up.railway.app/produit/all?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Transforme les données reçues
    const rawProduits = response.data.data[0];
    const transformedProduits = rawProduits.map(produit => ({
      id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        description: produit.description,
        minCommande: produit.minCommande,
        delaisLivraison: produit.delaisLivraison,
        id_unite: produit.unite.id,
        nom_unite: produit.unite.nom,
        id_categorie: produit.categorie.id,
        nom_categorie: produit.categorie.nom
    }));
    setProduits(transformedProduits);

    setTotalPages(response.data.data[1]);

    const rawCategorie = response.data.data[2];
    const transformedCategorie = rawCategorie.map(categorie => ({
      id: categorie.id,
      nom: categorie.nom,
    }));
    setCategories(transformedCategorie);

    const rawUnite = response.data.data[3];
    const transformedUnite = rawUnite.map(unite => ({
      id: unite.id,
      nom: unite.nom,
    }));
    setUnites(transformedUnite);

    const rawTypeProduit = response.data.data[4];
    const transformedTypeProduit = rawTypeProduit.map(typeProduit => ({
      id: typeProduit.id,
      nom: typeProduit.nom,
    }));
    setTypeProduits(transformedTypeProduit);

    setNoPage(response.data.data[5]);

    setSort(response.data.data[6]);

    setColumn(response.data.data[7]);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};

// PAGINATION
const handlePagination = async (pageNumber) => {
  try {
    const token = Cookie.getItem("token");
    const params = new URLSearchParams({
      noPage: pageNumber,
      sort: sort,
      column: column,
      filtre_nom: formData.filtre_nom,
      filtre_prix_min: formData.filtre_prix_min,
      filtre_prix_max: formData.filtre_prix_max,
      filtre_unite: formData.filtre_unite,
      filtre_categorie: formData.filtre_categorie,
      filtre_type_produit: formData.filtre_type_produit
    });

    const response = await axios.get(`https://back-endmarche-production.up.railway.app/produit/all?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const rawProduits = response.data.data[0];
    const transformedProduits = rawProduits.map(produit => ({
      id: produit.id,
        nom: produit.nom,
        prix: produit.prix,
        description: produit.description,
        minCommande: produit.minCommande,
        delaisLivraison: produit.delaisLivraison,
        id_unite: produit.unite.id,
        nom_unite: produit.unite.nom,
        id_categorie: produit.categorie.id,
        nom_categorie: produit.categorie.nom
    }));
    setProduits(transformedProduits);

    setTotalPages(response.data.data[1]);
    setNoPage(pageNumber);

    console.log("total page " + totalPages);

    console.log(response.data.data[0])
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};


  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="mb-5">
          <Header />
      </div>
      <div className="container mt-5 mb-5">
        <div className="page-content">
          <div className="container-fluid">

            <div className="row mt-4">
              <div className="w-auto">
                <div className="card">
                  <div className="card-header align-items-center d-flex">
                    <h6 className="card-title mb-0 flex-grow-1">Filtre</h6>
                  </div>
                  <div className="card-body">
                    <div className="live-preview">
                      <div className="row g-4 mb-3">
                        <form onSubmit={handleSubmit}>
                          <div className="d-flex flex-wrap">
                            <div className="me-1 mt-2">
                              <input type="text" name="filtre_nom" className="form-control w-auto" placeholder="Entrez le nom" value={formData.filtre_nom} onChange={handleInputChange} />
                            </div>
                            <div className="me-1 mt-2">
                              <input type="number" name="filtre_prix_min" className="form-control w-auto" placeholder="Entrez le prix min" value={formData.filtre_prix_min} onChange={handleInputChange} />
                            </div>
                            <div className="me-1 mt-2">
                              <input type="number" name="filtre_prix_max" className="form-control w-auto" placeholder="Entrez le prix max" value={formData.filtre_prix_max} onChange={handleInputChange} />
                            </div>
                            <div className="me-1 mt-2">
                              <select className="form-select w-auto me-1" aria-label="Sélectionnez une unité" name="filtre_unite" value={formData.filtre_unite} onChange={handleInputChange}>
                                <option value="">Sélectionnez une unité</option>
                                {unites.map((unite) => (
                                  <option key={unite.id} value={unite.id}>{unite.nom}</option>
                                ))}
                              </select>
                            </div>
                            <div className="me-1 mt-2">
                              <select className="form-select w-auto me-1" aria-label="Sélectionnez une catégorie" name="filtre_categorie" value={formData.filtre_categorie} onChange={handleInputChange}>
                                <option value="">Sélectionnez une catégorie</option>
                                {categories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>{cat.nom}</option>
                                ))}
                              </select>
                            </div>
                            <div className="me-1 mt-2">
                              <select className="form-select w-auto me-1" aria-label="Sélectionnez un type de produit" name="filtre_type_produit" value={formData.filtre_type_produit} onChange={handleInputChange}>
                                <option value="">Sélectionnez un type de produit</option>
                                {typeProduits.map((typeProduit) => (
                                  <option key={typeProduit.id} value={typeProduit.id}>{typeProduit.nom}</option>
                                ))}
                              </select>
                            </div>
                            <div className="mt-2">
                              <button type="submit" className="btn btn-primary bg-gradient">Filtrer</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Produit</h4>
                  </div>
                  <div className="card-body">
                    <div className="live-preview">
                      <div className="row g-4 mb-3">
                        <div className="col-sm-auto">
                            <div>
                                <button type="button" onClick={handleShowAdd} className="btn btn-success add-btn"><i
                                        className="fas fa-plus"></i> Ajouter un produit</button>
                            </div>
                        </div>
                      </div>
                      <div className="table-responsive modal-body-pdf">
                        <table
                          className="table align-middle table-nowrap mb-0"
                          id="myTable">
                          <thead>
                            <tr>
                              <th scope="col">
                                #
                                <Link to="#" onClick={() => handleSort(sort + 1, "id")}>
                                <i className="fas fa-sort" style={{ float: "right", color: "grey" }}></i>
                                </Link>
                              </th>
                              <th scope="col">
                                Nom
                                <Link to="#" onClick={() => handleSort(sort + 1, "nom")}>
                                <i className="fas fa-sort" style={{ float: "right", color: "grey"}}></i>
                                </Link>
                              </th>
                              <th scope="col">
                                Prix
                                <Link to="#" onClick={() => handleSort(sort + 1, "prix")}>
                                <i className="fas fa-sort" style={{ float: "right", color: "grey"}}></i>
                                </Link>
                              </th>
                              <th scope="col">
                                Unité
                                <Link to="#" onClick={() => handleSort(sort + 1, "id_unite")}>
                                <i className="fas fa-sort" style={{ float: "right", color: "grey" }}></i>
                                </Link>
                              </th>
                              <th scope="col">
                                Catégorie
                                <Link to="#" onClick={() => handleSort(sort + 1, "id_categorie")}>
                                <i className="fas fa-sort" style={{ float: "right", color: "grey" }}></i>
                                </Link>
                              </th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {produits.map((product) => (
                            <Produit
                              produit={product}
                              categories={categories}
                              unites={unites}
                              key={product.id}
                              onDelete={handleDelete}
                              onUpdate={handleUpdate}
                            />
                          ))}
                          </tbody>
                        </table>
                      </div>
                      <Pagination 
                        noPage={noPage} 
                        totalPages={totalPages}
                        baseUrl="https://back-endmarche-production.up.railway.app/produit/all"
                        onPageChange={handlePagination}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal d'ajout de produit */}
          <Modal show={showModalAdd} onHide={handleCloseAdd} centered size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Ajouter un produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formNom">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    value={newProductData.nom}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={newProductData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    type="number"
                    name="prix"
                    value={newProductData.prix}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMinCommande">
                  <Form.Label>Quantité Minimum</Form.Label>
                  <Form.Control
                    type="number"
                    name="minCommande"
                    value={newProductData.minCommande}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDelaisLivraison">
                  <Form.Label>Délai de Livraison</Form.Label>
                  <Form.Control
                    type="number"
                    name="delaisLivraison"
                    value={newProductData.delaisLivraison}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formUnite">
                  <Form.Label>Unité</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_unite"
                    value={newProductData.unite.id}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez une unité</option>
                    {unites.map((unite) => (
                      <option key={unite.id} value={unite.id}>{unite.nom}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCategorie">
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    as="select"
                    name="id_categorie"
                    value={newProductData.categorie.id}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nom}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formFiles">
                  <Form.Label>Importer des photos</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    name="photo"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Annuler
              </Button>
              <Button variant="primary" onClick={handleAddProduct}>
                Ajouter le produit
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListProduit;
