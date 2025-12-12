package org.bugboard.backend.controller;

import lombok.NonNull;
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

    @PutMapping("/admin/{projectId}/register")
    public ResponseEntity<@NonNull Utente> registerUser(@PathVariable int projectId, @RequestBody Utente utente){
        int userId=service.registerUser(utente).getIdUtente();
        return new ResponseEntity<>(service.assignProjectToUser(projectId,userId), HttpStatus.CREATED);
    }

    @GetMapping("/admin/{projectId}/users/others")
    public ResponseEntity<List<Utente>> getAllOtherUsers(@PathVariable int projectId) {
        return new ResponseEntity<>(service.getAllOtherUsersFromProject(projectId),HttpStatus.OK);
    }

    @GetMapping("/admin/{projectId}/users")
    public ResponseEntity<List<Utente>> getAllUsersFromProject(@PathVariable int projectId) {
        return new ResponseEntity<>(service.getAllUsersFromProject(projectId),HttpStatus.OK);
    }


    @PutMapping("/admin/{projectId}/assign/{userId}")
    public ResponseEntity<Utente> assignProjectToUser(
            @PathVariable int projectId,
            @PathVariable int userId) {
        Utente utente=service.assignProjectToUser(projectId,userId);
        if(utente!=null){
            return new ResponseEntity<>(utente, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
