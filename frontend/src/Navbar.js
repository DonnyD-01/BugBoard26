import {NavLink} from 'react-router-dom'
import './Navbar.css';
import {useState} from "react";

export default function Navbar() {

    const [isDropdownOpen, setDropdownOpen] = useState(false);


    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    return (
        <nav className = "navbar">
            <div className="navbar-left">
                <img src="/Logo/LogoBugBoard26.svg" alt="logo" className="logo"/>
                <div className="navbar-center">
                    <NavLink to={"/Visualizza Issue"} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Visualizza issue</NavLink>
                    <NavLink to={"/Segnala Issue"} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Segnala issue</NavLink>
                </div>
                <div className="profile-menu" onClick={toggleDropdown}>
                    <span className="material-icons profile-icon">account_circle</span>
                    {isDropdownOpen && (
                        <div className="dropdown">
                            <a href="/profile">Il mio profilo</a>
                            <a href="/settings">Impostazioni</a>
                            <a href="/logout">Esci</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}