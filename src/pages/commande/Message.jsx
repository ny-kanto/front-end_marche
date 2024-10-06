import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { FaTimes, FaMinus } from 'react-icons/fa';
import { Form, Button, InputGroup } from 'react-bootstrap';
import '../../assets/message.css';

function Message({ acheteurId, onClose }) {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); 
  const [oneMessage, setOneMessage] = useState ({
    id: "",
    contenuMessage: "",
    conversation: {id: "", vendeur: {id: "", nom: "", prenom: ""}, acheteur: {id: "", nom: "", prenom: ""}},
    dateMessage: "",
    expediteur: {id: "", nom: "", prenom: ""}
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("token front : ", token);
    console.log("email front : ", sessionStorage.getItem("email"));

    if (!token) {
      navigate("/login");
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/message/list/${acheteurId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("data 0 : ", response.data.data[0]);
        setMessages(response.data.data[0]);
        setOneMessage(response.data.data[0][0]);
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

    fetchMessages();
  }, [navigate, refresh, acheteurId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("contenu_message", newMessage);

    try {
      const response = await axios.post(`http://localhost:8080/message/save-message/${acheteurId}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Réponse ", response.data.data[0]);

      if (response.status === 200) {
        setNewMessage('');
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const toggleChat = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className="floating-message-container">
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
        <div className="chat-header d-flex align-items-center justify-content-between p-2 bg-info text-white">
          <span>{oneMessage.conversation.acheteur.prenom} {oneMessage.conversation.acheteur.nom}</span>
          <div className="chat-controls">
            <FaTimes onClick={toggleChat} className="cursor-pointer" />
          </div>
        </div>
        {isOpen && (
          <>
            <div className="chat-body p-2 overflow-auto">
              {messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.expediteur.utilisateur.email === sessionStorage.getItem("email") ? 'text-end' : ''}`}>
                  <div
                    className={`chat-text d-inline-block p-2 rounded ${message.expediteur.utilisateur.email === sessionStorage.getItem("email") ? 'bg-info text-white' : 'bg-light'
                      }`}
                  >
                    {message.contenuMessage}
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-footer p-2 border-top">
              <InputGroup>
                <Form.Control
                  placeholder="Ecrivez un message ..."
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="info" style={{ color: "white" }} onClick={handleSendMessage}>
                  Envoyer
                </Button>
              </InputGroup>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
