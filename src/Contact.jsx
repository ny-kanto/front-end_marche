import { useState } from 'react';
import './assets/style.css';
import Contatc from './component/Popup';

function Contact() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <h1>Contact</h1>
      <button onClick={openPopup}>Ouvrir le Pop-up</button>

      <Contatc
        isOpen={isPopupOpen}
        onClose={closePopup}
        content="Contenu du Pop-up"
      />
    </div>
  );
}

export default Contact;