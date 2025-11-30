package org.bugboard.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Utente {
    @Id
    private String email;
    private String nome;
    private String cognome;
    private Date datadinascita;
    private String numeroditelefono;
    private String password;
    private Boolean isadmin;
}
