import {mockIssues, mockProjects, mockProjectsIssues, mockTeamUsers, potentialUsersToAdd} from "../utils";

const BASE_URL = "http://localhost:8080/api";

export const loginAPI = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`LOGIN: Tento accesso con ${email}`);

            const foundUser = mockTeamUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

            let userId;
            let isAdmin;
            let userEmail = email;

            if (foundUser) {
                userId = foundUser.idUtente || foundUser.id;
                isAdmin = foundUser.isAdmin === true || foundUser.role === 'admin';
                console.log(`LOGIN: Utente trovato: ${foundUser.nome} (ID: ${userId})`);
            } else {
                // FALLBACK (Se usi una mail non presente nel mock, es. test rapidi)
                console.warn("LOGIN: Utente non trovato nel mock, uso identità generica.");
                isAdmin = email.toLowerCase().includes("admin");
                userId = isAdmin ? 300 : 200; // 300 Luigi (Admin), 200 Mario (User)
            }

            // 2. CREIAMO IL PAYLOAD CON L'ID CORRETTO
            const payload = {
                admin: isAdmin,
                id: userId, // Qui ora c'è l'ID specifico di Walter (es. 1)
                sub: userEmail,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            };

            const fakeHeader = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
            const fakePayload = btoa(JSON.stringify(payload));
            const fakeSignature = "firma-finta";

            resolve({
                success: true,
                accessToken: `${fakeHeader}.${fakePayload}.${fakeSignature}`
            });

        }, 800);
    });

    /*
    * const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Credenziali errate");

    // Il backend restituisce: { accessToken: "eyJhbGc..." }
    return await response.json();
    *
    *
    * */
};

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
    /*const response = await fetch(`${BASE_URL}/issues`, {
        method: 'GET',
        headers: getHeaders()
    });

    if (!response.ok) throw new Error("Errore nel recupero delle issue");
    return await response.json();*/

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock API: Dati restituiti con successo");
            resolve(mockIssues);
        }, 800);
    });
};

export const getIssueById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`API: Recupero dettaglio issue ID: ${id}`);

            // SIMULAZIONE DB (Cerchiamo nel mock)
            // Nota: qui simuliamo che il DB abbia i campi in italiano come richiesto
            const found = mockProjectsIssues.find(i => (i.id == id) || (i.idIssue == id));

            if (found) {
                // MAPPATURA DB (Italiano) -> FRONTEND (Inglese)
                // Se il tuo mock ha già i nomi inglesi, li adattiamo qui per simulare il comportamento reale del backend
                const mappedIssue = {
                    id: found.idIssue,                   // Backend: idIssue
                    title: found.titolo,             // Backend: Titolo
                    description: found.descrizione, // Backend: Descrizione
                    type: found.tipo,               // Backend: Tipo
                    priority: found.priorita,       // Backend: Priorità
                    status: found.stato,           // Backend: Stato
                    image: found.linkImmagine,             // Backend: linkImmagine
                    author: found.EmailCr,           // Backend: EmailCr
                    assigneeEmail: found.EmailAss || null,
                    projectId: found.IdProgetto || found.projectId
                    // ... altri campi se servono
                };
                console.log("API: Issue trovata e mappata:", mappedIssue);
                resolve(mappedIssue);
            } else {
                reject(new Error("Issue non trovata"));
            }
        }, 800);
    });
};

export const createIssue = async (projectId, userId, issueData) => {

    console.log(`API: Creazione Issue nel progetto ${projectId} per utente ${userId}`);
    console.log("Payload:", issueData);

    /* NOTA PER INTEGRAZIONE REALE:
       Probabilmente il tuo backend si aspetta una chiamata POST simile a:
       POST /projects/{projectId}/users/{userId}/issues
       oppure un body che wrappa tutto.

       Qui simuliamo la chiamata.
    */

    /* ESEMPIO FETCH REALE:
    const response = await fetch(`${BASE_URL}/issues?projectId=${projectId}&userId=${userId}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(issueData) // Il JSON con chiavi in italiano
    });
    if (!response.ok) throw new Error("Errore creazione issue");
    return await response.json();
    */

    // SIMULAZIONE
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!projectId || !userId) {
                reject(new Error("Dati mancanti (ProjectId o UserId)"));
                return;
            }
            resolve({ success: true, id: Math.floor(Math.random() * 1000) });
        }, 1500);
    });
};

