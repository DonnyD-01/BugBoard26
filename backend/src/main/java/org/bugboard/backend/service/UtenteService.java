package org.bugboard.backend.service;

import org.bugboard.backend.model.Utente;
import org.bugboard.backend.repository.UtenteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtenteService {

    private final UtenteRepo repo;

    @Autowired
    public UtenteService(UtenteRepo repo) {
        this.repo = repo;
    }

    public List<Utente> getAllUsers() {
        List<Utente> users = repo.findAll();
        for (Utente u : users) {
            u.setPassword(null);
        }
        return users;
    }
}
