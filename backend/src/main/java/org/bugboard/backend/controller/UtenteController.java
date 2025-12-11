package org.bugboard.backend.controller;

import org.bugboard.backend.model.Utente;
import org.bugboard.backend.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class UtenteController {

    private final UtenteService service;

    @Autowired
    public UtenteController(UtenteService service) {
        this.service = service;
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<Utente>> getAllUsers() {
        return new ResponseEntity<>(service.getAllUsers(),HttpStatus.OK);
    }

    @GetMapping("/admin/{projectId}/users")
    public ResponseEntity<List<Utente>> getAllUsersFromProject(@PathVariable int projectId) {
        return new ResponseEntity<>(service.getAllUsersFromProject(projectId),HttpStatus.OK);
    }


    @PutMapping("/admin/{projectId}/assign/{userId}")
    public ResponseEntity<Utente> assignProjectToUser(
            @PathVariable int projectId,
            @PathVariable int userId) {
        return new ResponseEntity<>(service.assignProjectToUser(projectId, userId),HttpStatus.OK);
    }


}
