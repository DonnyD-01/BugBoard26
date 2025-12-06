const BASE_URL = "http://localhost:8080/api";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};


export const getAllIssues = async () => {
    const response = await fetch(`${BASE_URL}/issues`, { headers: getHeaders() });
    if (!response.ok) throw new Error("Errore fetch issues");
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