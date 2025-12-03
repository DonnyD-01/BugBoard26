import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DettaglioIssue.css';
import { ArrowLeft, AlertCircle, CheckCircle, FileText, Clock, Construction,  CircleCheckBig} from 'lucide-react';
import {BiQuestionMark} from "react-icons/bi";

const mockIssues = [
    { id: 101, title: "Errore nel login con Google", type: "Bug", priority: 5, status: "Aperta", author: "Mario Rossi", date: "2023-10-01", description: "Quando provo a cliccare sul tasto 'Accedi con Google', la pagina si ricarica ma non effettua il login. Ho provato da Chrome e Firefox." },
    { id: 102, title: "Richiesta documentazione API", type: "Documentation", priority: 2, status: "Chiusa", author: "Luigi Verdi", date: "2023-09-28", description: "Avrei bisogno della documentazione aggiornata per gli endpoint relativi al profilo utente." },
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

    const getTypeIcon = (type) => {
        switch(type) {
            case "Bug": return <AlertCircle size={20} />;
            case "Feature": return <CheckCircle size={20} />;
            case "Documentation": return <FileText size={20} />;
            case "Question": return <BiQuestionMark size={20}/>;
            default: return <Clock size={20} />;
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case "Aperta": return <Clock size={20}/>;
            case "In Corso": return <Construction size={20}/>;
            case "Chiusa": return <CircleCheckBig size={20}/>
        }
    }

    const getStatusColor = (status) => {
        switch(status) {
            case "Aperta": return "status-open";
            case "In Corso": return "status-progress";
            case "Chiusa": return "status-closed";
            default: return "";
        }
    };

    return (
        <div className="page-wrapper">

            <div className="homepage-container detail-container">

                <button className="btn-indietro" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} /> Torna alla lista
                </button>

                <div className="issue-detail-card">

                    <div className="detail-header">
                        <div className={`detail-type-badge type-${issue.type?.toLowerCase()}`}>
                            {getTypeIcon(issue.type)}
                            {issue.type}
                        </div>
                        <div className={`detail-status-badge ${getStatusColor(issue.status)}`}>
                            {getStatusIcon(issue.status)}
                            <span>{issue.status}</span>
                        </div>
                    </div>

                    <div className="id-testo">
                        <span className="meta-label">ID:</span> #{issue.id}
                    </div>

                    <hr className="detail-divider" />

                    <h1 className="detail-title">{issue.title}</h1>

                    <div className="detail-section">
                        <p className="detail-description">
                            {issue.description || "Nessuna descrizione fornita."}
                        </p>
                    </div>

                    <div className="detail-section">
                        <h3>Priorità</h3>
                        <div className="detail-priority-wrapper">
                            <div className="priority-bar-track large">
                                <div
                                    className="priority-bar-fill"
                                    style={{ width: `${(issue.priority / 5) * 100}%` }}
                                ></div>
                            </div>
                            <span className="priority-text-large">{issue.priority}/5</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}