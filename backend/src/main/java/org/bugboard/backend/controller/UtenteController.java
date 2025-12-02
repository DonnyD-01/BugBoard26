package org.bugboard.backend.controller;

import org.bugboard.backend.model.Progetto;
import org.bugboard.backend.model.Utente;
import org.bugboard.backend.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UtenteController {

    private final UtenteService service;

    @Autowired
    public UtenteController(UtenteService service) {
        this.service = service;
    }

    @GetMapping("/{userId}/projects")
    public ResponseEntity<List<Progetto>> getAssignedActiveProjectsFromUserId(@PathVariable int userId) {
        return new ResponseEntity<>(service.getAssignedActiveProjectsFromUserId(userId),HttpStatus.OK);
    }

    @PutMapping("/{userId}/project/{projectId}")
    public ResponseEntity<Utente> assignProjectToUser(
            @PathVariable int userId,
            @PathVariable int projectId
    ){
        return new ResponseEntity<>(service.assignProjectToUser(userId, projectId),HttpStatus.OK);
    }
}
