package org.bugboard.backend.controller;

import org.bugboard.backend.model.Progetto;
import org.bugboard.backend.service.ProgettoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ProgettoController {
    private final ProgettoService service;

    @Autowired
    public ProgettoController(ProgettoService service) {
        this.service = service;
    }

    @GetMapping("/admin/{userId}/projects")
    public ResponseEntity<List<Progetto>> getAllProjectsFromUserId(@PathVariable int userId) {
        return new ResponseEntity<>(service.getAllProjectsfromUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/projects")
    public ResponseEntity<List<Progetto>> getAssignedActiveProjectsFromUserId(@PathVariable int userId) {
        return new ResponseEntity<>(service.getAssignedActiveProjectsFromUserId(userId),HttpStatus.OK);
    }
}
