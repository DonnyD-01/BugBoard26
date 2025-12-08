import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DettaglioUtente.css';
import { ArrowLeft, Save, X, Edit2, Trash2, User, ShieldCheck, Mail, Phone, Calendar, Hash } from 'lucide-react';

const mockUsers = [
    { id: 1, nome: "Mario", cognome: "Rossi", email: "mario.rossi@email.com", telefono: "+39 333 1112233", dataNascita: "1985-05-12", role: "user" },
    { id: 2, nome: "Luigi", cognome: "Verdi", email: "luigi.admin@bugboard.it", telefono: "+39 333 4445566", dataNascita: "1990-10-20", role: "admin" },
    { id: 3, nome: "Anna", cognome: "Bianchi", email: "anna.bianchi@email.com", telefono: "+39 333 7778899", dataNascita: "1995-02-14", role: "user" },
    { id: 4, nome: "Gennaro", cognome: "Esposito", email: "gennaro.dev@email.com", telefono: "+39 333 1234567", dataNascita: "1990-05-12", role: "user" },
    { id: 5, nome: "Sofia", cognome: "Neri", email: "sofia.lead@bugboard.it", telefono: "+39 333 9990000", dataNascita: "1988-11-30", role: "admin" },
    { id: 6, nome: "Marco", cognome: "Gialli", email: "marco.gialli@email.com", telefono: "+39 333 5551122", dataNascita: "2000-01-01", role: "user" },
];

export default function DettaglioUtente() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);

    useEffect(() => {
        // Simulazione fetch dal database
        const foundUser = mockUsers.find(u => u.id === parseInt(id));
        if (foundUser) {
            setUser(foundUser);
            setEditedData(foundUser);
        } else {
            // Gestione utente non trovato
            alert("Utente non trovato!");
            navigate('/admin/gestione-utenze');
        }
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Qui andrebbe la chiamata API per aggiornare l'utente
        setUser(editedData);
        setIsEditing(false);
        console.log("Utente aggiornato:", editedData);
    };

    const handleCancel = () => {
        setEditedData(user);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm(`Sei sicuro di voler eliminare l'utente ${user.nome} ${user.cognome}? Questa azione è irreversibile.`)) {
            console.log("Utente eliminato ID:", user.id);
            navigate('/admin/gestione-utenze');
        }
    };

    if (!user) return <div>Caricamento...</div>;

    return (
        <div className="page-wrapper">
            <div className="detail-container">

                <div className="top-actions-row">
                    <button className="btn-indietro" onClick={() => navigate('/admin/gestione-utenze')}>
                        <ArrowLeft size={20} /> Torna alla gestione
                    </button>

                    <div className="actions-group">
                        {!isEditing ? (
                            <>
                                <button className="btn-action-edit" onClick={() => setIsEditing(true)}>
                                    <Edit2 size={18} /> Modifica Dati
                                </button>
                                <button className="btn-action-delete" onClick={handleDelete}>
                                    <Trash2 size={18} /> Elimina Utente
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn-action-save" onClick={handleSave}>
                                    <Save size={18} /> Salva
                                </button>
                                <button className="btn-action-cancel" onClick={handleCancel}>
                                    <X size={18} /> Annulla
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* --- INFO PRINCIPALI --- */}
                <div className="user-header">
                    <div className="user-title-block">
                        <h1>{user.nome} {user.cognome}</h1>
                        <span className="user-id-badge">#{user.id}</span>
                    </div>

                    {/* Badge Ruolo (Dinamico in visualizzazione) */}
                    {!isEditing && (
                        <div className={`role-badge-large ${user.role}`}>
                            {user.role === 'admin' ? <ShieldCheck size={20}/> : <User size={20}/>}
                            <span>{user.role === 'admin' ? "Amministratore" : "Utente Standard"}</span>
                        </div>
                    )}
                </div>

                <hr className="divider" />

                {/* --- FORM DATI --- */}
                <div className="form-grid">

                    {/* ID (Sempre disabilitato) */}
                    <div className="floating-label-group disabled-group">
                        <input type="text" value={user.id} className="campo disabled-input" disabled />
                        <label className="floating-label">ID Sistema</label>
                        <Hash className="input-icon-right" size={20}/>
                    </div>

                    {/* Ruolo (Modificabile solo in Edit) */}
                    <div className={`floating-label-group ${!isEditing ? "disabled-group" : ""}`}>
                        {isEditing ? (
                            <select
                                name="role"
                                value={editedData.role}
                                onChange={handleInputChange}
                                className="campo"
                            >
                                <option value="user">Utente Standard</option>
                                <option value="admin">Amministratore</option>
                            </select>
                        ) : (
                            <input type="text" value={user.role === 'admin' ? 'Amministratore' : 'Utente Standard'} className="campo disabled-input" disabled />
                        )}
                        <label className="floating-label">Ruolo</label>
                    </div>

                    {/* Nome */}
                    <div className={`floating-label-group ${!isEditing ? "disabled-group" : ""}`}>
                        <input
                            type="text" name="nome"
                            value={isEditing ? editedData.nome : user.nome}
                            onChange={handleInputChange} disabled={!isEditing}
                            className={`campo ${!isEditing ? "disabled-input" : ""}`} placeholder=" "
                        />
                        <label className="floating-label">Nome</label>
                    </div>

                    {/* Cognome */}
                    <div className={`floating-label-group ${!isEditing ? "disabled-group" : ""}`}>
                        <input
                            type="text" name="cognome"
                            value={isEditing ? editedData.cognome : user.cognome}
                            onChange={handleInputChange} disabled={!isEditing}
                            className={`campo ${!isEditing ? "disabled-input" : ""}`} placeholder=" "
                        />
                        <label className="floating-label">Cognome</label>
                    </div>

                    {/* Data Nascita */}
                    <div className={`floating-label-group ${!isEditing ? "disabled-group" : ""}`}>
                        <input
                            type="date" name="dataNascita"
                            value={isEditing ? editedData.dataNascita : user.dataNascita}
                            onChange={handleInputChange} disabled={!isEditing}
                            className={`campo ${!isEditing ? "disabled-input" : ""}`} placeholder=" "
                        />
                        <label className="floating-label">Data di Nascita</label>
                        {!isEditing && <Calendar className="input-icon-right" size={20}/>}
                    </div>

                    {/* Telefono */}
                    <div className={`floating-label-group ${!isEditing ? "disabled-group" : ""}`}>
                        <input
                            type="tel" name="telefono"
                            value={isEditing ? editedData.telefono : user.telefono}
                            onChange={handleInputChange} disabled={!isEditing}
                            className={`campo ${!isEditing ? "disabled-input" : ""}`} placeholder=" "
                        />
                        <label className="floating-label">Telefono</label>
                        {!isEditing && <Phone className="input-icon-right" size={20}/>}
                    </div>

                    {/* Email (Full Width) */}
                    <div className={`floating-label-group full-width ${!isEditing ? "disabled-group" : ""}`}>
                        <input
                            type="email" name="email"
                            value={isEditing ? editedData.email : user.email}
                            onChange={handleInputChange} disabled={!isEditing}
                            className={`campo ${!isEditing ? "disabled-input" : ""}`} placeholder=" "
                        />
                        <label className="floating-label">Email Aziendale</label>
                        {!isEditing && <Mail className="input-icon-right" size={20}/>}
                    </div>

                </div>
            </div>
        </div>
    );
}