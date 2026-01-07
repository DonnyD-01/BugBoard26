import React, {useEffect, useState} from 'react';
import './GestisciUtenti.css';
import { createPortal } from 'react-dom';
import { X, Search, UserCheck } from 'lucide-react';
import { getUsersByProjectId } from './services/api';
import LoadingSpinner from "./LoadingSpinner";

export default function AssegnaIssue({ projectId, onSelect, onClose }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!projectId) {
                console.error("AssegnaIssue: projectId mancante!");
                setError("ID Progetto non valido.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getUsersByProjectId(projectId);

                if (!data || !Array.isArray(data)) {
                    setUsersList([]);
                    return;
                }

                setUsersList(data);
            } catch (err) {
                console.error("Errore recupero utenti:", err);
                setError("Impossibile caricare la lista utenti.");
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchUsers();
        }
    }, [projectId]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const filteredUsers = usersList.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const modalContent = (
        <div className="panel-overlay">
            <div className="panel-card wide-panel">

                <div className="panel-header">
                    <h2>Assegna Issue a un Membro del Team</h2>
                    <button className="btn-close-panel" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="panel-content">
                    <p className="panel-description">
                        Seleziona l'utente del team a cui assegnare la issue.
                    </p>

                    <div className="modal-search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Cerca membro..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="users-table-container modal-table">
                        <div className="users-header-panel-assigneed">
                            <div className="u-col u-col-name">Nome</div>
                            <div className="u-col u-col-surname">Cognome</div>
                            <div className="u-col u-col-email">Email</div>
                            <div className="u-col u-col-actions" style={{justifyContent: 'center'}}>Assegna</div>
                        </div>

                        <div className="users-list modal-list">
                            {loading ? (
                                <div className="loading-row" style={{padding: 0, textAlign:'center'}}>
                                    <LoadingSpinner message={"Caricamento utenti..."} paddingTop="30px"/>
                                </div>
                            ) : error ? (
                                <div className="error-row" style={{padding: 20, textAlign:'center', color:'red'}}>
                                    {error}
                                </div>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="modal-user-row"
                                        onClick={() => onSelect(user)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="u-col u-col-name">{user.nome}</div>
                                        <div className="u-col u-col-surname">{user.cognome}</div>
                                        <div className="u-col u-col-email">{user.email}</div>

                                        <div className="u-col u-col-actions" style={{justifyContent: 'center'}}>
                                            <button className="btn-icon-assign">
                                                <UserCheck size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">Nessun utente disponibile trovato.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
}