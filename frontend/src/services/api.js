const BASE_URL = "http://localhost:8080/api";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};


export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Credenziali errate");
    return await response.json();
};

export const getIssues = async () => {
    const response = await fetch(`${BASE_URL}/issues`, {
        method: 'GET',
        headers: getHeaders()
    });

    if (!response.ok) throw new Error("Errore nel recupero delle issue");
    return await response.json();
};

export const getIssueById = async (id) => {
    const response = await fetch(`${BASE_URL}/issues/${id}`, {
        method: 'GET',
        headers: getHeaders()
    });

    if (!response.ok) throw new Error("Issue non trovata");
    return await response.json();
};

export const createIssue = async (issueData) => {
    const response = await fetch(`${BASE_URL}/issues`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(issueData)
    });
    if (!response.ok) throw new Error("Errore creazione issue");
    return await response.json();
};

export const updateIssueStatus = async (id, newStatus) => {
    const response = await fetch(`${BASE_URL}/issues/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
    });
    return await response.json();
};