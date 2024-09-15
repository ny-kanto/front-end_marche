import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';

const Order = ({ orders, totalGlobal, onQuantityChange, onRemoveProduct, error }) => {
    
    if (!orders) {
        return <Loading />
    }

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col-12">
                    <h4>Votre Panier</h4>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger mt-3" role="alert">
                    {error}
                </div>
            )}

            <div className="row bg-light p-2">
                <div className="col-6"><strong>Produit</strong></div>
                <div className="col-2 text-center"><strong>Prix Unitaire (Ar)</strong></div>
                <div className="col-1 text-center"><strong>Quantité</strong></div>
                <div className="col-1 text-center"><strong>Total (Ar)</strong></div>
            </div>

            {orders.map((order, index) => (
                <div className="row py-3 border-bottom align-items-center" key={index}>
                    <div className="col-6 d-flex">
                        <img src={`data:${order.photoMimeType};base64,${order.photoBase64}`} alt={order.nom_produit} className="img-fluid object-fit-cover" style={{ maxWidth: '80px', marginRight: '20px' }} />
                        <div>
                            <h6 className='text-uppercase'>{order.nom_produit}</h6>
                            <p className='text-primary'>Vendeur : {order.prenom_vendeur} {order.nom_vendeur}</p>
                        </div>
                    </div>
                    <div className="col-2 text-center">{order.prix_produit.toLocaleString('fr-FR')}</div>
                    <div className="col-1 text-center">
                        <div className="d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onQuantityChange(order.id_produit, order.quantite - 1)}
                            disabled={order.quantite <= 1}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="mx-2">{order.quantite}</span>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => onQuantityChange(order.id_produit, order.quantite + 1)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        </div>
                    </div>
                    <div className="col-1 text-center">{(order.prix_produit * order.quantite).toLocaleString('fr-FR')}</div>
                    <div className='ms-5 w-auto d-flex justify-content-end' style={{ marginBottom: "75px" }}>
                        <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemoveProduct(order.id_produit)}
                        >
                        <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
            ))}

            <div className="row justify-content-end pt-4 mt-4">
                <div className="col-4">
                    {/* <p className="d-flex justify-content-between">
                        <span>Sub Total :</span>
                        <span>{orders[0].produit.prix.toLocaleString('fr-FR')} Ar</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span>Discount (VELZON15) :</span>
                        <span className="text-danger">-{orders[0].produit.prix.toLocaleString('fr-FR')} Ar</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span>Shipping Charge :</span>
                        <span>{orders[0].produit.prix.toLocaleString('fr-FR')} Ar</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span>Estimated Tax :</span>
                        <span>{orders[0].produit.prix.toLocaleString('fr-FR')} Ar</span>
                    </p> */}
                    <hr />
                    <p className="d-flex justify-content-between">
                        <strong>Total (Ar) :</strong>
                        <strong>{totalGlobal}</strong>
                    </p>
                </div>
            </div>

            <div className="row justify-content-end mt-4">
                <div className="col-4 text-end">
                    <button className="btn btn-success">Accéder au paiement</button>
                </div>
            </div>
        </div>
    );
};

export default Order;
