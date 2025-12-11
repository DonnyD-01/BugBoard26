package org.bugboard.backend.service;

import org.bugboard.backend.model.Issue;
import org.bugboard.backend.model.Progetto;
import org.bugboard.backend.model.Utente;
import org.bugboard.backend.repository.IssueRepo;
import org.bugboard.backend.repository.ProgettoRepo;
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
    private final ProgettoRepo progettoRepo;

    @Autowired
    public IssueService(IssueRepo issueRepo, UtenteRepo utenteRepo, ApplicationContext applicationContext, ProgettoRepo progettoRepo) {
        this.issueRepo = issueRepo;
        this.utenteRepo = utenteRepo;
        this.applicationContext = applicationContext;
        this.progettoRepo = progettoRepo;
    }

    public List<Issue> getAllAssignedIssues(int projectId,int userId) {
        return issueRepo.findIssuesByProgetto_IdProgettoAndUtenteAssegnato_IdUtente(projectId,userId);
    }

    public List<Issue> getAllIssuesFromProject(int projectId) {
        return issueRepo.findIssuesByProgetto_IdProgetto(projectId);
    }

    public Issue getIssue(int issueId) {
        Issue issue = applicationContext.getBean(Issue.class);
        Optional<Issue> optIssue = issueRepo.findById(issueId);
        if (optIssue.isPresent()) {
            issue = optIssue.get();
        }
        return issue;
    }

    public Issue addIssue(int projectId,int userId,Issue issue) {
        Optional<Progetto> optProject=progettoRepo.findById(projectId);
        optProject.ifPresent(issue::setProgetto);
        Optional<Utente> optUser = utenteRepo.findById(userId);
        optUser.ifPresent(issue::setUtenteCreatore);

        issue.setStato("ToDo");
        issue.setLinkImmagine("https://i1.rgstatic.net/ii/profile.image/272449132560396-1441968344623_Q512/Sergio-Di-Martino.jpg");
        return issueRepo.save(issue);
    }

    public Issue updateIssue(Issue updatedIssue) {
        Issue oldIssue;
        Optional<Issue> optIssue = issueRepo.findById(updatedIssue.getIdIssue());
        if (optIssue.isPresent()) {
            oldIssue = optIssue.get();
            updatedIssue.setProgetto(oldIssue.getProgetto());
            updatedIssue.setUtenteAssegnato(oldIssue.getUtenteAssegnato());
            updatedIssue.setUtenteCreatore(oldIssue.getUtenteCreatore());
        }
        return issueRepo.save(updatedIssue);
    }

    public Issue deleteIssue(int issueId) {
        Issue issue = applicationContext.getBean(Issue.class);
        Optional<Issue> optIssue = issueRepo.findById(issueId);
        if (optIssue.isPresent()) {
            issue = optIssue.get();
        }
        issueRepo.delete(issue);
        return issue;
    }


}
