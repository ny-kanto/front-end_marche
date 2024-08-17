import { useState } from 'react';
import './assets/style.css';
import Err from './component/Error';

function Error() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <h1>ty le popup manao required</h1>
      <button onClick={openPopup}>ouvrir</button>

      <Err
        isOpen={isPopupOpen}
        onClose={closePopup}
        content="Contenu du Pop-up"
      />
    </div>
  );
}

export default Error;