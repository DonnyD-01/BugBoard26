package org.bugboard.backend.controller;

import org.bugboard.backend.model.Issue;
import org.bugboard.backend.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IssueController {
    private final IssueService service;

    @Autowired
    public IssueController(IssueService service) {
        this.service = service;
    }

    @GetMapping("/{userId}/issues")
    public ResponseEntity<List<Issue>> getAllAssignedIssues(@PathVariable int userId) {
        return new ResponseEntity<>(service.getAllAssignedIssues(userId), HttpStatus.OK);
    }
}
