import 'bootstrap/dist/css/bootstrap.min.css';

function Pagination({ noPage, totalPages, onPageChange }) {
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination-wrap d-flex justify-content-center align-items-center gap-2">
      {/* Bouton Précédent */}
      <button
        className={`btn btn-sm ${noPage === 1 ? "btn-secondary disabled" : "btn-success"}`}
        onClick={() => handlePageChange(noPage - 1)}
        disabled={noPage === 1}
      >
        <i className="bi bi-arrow-left"></i> Précédent
      </button>

      {/* Numéros de page */}
      <ul className="pagination mb-0">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={`page-item ${i + 1 === noPage ? "active" : ""}`}>
            <button 
              className={`page-link ${i + 1 === noPage ? "bg-success text-white border-success" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>

      {/* Bouton Suivant */}
      <button
        className={`btn btn-sm ${noPage === totalPages ? "btn-secondary disabled" : "btn-success"}`}
        onClick={() => handlePageChange(noPage + 1)}
        disabled={noPage === totalPages}
      >
        Suivant <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
