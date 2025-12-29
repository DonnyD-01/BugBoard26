CREATE SCHEMA bugboard26;

ALTER SCHEMA bugboard26 OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE bugboard26.issue (
    idissue integer NOT NULL,
    tipo character varying(50) NOT NULL,
    titolo character varying(50) NOT NULL,
    descrizione text NOT NULL,
    "priorità" integer,
    immagine text,
    stato character varying(50) DEFAULT 'ToDo'::character varying NOT NULL,
    idprogetto integer NOT NULL,
    idcreatore integer NOT NULL,
    idassegnato integer,
    CONSTRAINT "chk_priorità" CHECK ((("priorità" <= 5) AND ("priorità" >= 1))),
    CONSTRAINT chk_stato CHECK ((((stato)::text = 'ToDo'::text) OR ((stato)::text = 'Assegnata'::text) OR ((stato)::text = 'Risolta'::text))),
    CONSTRAINT chk_tipo CHECK ((((tipo)::text = 'Question'::text) OR ((tipo)::text = 'Bug'::text) OR ((tipo)::text = 'Documentation'::text) OR ((tipo)::text = 'Feature'::text)))
);


ALTER TABLE bugboard26.issue OWNER TO postgres;

CREATE SEQUENCE bugboard26.issue_idissue_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE bugboard26.issue_idissue_seq OWNER TO postgres;

ALTER SEQUENCE bugboard26.issue_idissue_seq OWNED BY bugboard26.issue.idissue;


CREATE TABLE bugboard26.lavora (
    idprogetto integer NOT NULL,
    idutente integer NOT NULL
);


ALTER TABLE bugboard26.lavora OWNER TO postgres;


CREATE TABLE bugboard26.progetto (
    idprogetto integer NOT NULL,
    titolo character varying(50) NOT NULL,
    descrizione text,
    stato character varying(50) DEFAULT 'Attivo'::character varying NOT NULL,
    CONSTRAINT chk_stato CHECK ((((stato)::text = 'Attivo'::text) OR ((stato)::text = 'InSospeso'::text) OR ((stato)::text = 'Chiuso'::text)))
);


ALTER TABLE bugboard26.progetto OWNER TO postgres;


CREATE SEQUENCE bugboard26.progetto_idprogetto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE bugboard26.progetto_idprogetto_seq OWNER TO postgres;

ALTER SEQUENCE bugboard26.progetto_idprogetto_seq OWNED BY bugboard26.progetto.idprogetto;


CREATE TABLE bugboard26.utente (
    idutente integer NOT NULL,
    nome character varying(50) NOT NULL,
    cognome character varying(50) NOT NULL,
    datadinascita date NOT NULL,
    email character varying(50) NOT NULL,
    numeroditelefono character varying(20) NOT NULL,
    password character varying(80) NOT NULL,
    isadmin boolean NOT NULL
);


ALTER TABLE bugboard26.utente OWNER TO postgres;



CREATE SEQUENCE bugboard26.utente_idutente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE bugboard26.utente_idutente_seq OWNER TO postgres;


ALTER SEQUENCE bugboard26.utente_idutente_seq OWNED BY bugboard26.utente.idutente;


ALTER TABLE ONLY bugboard26.issue ALTER COLUMN idissue SET DEFAULT nextval('bugboard26.issue_idissue_seq'::regclass);


ALTER TABLE ONLY bugboard26.progetto ALTER COLUMN idprogetto SET DEFAULT nextval('bugboard26.progetto_idprogetto_seq'::regclass);


ALTER TABLE ONLY bugboard26.utente ALTER COLUMN idutente SET DEFAULT nextval('bugboard26.utente_idutente_seq'::regclass);

SELECT pg_catalog.setval('bugboard26.issue_idissue_seq', 14, true);

SELECT pg_catalog.setval('bugboard26.progetto_idprogetto_seq', 4, true);

SELECT pg_catalog.setval('bugboard26.utente_idutente_seq', 18, true);


ALTER TABLE ONLY bugboard26.issue
    ADD CONSTRAINT issue_pkey PRIMARY KEY (idissue);


ALTER TABLE ONLY bugboard26.lavora
    ADD CONSTRAINT pk_lavora PRIMARY KEY (idprogetto, idutente);


ALTER TABLE ONLY bugboard26.progetto
    ADD CONSTRAINT progetto_pkey PRIMARY KEY (idprogetto);



ALTER TABLE ONLY bugboard26.utente
    ADD CONSTRAINT utente_email_key UNIQUE (email);



ALTER TABLE ONLY bugboard26.utente
    ADD CONSTRAINT utente_numeroditelefono_key UNIQUE (numeroditelefono);


ALTER TABLE ONLY bugboard26.utente
    ADD CONSTRAINT utente_pkey PRIMARY KEY (idutente);

ALTER TABLE ONLY bugboard26.issue
    ADD CONSTRAINT fk_progetto FOREIGN KEY (idprogetto) REFERENCES bugboard26.progetto(idprogetto);



ALTER TABLE ONLY bugboard26.lavora
    ADD CONSTRAINT fk_progetto FOREIGN KEY (idprogetto) REFERENCES bugboard26.progetto(idprogetto);



ALTER TABLE ONLY bugboard26.lavora
    ADD CONSTRAINT fk_utente FOREIGN KEY (idutente) REFERENCES bugboard26.utente(idutente);


ALTER TABLE ONLY bugboard26.issue
    ADD CONSTRAINT fk_utenteassegnato FOREIGN KEY (idassegnato) REFERENCES bugboard26.utente(idutente);


ALTER TABLE ONLY bugboard26.issue
    ADD CONSTRAINT fk_utentecreatore FOREIGN KEY (idcreatore) REFERENCES bugboard26.utente(idutente);


REVOKE ALL ON TABLE bugboard26.issue FROM postgres;
GRANT ALL ON TABLE bugboard26.issue TO postgres WITH GRANT OPTION;

REVOKE ALL ON TABLE bugboard26.lavora FROM postgres;
GRANT ALL ON TABLE bugboard26.lavora TO postgres WITH GRANT OPTION;

REVOKE ALL ON TABLE bugboard26.utente FROM postgres;
GRANT ALL ON TABLE bugboard26.utente TO postgres WITH GRANT OPTION;



ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA bugboard26 GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;
