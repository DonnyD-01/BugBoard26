package org.bugboard.backend.repository;

import org.bugboard.backend.model.Progetto;
import org.bugboard.backend.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtenteRepo extends JpaRepository<Utente,Integer> {
    @Query("SELECT p from Progetto p join Utente u ON u.idUtente = :userId and p.stato='Attivo'")
    List<Progetto> getAssignedActiveProjectsFromUserId(int userId);
}
