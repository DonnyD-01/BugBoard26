import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DettaglioIssue.css';
import { ArrowLeft} from 'lucide-react';
import {getTypeIcon, getStatusIcon, getStatusColor} from './utils';

const mockIssues = [
    { id: 101, title: "Errore nel login con Google", type: "Bug", priority: 5, status: "Assegnata", author: "Mario Rossi", date: "2023-10-01", description: "Quando provo a cliccare sul tasto 'Accedi con Google', la pagina si ricarica ma non effettua il login. Ho provato da Chrome e Firefox.", image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1000" },
    { id: 102, title: "Richiesta documentazione API", type: "Feature", priority: 2, status: "Risolta", author: "Luigi Verdi", date: "2023-09-28", description: "Avrei bisogno della documentazione aggiornata per gli endpoint relativi al profilo utente.", image: null },
];

export default function DettaglioIssue() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState(null);

    useEffect(() => {
        const foundIssue = mockIssues.find(i => i.id === parseInt(id));

                if (foundIssue) {
            setIssue(foundIssue);
        } else {

            setIssue({
                id: id,
                title: "Issue non trovata nel mock locale",
                description: "Dettaglio non disponibile perché l'ID non è presente nell'array mockIssues di questo file. Copia l'array completo da VisualizzaIssue.js per vederla.",
                type: "Sconosciuto",
                priority: 0,
                status: "Errore",
                author: "Sistema",
            });
        }
    }, [id]);

    if (!issue) return <div>Caricamento...</div>;

    return (
        <div className="page-wrapper">

            <div className="homepage-container detail-container">

                <button className="btn-indietro" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} /> Torna alla lista
                </button>


                <div className={`detail-status-badge ${getStatusColor(issue.status)}`}>
                    {getStatusIcon(issue.status)}
                    <span>{issue.status}</span>
                </div>

                <div className="detail-header">
                    <div className="id-testo">
                        <span className="meta-label">ID:</span> #{issue.id}
                    </div>
                    <div className={`detail-type-badge type-${issue.type?.toLowerCase()}`}>
                        {getTypeIcon(issue.type, 20)}
                        {issue.type}
                    </div>
                </div>

                    <hr className="divider" />

                    <h1 className="detail-title">{issue.title}</h1>


                <p className="detail-description">
                    {issue.description || "Nessuna descrizione fornita."}
                </p>

                    <div className="detail-section">
                        <h3>Priorità</h3>
                        <div className="detail-priority-wrapper">
                            <div className="priority-bar-track-large">
                                <div
                                    className="priority-bar-fill-fluid"
                                    style={{ width: `${(issue.priority / 5) * 100}%` }}
                                ></div>
                            </div>
                            <span className="priority-text-large">{issue.priority}/5</span>
                        </div>
                    </div>
                {issue.image && (
                    <div className="detail-section">
                        <h3>Immagine</h3>
                        <div className="detail-image-container">
                            <img src={issue.image} alt="Allegato issue" className="detail-image" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}