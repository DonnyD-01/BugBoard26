import React, { useState, useEffect } from 'react';
import './Profilo.css';
import {CircleCheck, Edit2, Save, ShieldCheck, X, EyeOff, Eye} from 'lucide-react';

export default function Profilo() {

    const [showSuccess, setShowSuccess] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const userRole = localStorage.getItem("userRole");
    const isAdmin = userRole === "admin";

    const [userData, setUserData] = useState({
        id: "882910",
        nome: "Gennaro",
        cognome: "Esposito",
        dataNascita: "1990-05-12",
        email: "gennaro.esposito@email.com",
        password: "passwordSegreta123",
        telefono: "+39 333 1234567"
    });

    const [originalData, setOriginalData] = useState(null);

    const handleStartEdit = () => {
        setOriginalData({ ...userData });
        setUserData(prev => ({ ...prev, vecchiaPassword: "", nuovaPassword: "" }))
        setIsEditing(true);
    };

    const handleCancel = () => {
        setUserData(originalData);
        setOriginalData(null);
        setIsEditing(false);
        setShowPassword(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log("Dati salvati:", {email: userData.email, telefono: userData.telefono});

        if (userData.nuovaPassword) {
            setUserData(prev => ({ ...prev, password: prev.nuovaPassword }));
        }

        setShowSuccess(true);
        setIsEditing(false);
        setOriginalData(null);
        setShowPassword(false);
    };

    useEffect(() => {
        if(showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    return (
        <div className="homepage-container">

            {showSuccess && (
                <div className="success-overlay">
                    <div className="success-card">
                        <CircleCheck size={64} className="success-icon" />
                        <h2>Fatto!</h2>
                        <p>Le modifiche sono state salvate con successo.</p>

                        <button
                            className="btn-close-success"
                            onClick={() => {
                                setShowSuccess(false);
                            }}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}

                <div className="profile-header-row">
                    <div className="profile-header">
                        <h1>Il mio Profilo</h1>
                        <p>Gestisci le tue informazioni personali e di contatto</p>
                    </div>

                        {isAdmin && (
                            <div className="admin-badge">
                                <ShieldCheck size={20} />
                                <span>Amministratore</span>
                            </div>
                        )}
                </div>


                    <h3 className="section-title">Dati Personali <span
                        className="read-only-tag">(Non modificabili)</span></h3>

                    <div className="form-grid">
                        <div className="floating-label-group disabled-group">
                            <input
                                type="text"
                                value={userData.nome}
                                className="campo disabled-input"
                                disabled
                            />
                            <label className="floating-label">Nome</label>
                        </div>

                        <div className="floating-label-group disabled-group">
                            <input
                                type="text"
                                value={userData.cognome}
                                className="campo disabled-input"
                                disabled
                            />
                            <label className="floating-label">Cognome</label>
                        </div>

                        <div className="floating-label-group disabled-group">
                            <input
                                type="date"
                                value={userData.dataNascita}
                                className="campo disabled-input"
                                disabled
                            />
                            <label className="floating-label">Data di Nascita</label>
                        </div>
                    </div>

                    <hr className="divider"/>

                <div className="section-header-editable">
                <h3 className="section-title">Contatti <span
                        className="editable-tag">(Modificabili)</span>
                    {isEditing && <span className="editable-tag">(In modifica)</span>}

                </h3>
                    {!isEditing ? (
                        <button className="btnSalva" onClick={handleStartEdit}>
                            <Edit2 size={16} /> Modifica
                        </button>
                    ) : (
                        <div className="buttons-group">
                            <button className="btn-save-contact" onClick={handleSave}>
                                <Save size={16} /> Salva
                            </button>
                            <button className="btn-cancel-contact" onClick={handleCancel}>
                                <X size={16} /> Annulla
                            </button>
                        </div>
                    )}
                </div>

                    <div className="form-grid">
                        <div className={`floating-label-group ${!isEditing ? "disabled-group" : ""}`}>
                            <input
                                type="tel"
                                name="telefono"
                                value={userData.telefono}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`campo ${!isEditing ? "disabled-input" : ""}`}
                                placeholder=" "
                            />
                            <label className="floating-label">Numero di Telefono</label>
                        </div>

                        <div className={`floating-label-group ${!isEditing ? "disabled-group" : ""}`}>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`campo ${!isEditing ? "disabled-input" : ""}`}
                                placeholder=" "
                            />
                            <label className="floating-label">Email</label>
                        </div>

                        {!isEditing ? (
                            <div className="floating-label-group disabled-group">
                                <input
                                    type="password"
                                    value={userData.password}
                                    className="campo disabled-input"
                                    disabled
                                    placeholder=" "
                                />
                                <label className="floating-label">Password</label>
                            </div>
                        ) : (
                            <>
                                <div className="floating-label-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="vecchiaPassword"
                                        value={userData.vecchiaPassword}
                                        onChange={handleChange}
                                        className="campo"
                                        placeholder=" "
                                    />
                                    <label className="floating-label">Vecchia Password</label>
                                    <button className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                    </button>
                                </div>

                                <div className="floating-label-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="nuovaPassword"
                                        value={userData.nuovaPassword}
                                        onChange={handleChange}
                                        className="campo"
                                        placeholder=" "
                                    />
                                    <label className="floating-label">Nuova Password</label>
                                </div>
                            </>
                        )}
                    </div>
        </div>
    );
}