package org.bugboard.backend.repository;

import org.bugboard.backend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepo extends JpaRepository<Issue,Integer> {

    List<Issue> findIssuesByProgetto_IdProgetto(int projectId);

    List<Issue> findIssuesByProgetto_IdProgettoAndUtenteAssegnato_IdUtenteAndStatoOrderByStato(int projectId, int userId, String issueAssegnata);

    List<Issue> findIssuesByProgetto_IdProgettoAndUtenteAssegnato_IdUtenteIsNotOrProgetto_IdProgettoAndUtenteAssegnato_IdUtenteAndStatoIsNot(int progettoIdProgetto, int utenteAssegnatoIdUtente, int progettoIdProgetto1, int utenteAssegnatoIdUtente1, String stato);

    List<Issue> findIssuesByProgetto_IdProgettoAndStato(int projectId, String issueTodo);
}
