import React, { useState } from 'react';
import './HomePageUtente.css'
import {useNavigate} from "react-router-dom";
import {getTypeIcon} from './utils';
import {ChevronUp, ChevronDown, Filter, Search, X} from 'lucide-react';

const mockIssues = [
    { id: 101, title: "Errore nel login con Google", type: "Bug", priority: 5, status: "Aperta" },
    { id: 102, title: "Richiesta documentazione API", type: "Documentation", priority: 2, status: "Chiusa" },
    { id: 103, title: "Aggiungere Dark Mode", type: "Feature", priority: 3, status: "In Corso" },
    { id: 104, title: "Disallineamento Navbar su Mobile", type: "Bug", priority: 4, status: "Aperta" },
    { id: 105, title: "Come resettare la password?", type: "Question", priority: 1, status: "Chiusa" },
    { id: 106, title: "Errore 404 su pagina profilo", type: "Bug", priority: 5, status: "Aperta" },
    { id: 107, title: "Migliorare performance dashboard", type: "Feature", priority: 3, status: "In Corso" },
    { id: 108, title: "Traduzione incompleta in Inglese", type: "Bug", priority: 2, status: "Aperta" },
    { id: 109, title: "Aggiornare termini e condizioni", type: "Documentation", priority: 1, status: "Chiusa" },
    { id: 110, title: "Il footer si sovrappone al contenuto", type: "Bug", priority: 3, status: "Aperta" },
    { id: 111, title: "Richiesta export in PDF", type: "Feature", priority: 4, status: "In Corso" },
    { id: 112, title: "Login lento da Safari", type: "Bug", priority: 4, status: "Aperta" },
    { id: 113, title: "Dove trovo la mia API Key?", type: "Question", priority: 1, status: "Chiusa" },
    { id: 114, title: "Crash dell'app su upload immagini", type: "Bug", priority: 5, status: "Aperta" },
    { id: 115, title: "Nuovo layout per le impostazioni", type: "Feature", priority: 2, status: "In Corso" },
];

