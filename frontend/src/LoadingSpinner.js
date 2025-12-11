import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner({ message = "Caricamento dati..." }) {
    return (
        <div className="loading-container">
            <img
                src="/Logo/LogoSpin.png"
                alt="Caricamento..."
                className="loading-logo-spinning"
            />

            <p className="loading-text">{message}</p>
        </div>
    );
}