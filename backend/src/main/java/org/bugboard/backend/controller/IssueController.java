package org.bugboard.backend.controller;

import org.bugboard.backend.model.Issue;
import org.bugboard.backend.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/issue/{issueId}")
    public ResponseEntity<Issue> getIssue(@PathVariable int issueId) {
        return new ResponseEntity<>(service.getIssueFromId(issueId),HttpStatus.OK);
    }

    @PutMapping("/{projectId}/{userId}/issue/add")
    public ResponseEntity<Issue> addIssue(
            @PathVariable int projectId,
            @PathVariable int userId,
            @RequestBody Issue issue) {
        return new ResponseEntity<>(service.addIssue(projectId,userId,issue),HttpStatus.OK);
    }

    @PutMapping("/admin/issue/update")
    public ResponseEntity<Issue> updateIssue(@RequestBody Issue issue) {
        return new ResponseEntity<>(service.updateIssueFromId(issue),HttpStatus.OK);
    }

    @DeleteMapping("/admin/issue/{issueId}")
    public ResponseEntity<Issue> deleteIssue(@PathVariable int issueId) {
        return new ResponseEntity<>(service.deleteIssueFromId(issueId),HttpStatus.OK);
    }
}