export const updateIssue = async (id, updatedData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Aggiornamento issue ID: ${id}`, updatedData);

            // MAPPATURA FRONTEND -> BACKEND
            // Quando inviamo i dati al server, dobbiamo riconvertirli in Italiano
            const payload = {
                idIssue: id,
                Titolo: updatedData.title,
                Descrizione: updatedData.description,
                Tipo: updatedData.type,
                Priorità: updatedData.priority,
                Stato: updatedData.status,
                linkImmagine: updatedData.image,
                EmailAss: updatedData.assigneeEmail
            };

            console.log("Payload inviato al DB:", payload);

            resolve({ success: true });
        }, 1000);
    });
};

export const deleteIssue = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Eliminazione issue ID: ${id}`);
            resolve({ success: true });
        }, 1000);
    });
};

export const getProjectsByUserId = async (userId) => {
    // Simulazione ritardo rete
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Recupero progetti per UserID: ${userId}`);

            // LOGICA MOCK BACKEND (Simulazione Tabella "Lavora"):

            // 1. Se l'ID è 100 (Admin), vede tutti i progetti
            if (userId === 100 || userId === "100") {
                resolve(mockProjects);
                return;
            }

            // 2. Se è un utente normale (es. ID 200), vede solo quelli a cui è assegnato
            // Simulo che l'utente 200 lavori solo ai progetti con ID dispari
            const userProjects = mockProjects.filter(p => p.id % 2 !== 0);

            resolve(userProjects);

            /* VERSIONE REALE (Quando avrai il backend):
             * const response = await fetch(`${API_BASE_URL}/projects/user/${userId}`);
             * const data = await response.json();
             * resolve(data);
             */

        }, 800);
    });
};

export const getAssignedActiveProjectsFromUserId = async (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API (User): Recupero progetti ATTIVI per UserID: ${userId}`);

            // SIMULAZIONE DB: Filtra lato server (mock) solo quelli "Attivo"
            // Nel backend reale, questa sarà una query SQL con "WHERE status = 'Attivo'"
            const activeProjects = mockProjects.filter(p => p.status === "Attivo");

            resolve(activeProjects);
        }, 800);
    });
};

