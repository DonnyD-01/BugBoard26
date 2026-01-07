import React, {useEffect} from 'react';
import './DettaglioUtente.css';
import { X, ShieldCheck, User, Mail, Phone, Calendar} from 'lucide-react';

export default function DettaglioUtente({ user, onClose }) {

    const formatDate = (dateString) => {
        if (!dateString) return "Non disponibile";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!user) return null;

    return (
        <div className="panel-overlay">
            <div className="panel-card">

                <div className="panel-header">
                    <h2>Dettaglio Utente</h2>
                    <button className="btn-close-panel" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="panel-content">

                    <div className="user-intro">
                        <h1>{user.nome} {user.cognome}</h1>

                        <div className={`role-badge-large ${user.role}`}>
                            {user.role === 'admin' ? <ShieldCheck size={18} /> : <User size={18} />}
                            <span>{user.role === 'admin' ? "Admin" : "Utente"}</span>
                        </div>
                    </div>

                    <hr className="divider" />

                    <div className="info-grid">

                        <div className="info-item">
                            <label><Calendar size={16} /> Data di Nascita</label>
                            <p>{formatDate(user.dataNascita)}</p>
                        </div>

                        <div className="info-item">
                            <label><Phone size={16} /> Telefono</label>
                            <a
                                href={`tel:${user.telefono}`}
                                className="interactive-data-link"
                                title="Clicca per chiamare"
                            >{user.telefono}
                            </a>
                        </div>

                        <div className="info-item">
                            <label><Mail size={14} /> Email</label>
                            <a
                                href={`mailto:${user.email}`}
                                className="interactive-data-link email-link"
                                title="Clicca per inviare email"
                            >
                                {user.email}
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}