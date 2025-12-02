package org.bugboard.backend.repository;

import org.bugboard.backend.model.Issue;
import org.bugboard.backend.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepo extends JpaRepository<Issue,Integer> {
    List<Issue> findIssuesByIdAssegnato(Utente idAssegnato);
}
