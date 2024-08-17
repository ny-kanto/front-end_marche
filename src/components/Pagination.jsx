import React from "react";

function Pagination({ noPage, totalPages, onPageChange }) {
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  return (
    <div className="d-flex justify-content-end mt-3">
      <div className="pagination-wrap hstack gap-2">
        {/* Bouton Précédent */}
        <button
          className={`btn ${noPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(noPage - 1)}
          disabled={noPage === 1}
        >
          Précédent
        </button>

        {/* Numéros de page */}
        <ul className="pagination mb-0">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={`page-item ${i + 1 === noPage ? "active" : ""}`}>
              <button 
                className="page-link" 
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>

        {/* Bouton Suivant */}
        <button
          className={`btn ${noPage === totalPages ? "disabled" : ""}`}
          onClick={() => handlePageChange(noPage + 1)}
          disabled={noPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Pagination;