export default function HomePageUtente() {

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const allFilteredIssues = mockIssues.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //const myIssues = allFilteredIssues.filter(issue => issue.assignee === "Me");

    const projectIssues = allFilteredIssues;

    const [filterType, setFilterType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterPriority, setFilterPriority] = useState("All");

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const filteredIssues = mockIssues.filter(issue => {
        const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "All" || issue.type === filterType;
        const matchesStatus = filterStatus === "All" || issue.status === filterStatus;
        const matchesPriority = filterPriority === "All" || issue.priority == filterPriority;
        return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });

    const sortedIssues = [...filteredIssues].sort((a, b) => {
        if (!sortConfig.key) return 0; // Se nessun ordinamento è attivo, lascia così

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <ChevronDown size={16} className="sort-icon inactive" />;
        }
        return sortConfig.direction === 'asc'
            ? <ChevronUp size={16} className="sort-icon active" />
            : <ChevronDown size={16} className="sort-icon active" />;
    };

    const resetFilters = () => {
        setSearchTerm("");
        setFilterType("All");
        setFilterStatus("All");
        setFilterPriority("All");
    };

    const renderRow = (issue) => (
        <div key={issue.id} className="issue-row" onClick={() => navigate(`/dettaglio-issue/${issue.id}`)}>
            <div className="col col-title">
                <span className="issue-title-text">{issue.title}</span>
            </div>

            <div className="col col-priority">
                <div className="priority-bar-track">
                    <div
                        className="priority-bar-fill"
                        style={{ width: `${(issue.priority / 5) * 100}%` }}
                    ></div>
                </div>
                <span className="priority-text">{issue.priority}/5</span>
            </div>

            <div className="col col-type">
                <div className={`type-badge type-${issue.type.toLowerCase()}`}>
                    {getTypeIcon(issue.type)}
                    <span>{issue.type}</span>
                </div>
            </div>
        </div>
    );



    return (
        <div className="homepage">
            <div className="homepage-container">
                <h1>Issues</h1>
            </div>

                <div className="header-row">
                    <h1>Le tue issue assegnate</h1>
                </div>

            <div className="filters-container">
                <div className="filters-group">
                    <Filter size={18} className="filter-label-icon" />
                    <span className="filter-label-text">Filtra per:</span>

                    <select
                        className={`filter-select ${filterType !== "All" ? "active" : ""}`}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">Tutti i Tipi</option>
                        <option value="Bug">Bug</option>
                        <option value="Feature">Feature</option>
                        <option value="Documentation">Documentation</option>
                        <option value="Question">Question</option>
                    </select>

                    <select
                        className={`filter-select ${filterStatus !== "All" ? "active" : ""}`}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">Tutti gli Stati</option>
                        <option value="To-do">To-do</option>
                        <option value="Assegnata">Assegnata</option>
                        <option value="Risolta">Risolta</option>
                    </select>

                    <select
                        className={`filter-select ${filterPriority !== "All" ? "active" : ""}`}
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="All">Tutte le Priorità</option>
                        <option value="5">5 - Critica</option>
                        <option value="4">4 - Alta</option>
                        <option value="3">3 - Media</option>
                        <option value="2">2 - Bassa</option>
                        <option value="1">1 - Minima</option>
                    </select>

                    <div className="search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Cerca per titolo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                </div>

                {(filterType !== "All" || filterStatus !== "All" || filterPriority !== "All" || searchTerm) && (
                    <button className="btn-reset-filters" onClick={resetFilters}>
                        <X size={16} /> Resetta filtri
                    </button>
                )}



            </div>

                <div className="issues-table-container">

                    <div className="issues-header">
                        <div className="col col-title sortable-header" onClick={() => handleSort('title')}>
                            Titolo {renderSortIcon('title')}
                        </div>
                        <div className="col col-priority sortable-header" onClick={() => handleSort('priority')}>
                            Priorità {renderSortIcon('priority')}
                        </div>
                        <div className="col col-type sortable-header" onClick={() => handleSort('type')}>
                            Tipo {renderSortIcon('type')}
                        </div>
                    </div>

                    <div className="issues-list">
                        {sortedIssues.length > 0 ? (
                            sortedIssues.map((issue) => (
                                <div key={issue.id} className="issue-row"

                                     onClick={() => navigate(`/VisualizzaIssue/${issue.id}`)}
                                >
                                    <div className="col col-title">
                                        <span className="issue-title-text">{issue.title}</span>
                                    </div>

                                    <div className="col col-priority">
                                        <div className="priority-bar-track">
                                            <div
                                                className="priority-bar-fill"
                                                style={{ width: `${(issue.priority / 5) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="priority-text">{issue.priority}/5</span>
                                    </div>

                                    <div className="col col-type">
                                        <div className={`type-badge type-${issue.type.toLowerCase()}`}>
                                            {getTypeIcon(issue.type)}
                                            <span>{issue.type}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>Nessuna issue trovata.</p>
                            </div>
                        )}
                    </div>
                </div>

            <div className="header-row" style={{ marginTop: '40px' }}> {/* Spazio extra sopra */}
                <h1>Issue del progetto</h1>
            </div>

            <div className="filters-container">
                <div className="filters-group">
                    <Filter size={18} className="filter-label-icon" />
                    <span className="filter-label-text">Filtra per:</span>

                    <select
                        className={`filter-select ${filterType !== "All" ? "active" : ""}`}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">Tutti i Tipi</option>
                        <option value="Bug">Bug</option>
                        <option value="Feature">Feature</option>
                        <option value="Documentation">Documentation</option>
                        <option value="Question">Question</option>
                    </select>

                    <select
                        className={`filter-select ${filterStatus !== "All" ? "active" : ""}`}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">Tutti gli Stati</option>
                        <option value="To-do">To-do</option>
                        <option value="Assegnata">Assegnata</option>
                        <option value="Risolta">Risolta</option>
                    </select>

                    <select
                        className={`filter-select ${filterPriority !== "All" ? "active" : ""}`}
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="All">Tutte le Priorità</option>
                        <option value="5">5 - Critica</option>
                        <option value="4">4 - Alta</option>
                        <option value="3">3 - Media</option>
                        <option value="2">2 - Bassa</option>
                        <option value="1">1 - Minima</option>
                    </select>

                    <div className="search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Cerca per titolo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                </div>

                {(filterType !== "All" || filterStatus !== "All" || filterPriority !== "All" || searchTerm) && (
                    <button className="btn-reset-filters" onClick={resetFilters}>
                        <X size={16} /> Resetta filtri
                    </button>
                )}



            </div>


            <div className="issues-table-container">
                <div className="issues-header">
                    <div className="col col-title">Titolo</div>
                    <div className="col col-priority">Priorità</div>
                    <div className="col col-type">Tipo</div>
                </div>

                <div className="issues-list">
                    {projectIssues.length > 0 ? (
                        projectIssues.map(issue => renderRow(issue))
                    ) : (
                        <div className="no-results">
                            <p>Nessuna issue nel progetto.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}