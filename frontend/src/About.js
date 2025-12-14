import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';
import { LogIn } from 'lucide-react';
import Footer from "./Footer";

export default function About() {
    const navigate = useNavigate();
    const [showSplash, setShowSplash] = useState(true);
    const [activeSection, setActiveSection] = useState(null);

    const sectionRefs = useRef({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        if (showSplash) return;

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [showSplash]);


    const scrollToSection = (sectionId) => {
        const section = sectionRefs.current[sectionId];
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sections = [
        { id: 'intro', title: 'Cos\'è BugBoard' },
        { id: 'mission', title: 'La nostra Mission' },
        { id: 'features', title: 'Funzionalità Chiave' },
        { id: 'project', title: 'Il Progetto' },
        { id: 'team', title: 'Il Team' },

    ];


    return (
        <>
            <div className="about-splash-container">
                <div className="splash-text-container">
                    <span>Ab</span>
                    <img
                        src="/Logo/LogoSpin.png"
                        alt="o"
                        className="splash-rotating-logo"
                    />
                    <span>ut</span>
                </div>
            </div>

            <div className="about-page-container">
                <header className="about-header">
                    <img src="/Logo/LogoBugBoard26.svg" alt="BugBoard Logo" className="about-header-logo"/>
                    <button className="btn-login-header" onClick={() => navigate('/')}>
                        <LogIn size={20}/> Accedi
                    </button>
                </header>

                <div className="about-content-wrapper">
                    <aside className="about-sidebar">
                        <ul>
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <span
                                        className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
                                        onClick={() => scrollToSection(section.id)}
                                    >
                                        {section.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <main className="about-main-text">
                        <div className="title-box">
                            <h1 className="main-title">
                                Ab
                            </h1>
                            <img src="/Logo/LogoSpin.png" style={{width: "65px", height: "auto", marginTop: "25px"}}/>
                            <h1 className="main-title">
                                ut Us
                            </h1>
                        </div>

                        <section id="intro" className="content-section" ref={el => sectionRefs.current['intro'] = el}>
                            <h2>Cos'è BugBoard</h2>
                            <p>
                                <b style={{color: "#002060", fontStyle: "italic"}}>BugBoard26®</b> è una piattaforma per la gestione collaborativa di issue in progetti software. Il sistema consente a team di sviluppo di segnalare problemi relativi a un progetto, monitorarne lo stato, assegnarli a membri del team e tenere traccia delle attività di risoluzione. Il sistema consiste in un’applicazione web-based, attraverso cui gli utenti possono fruire delle funzionalità in modo intuitivo e rapido.
                            </p>
                        </section>
                        <section id="mission" className="content-section" ref={el => sectionRefs.current['mission'] = el}>
                            <h2>La nostra Mission</h2>
                            <p>
                                La nostra missione è rendere più facile la gestione dei bug da parte degli sviluppatori e degli amministratori all'interno di un team.
                            </p>
                        </section>
                        <section id="features" className="content-section" ref={el => sectionRefs.current['features'] = el}>
                            <h2>Funzionalità Chiave</h2>
                            <p>
                                BugBoard si concentra sulla velocità e l'usabilità. Le nostre funzionalità principali includono
                                una dashboard intuitiva, un sistema di filtraggio avanzato per le issue, e la gestione dei ruoli utente.
                            </p>
                            <p>
                                Abbiamo progettato ogni interazione per richiedere il minor numero di click possibile,
                                permettendoti di concentrarti sul codice, non sulla gestione dello strumento.
                            </p>
                        </section>
                        <section id="project" className="content-section" ref={el => sectionRefs.current['project'] = el}>
                            <h2>Il Progetto</h2>
                            <p>
                                BugBoard26 è un progetto curriculare propedeutico all'insegnamento di Ingegneria del Software.
                            </p>
                        </section>
                        <section id="team" className="content-section" ref={el => sectionRefs.current['team'] = el}>
                            <h2>Il Team</h2>
                            <p>
                                Siamo un team formato da due sviluppatori giovani, studenti del Corso di Studi Triennale di Informatica presso l'<b><a href="https://www.unina.it"> Università degli Studi di Napoli "Federico II".</a></b>
                            </p>
                            <p>
                                Donadio Vincenzo <br/>
                                Filosa Walter
                            </p>
                        </section>

                    </main>
                </div>
            </div>
            <Footer/>
        </>
    );
}