package org.bugboard.backend.service;

import org.bugboard.backend.model.Issue;
import org.bugboard.backend.model.Progetto;
import org.bugboard.backend.model.Utente;
import org.bugboard.backend.repository.IssueRepo;
import org.bugboard.backend.repository.ProgettoRepo;
import org.bugboard.backend.repository.UtenteRepo;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OptionalService {
    private final IssueRepo issueRepo;
    private final UtenteRepo utenteRepo;
    private final ApplicationContext applicationContext;
    private final ProgettoRepo progettoRepo;

    public OptionalService(IssueRepo issueRepo, UtenteRepo utenteRepo, ApplicationContext applicationContext, ProgettoRepo progettoRepo) {
        this.issueRepo = issueRepo;
        this.utenteRepo = utenteRepo;
        this.applicationContext = applicationContext;
        this.progettoRepo = progettoRepo;
    }

    public Issue checkIssue(int issueId) {
        applicationContext.getBean(Issue.class);
        Issue issue;
        Optional<Issue> optIssue = issueRepo.findById(issueId);
        if (optIssue.isPresent()) {
            issue = optIssue.get();
        }
        else {
            return null;
        }
        return issue;
    }

    public Progetto checkProgetto(int projectId) {
        applicationContext.getBean(Progetto.class);
        Progetto project;
        Optional<Progetto> optProgetto = progettoRepo.findById(projectId);
        if (optProgetto.isPresent()) {
            project = optProgetto.get();
        }
        else {
            return null;
        }
        return project;
    }

    public Utente checkUtente(int userId) {
        applicationContext.getBean(Utente.class);
        Utente utente;
        Optional<Utente> optUtente = utenteRepo.findById(userId);
        if (optUtente.isPresent()) {
            utente = optUtente.get();
        }
        else {
            return null;
        }
        return utente;
    }
}
