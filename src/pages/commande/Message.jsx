/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { Form, Button, InputGroup } from 'react-bootstrap';
import '../../assets/message.css';

function Message({ acheteurId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState({
    id: "", vendeur: { id: "", nom: "", prenom: "" }, acheteur: { id: "", nom: "", prenom: "" }
  });
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

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

        setMessages(response.data.data[0]);
        // setOneMessage(response.data.data[0][0]);
        setConversations(response.data.data[1]);
        // console.log("one message : ", response.data.data[0][0]);
        console.log("conversations : ", response.data.data[1]);
        scrollToBottom();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/error/403");
        } else if (error.response && error.response.status === 404) {
          navigate("/error/404");
        } else {
          setError(error.message);
        }
      }
    };

    fetchMessages();
  }, [navigate, refresh, acheteurId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      });

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
          {conversations ? (
            <span>
              {conversations.acheteur.prenom} {conversations.acheteur.nom}
            </span>
          ) : (
            <span>Conversation</span>
          )}
          <div className="chat-controls">
            <FaTimes onClick={toggleChat} className="cursor-pointer" />
          </div>
        </div>
        {isOpen && (
          <>
            <div className="chat-body p-2 overflow-auto">
              {messages && messages.length > 0 ? (
                <>
                  {messages.map((message) => (
                    <div key={message.id} className={`mb-2 d-flex ${message.expediteur.utilisateur.email === sessionStorage.getItem("email") ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div>
                        <small className={`text-muted d-block ${message.expediteur.utilisateur.email === sessionStorage.getItem("email") ? 'text-end' : 'text-start'}`}>
                          {new Date(message.dateMessage).toLocaleString('fr-FR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </small>
                        <div
                          className={`chat-text d-inline-block p-2 rounded ${message.expediteur.utilisateur.email === sessionStorage.getItem("email") ? 'bg-info text-white' : 'bg-light'}`}
                        >
                          {message.contenuMessage}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <p>Aucun message pour cette conversation.</p>
              )}
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
