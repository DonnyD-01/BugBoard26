import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { getUserById } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getRoleFromToken = (decoded) => {
        if (decoded.admin === true || decoded.isAdmin === true || String(decoded.admin) === 'true') {
            return "admin";
        }

        const rawRole = decoded.role || decoded.Role || decoded.ROLE;
        if (rawRole && String(rawRole).toLowerCase() === 'admin') {
            return "admin";
        }

        const authorities = decoded.authorities || decoded.roles;
        if (Array.isArray(authorities)) {
            const hasAdmin = authorities.some(item => {
                const val = (typeof item === 'object' && item.authority) ? item.authority : item;
                return String(val).toUpperCase().includes('ADMIN');
            });
            if (hasAdmin) return "admin";
        }

        return "user";
    };

    const initializeUser = async (token) => {
        try {
            const decoded = jwtDecode(token);
            const roleString = getRoleFromToken(decoded);

            // Importante: Assicurati che 'sub' sia l'ID o che il token contenga 'id'/'userId'
            // Se 'sub' è l'email, getUserById potrebbe fallire se si aspetta un numero.
            const userId = decoded.id || decoded.userId || decoded.sub;
            const userEmail = decoded.sub || decoded.email;

            let nomeUtente = "Utente";

            // --- MODIFICA QUI ---
            // Abbiamo rimosso la condizione !localStorage.getItem("userNome")
            // Ora cerchiamo SEMPRE di aggiornare i dati dell'utente se abbiamo un ID valido.
            if (userId) {
                try {
                    const fullUserData = await getUserById(userId);
                    // Se troviamo un nome valido dal database, lo usiamo.
                    if (fullUserData && fullUserData.nome) {
                        nomeUtente = fullUserData.nome;
                    }
                } catch (e) {
                    console.warn("Fetch nome fallita, uso cache o default");
                    // Solo se la chiamata fallisce usiamo quello che c'è in memoria come fallback
                    nomeUtente = localStorage.getItem("userNome") || "Utente";
                }
            }
            // --------------------

            // Aggiorniamo il LocalStorage con i dati freschi
            localStorage.setItem("userRole", roleString);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userEmail", userEmail);
            localStorage.setItem("userNome", nomeUtente);

            setUser({
                token: token,
                role: roleString,
                id: userId,
                email: userEmail,
                nome: nomeUtente
            });

        } catch (error) {
            console.error("Errore init user:", error);
            localStorage.clear();
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    localStorage.clear();
                } else {
                    initializeUser(token);
                }
            } catch (e) {
                localStorage.clear();
            }
        }
        setLoading(false);
    }, []);

    const login = async (token) => {
        // Puliamo i vecchi dati utente prima di settare quelli nuovi
        localStorage.removeItem("userNome");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");

        localStorage.setItem("token", token);
        await initializeUser(token);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    const isAdmin = user?.role === "admin";

    const value = { user, login, logout, isAdmin, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);