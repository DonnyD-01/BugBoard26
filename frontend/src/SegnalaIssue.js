import './SegnalaIssue.css';
import './Navbar.js';
import {BrowserRouter as Router} from "react-router";
import Navbar from "./Navbar";
import {Route, Routes} from "react-router-dom";
import App from "./App";

export default function SegnalaIssue() {
    return (
        <div className="segnalaissue">
            <Navbar></Navbar>
            <div className="homepage-container">
                <h1>Segnala issue</h1>
            </div>
        </div>
    )
}