package org.bugboard.backend.repository;

import org.bugboard.backend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepo extends JpaRepository<Issue,Integer> {
    List<Issue> findIssuesByProgetto_IdProgettoAndUtenteAssegnato_IdUtente(int projectId, int userId);

    List<Issue> findIssuesByProgetto_IdProgetto(int projectId);

}
