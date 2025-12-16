import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { getUserById } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("userRole");
        const storedId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("userEmail");
        const storedNome = localStorage.getItem("userNome");

        if (storedToken && storedRole && storedId) {
            setUser({
                token: storedToken,
                role: storedRole,
                id: storedId,
                email: storedEmail,
                nome: storedNome || "Utente"
            });
        }
        setLoading(false);
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);

        if (!decoded) {
            console.error("Token non valido");
            return;
        }

        const isBackendAdmin = decoded.admin === true;

        const roleString = isBackendAdmin ? "admin" : "user";

        const userEmail = decoded.sub;
        const userId = decoded.id || decoded.idUtente;

        let nomeUtente = "Utente";

        try {
            const fullUserData = await getUserById(userId);
            if (fullUserData && fullUserData.nome) {
                nomeUtente = fullUserData.nome;
            }
        } catch (error) {
            console.warn("Impossibile recuperare il nome utente al login", error);
        }

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
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userNome");
        setUser(null);
    };

    const isAdmin = user?.role === "admin";

    const value = {
        user,
        login,
        logout,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};