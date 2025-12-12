package org.bugboard.backend.controller;

import lombok.NonNull;
import org.bugboard.backend.model.UserLogin;
import org.bugboard.backend.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticationController {

    private final UtenteService service;

    @Autowired
    public AuthenticationController(UtenteService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<@NonNull String> loginUser(@RequestBody UserLogin userLogin){
        return new ResponseEntity<>(service.verifyUser(userLogin),HttpStatus.OK);
    }

}