export const getIssuesByProjectId = async (projectId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Recupero issue per ProjectID: ${projectId}`);

            // 1. FILTRIAMO DAL MOCK (Simulazione query DB "WHERE IdProgetto = projectId")
            // Nota: Assicurati che nel tuo mockIssues in utils.js ci sia il campo 'projectId' o 'IdProgetto'
            // Se non c'è, per ora restituiamo tutto il mock per testare.
            const dbIssues = mockProjectsIssues || mockIssues;

            // 2. MAPPATURA (DB Italiano -> Frontend Inglese)
            // Questo è fondamentale perché il tuo DB ha "Titolo", "EmailAss", ma il codice React usa "title", "assignee"
            const mappedIssues = dbIssues.map(dbIssue => ({
                id: dbIssue.idIssue || dbIssue.id,
                title: dbIssue.titolo || dbIssue.title,
                description: dbIssue.descrizione,
                type: dbIssue.tipo,
                priority: dbIssue.priorita || dbIssue.priority,
                status: dbIssue.stato || dbIssue.status,
                image: dbIssue.linkImmagine || dbIssue.image,
                projectId: dbIssue.IdProgetto || dbIssue.projectId,
                author: dbIssue.EmailCr || dbIssue.author,
                assigneeEmail: dbIssue.EmailAss || dbIssue.assigneeEmail,
                ...dbIssue
            }));

            resolve(mappedIssues);
        }, 800);
    });
};

export const getUsersByProjectId = async (projectId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Recupero utenti per ProjectID: ${projectId}`);

            /* CHIAMATA REALE AL BACKEND:
            const response = await fetch(`${BASE_URL}/projects/${projectId}/users`, {
                method: 'GET',
                headers: getHeaders()
            });
            const data = await response.json();
            resolve(data);
            */

            // SIMULAZIONE
            // Restituiamo tutti gli utenti (il filtro isAdmin lo facciamo nel frontend o nel backend a scelta)
            // Qui simulo che il backend restituisca tutti i partecipanti al progetto
            const dbUsers = mockTeamUsers;

            const mappedUsers = dbUsers.map(u => ({
                id: u.idUtente,
                nome: u.nome,
                cognome: u.cognome,
                email: u.email,
                role: u.isAdmin === true ? 'admin' : 'user',

                telefono: u.numeroTelefono || u.telefono,
                dataNascita: u.dataNascita
            }));

            resolve(mappedUsers);
        }, 600);
    });
};

export const createUser = async (userData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("API: Creazione Utente...", userData);

            // SIMULAZIONE BACKEND (Java accetta questi campi)
            // L'ID viene generato dal DB
            const newUser = {
                idUtente: Math.floor(Math.random() * 10000),
                nome: userData.nome,
                cognome: userData.cognome,
                dataNascita: userData.dataNascita,
                email: userData.email,
                numeroTelefono: userData.numeroTelefono,
                password: userData.password,
                isAdmin: userData.role === 'admin'
            };

            /* FETCH REALE:
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(newUser)
            });
            return await response.json();
            */

            console.log("API: Utente Creato con successo:", newUser);
            resolve(newUser);
        }, 1000);
    });
};

export const assignProjectToUser = async (userId, projectId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Assegnazione Utente ${userId} al Progetto ${projectId}`);

            /* FETCH REALE:
            const response = await fetch(`${BASE_URL}/projects/${projectId}/users/${userId}`, {
                method: 'POST',
                headers: getHeaders()
            });
            */

            resolve({ success: true });
        }, 500);
    });
};

export const getAllUsersExceptProject = async (projectId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Recupero utenti NON nel progetto ${projectId}`);

            // SIMULAZIONE:
            // Restituiamo la lista "potentialUsersToAdd" dal file utils.js
            // In un caso reale: GET /users?excludeProjectId={projectId}

            const mappedUsers = potentialUsersToAdd.map(u => ({
                id: u.idUtente || u.id,
                nome: u.nome,
                cognome: u.cognome,
                email: u.email,
                role: (u.isAdmin === true || u.role === 'admin') ? 'admin' : 'user',
                telefono: u.numeroTelefono || u.telefono,
                dataNascita: u.dataNascita
            }));

            resolve(mappedUsers);
        }, 600);
    });
};

export const getUserById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`API: Recupero profilo utente ID: ${id}`);

            // Cerca nel mock (o chiamata reale)
            const found = mockTeamUsers.find(u => u.idUtente == id);

            if (found) {
                resolve({
                    id: found.idUtente,
                    nome: found.nome,
                    cognome: found.cognome,
                    email: found.email,
                    telefono: found.telefono,
                    dataNascita: found.dataNascita,
                    password: "passwordSegreta",
                    role: found.role
                });
            } else {
                reject(new Error("Utente non trovato"));
            }
        }, 600);
    });
};

export const updateUser = async (id, userData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`API: Aggiornamento utente ${id}`, userData);

            // Qui faresti la PUT al backend
            /*
            await fetch(`${BASE_URL}/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(userData)
            });
            */

            resolve({ success: true });
        }, 1000);
    });
};