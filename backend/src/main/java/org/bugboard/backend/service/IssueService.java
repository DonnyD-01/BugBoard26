package org.bugboard.backend.service;

import org.bugboard.backend.model.Issue;
import org.bugboard.backend.model.Utente;
import org.bugboard.backend.repository.IssueRepo;
import org.bugboard.backend.repository.UtenteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueService {
    private final IssueRepo issueRepo;
    private final UtenteRepo utenteRepo;
    private final ApplicationContext applicationContext;

    @Autowired
    public IssueService(IssueRepo issueRepo, UtenteRepo utenteRepo, ApplicationContext applicationContext) {
        this.issueRepo = issueRepo;
        this.utenteRepo = utenteRepo;
        this.applicationContext = applicationContext;
    }

    public List<Issue> getAllAssignedIssues(int userId) {
        Utente user=applicationContext.getBean(Utente.class);

        Optional<Utente> optUser = utenteRepo.findById(userId);
        if(optUser.isPresent()){
            user=optUser.get();
        }

        return issueRepo.findIssuesByIdAssegnato(user);
    }
}
