import React, { useState } from 'react';
import './GestisciUtenti.css';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from './utils';
import { Search, ChevronDown, ChevronUp, UserPlus, Trash2, ShieldCheck, User2 } from "lucide-react";

export default function GestisciUtenti() {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All"); // 'All', 'admin', 'user'
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch =
            user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === "All" || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
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
        if (sortConfig.key !== columnKey) return <ChevronDown size={16} className="sort-icon inactive" />;
        return sortConfig.direction === 'asc'
            ? <ChevronUp size={16} className="sort-icon active" />
            : <ChevronDown size={16} className="sort-icon active" />;
    };

    const handleAddUser = () => {
        console.log("Naviga a creazione Utente");
        navigate('/admin/nuovo-utente');
    };

    return (
        <div className="homepage">
            <div className="homepage-container">
                <h1>Gestisci Utenze</h1>
            </div>

            <div className="action-buttons-group">
                <button className="btn-action btn-add-user" onClick={handleAddUser}>
                        <UserPlus size={18} /> Aggiungi Utente
                </button>
            </div>

            <div className="users-filters-container">
                <div className="filters-left">
                    <div className="search-box">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Cerca per nome, cognome o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="filters-right">
                    <span className="filter-label">Filtra per ruolo:</span>
                    <div className="role-toggle-slider">

                        <div
                            className={`sliding-pill ${
                                roleFilter === 'All' ? 'pos-0' :
                                    roleFilter === 'admin' ? 'pos-1' : 'pos-2'
                            }`}
                        />
                        <button
                            className={`slider-btn ${roleFilter === 'All' ? 'active' : ''}`}
                            onClick={() => setRoleFilter('All')}
                        >
                            Tutti
                        </button>
                        <button
                            className={`slider-btn-admin ${roleFilter === 'admin' ? 'active' : ''}`}
                            onClick={() => setRoleFilter('admin')}
                        >
                            <ShieldCheck size="18"/> Admin
                        </button>
                        <button
                            className={`slider-btn-user ${roleFilter === 'user' ? 'active' : ''}`}
                            onClick={() => setRoleFilter('user')}
                        >
                            <User2 size="18"/> Utenti
                        </button>
                    </div>
                </div>
            </div>

            <div className="users-table-container">
                <div className="users-header">
                    <div className="u-col u-col-id sortable-header" onClick={() => handleSort('id')}>
                        ID {renderSortIcon('id')}
                    </div>
                    <div className="u-col u-col-name sortable-header" onClick={() => handleSort('nome')}>
                        Nome {renderSortIcon('nome')}
                    </div>
                    <div className="u-col u-col-surname sortable-header" onClick={() => handleSort('cognome')}>
                        Cognome {renderSortIcon('cognome')}
                    </div>
                    <div className="u-col u-col-email">
                        Email
                    </div>
                    <div className="u-col u-col-role">
                        Ruolo
                    </div>
                    <div className="u-col u-col-actions">
                        Azioni
                    </div>
                </div>

                <div className="users-list">
                    {sortedUsers.length > 0 ? (
                        sortedUsers.map((user) => (
                            <div key={user.id} className="user-row" onClick={() => navigate(`/dettaglio-utente/${user.id}`)} style={{ cursor: 'pointer' }}>
                                <div className="u-col u-col-id">#{user.id}</div>
                                <div className="u-col u-col-name">{user.nome}</div>
                                <div className="u-col u-col-surname">{user.cognome}</div>
                                <div className="u-col u-col-email">{user.email}</div>

                                <div className="u-col u-col-role">
                                    {user.role === 'admin' ? (
                                        <span className="badge-admin">
                                            <ShieldCheck size={18} /> Admin
                                        </span>
                                    ) : (
                                        <span className="badge-user">
                                            <User2 size={18}/> Utente</span>
                                    )}
                                </div>

                                <div className="u-col u-col-actions">
                                    <button className="icon-btn delete" title="Elimina" onClick={(e) => {
                                        e.stopPropagation() // Evita che scatti il click della riga
                                        navigate(`/dettaglio-utente/${user.id}`);
                                    }}><Trash2 size={18}/></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">Nessun utente trovato.</div>
                    )}
                </div>
            </div>
        </div>
    )
}