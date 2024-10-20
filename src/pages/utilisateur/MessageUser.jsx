/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import '../../assets/messageUser.css';
import { useNavigate } from "react-router-dom";

function MessageUser({ conversation }) {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [refresh, setRefresh] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        console.log("email : ", sessionStorage.getItem("email"));

        if (!token) {
            navigate("/login");
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/conversation/list-message/${conversation.vendeur.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setMessages(response.data.data[0]);
                console.log("messages : ", response.data.data[0]);
                scrollToBottom();
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [refresh, navigate, conversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, conversation]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

        const formDataToSend = new FormData();
        formDataToSend.append("contenu_message", newMessage);

        try {
            const response = await axios.post(`http://localhost:8080/conversation/save-message/${conversation.vendeur.id}`, formDataToSend, {
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
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="message-app">
            <div className="chat-window-user">
                <div className="chat-header-user d-flex align-items-center justify-content-between p-2 bg-info text-white">
                    <span>{conversation.vendeur.prenom} {conversation.vendeur.nom}</span>
                </div>
                <div className="chat-body-user p-2 overflow-auto">
                    {messages.map(message => (
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
                                <div className={`chat-text-user p-2 rounded ${message.expediteur.utilisateur.email === sessionStorage.getItem("email") ? 'bg-info text-white' : 'bg-light'}`}>
                                    {message.contenuMessage}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-footer-user p-2 border-top">
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
            </div>
        </div>
    );
}

export default MessageUser;
