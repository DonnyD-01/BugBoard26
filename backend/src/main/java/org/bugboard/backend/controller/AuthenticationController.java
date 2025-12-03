package org.bugboard.backend.controller;

import org.bugboard.backend.model.Utente;
import org.bugboard.backend.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final UtenteService service;

    @Autowired
    public AuthenticationController(UtenteService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<Utente> registerUser(@RequestBody Utente utente) {
        return new ResponseEntity<>(service.registerUser(utente), HttpStatus.CREATED);
    }

}
