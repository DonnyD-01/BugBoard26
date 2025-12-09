import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import './App.css';
import NavbarUtente from "./NavbarUtente";
import NavbarAmministratore from './NavbarAmministratore';
import SegnalaIssue from "./SegnalaIssue";
import HomePage from "./HomePage";
import Login from "./Login";
import Footer from "./Footer";
import Profilo from "./Profilo";
import {DettaglioIssue} from "./DettaglioIssue";
import ProtectedRoute from './ProtectedRoute';
import GestisciUtenti from "./GestisciUtenti";
import NuovoUtente from './NuovoUtente';
import DettaglioUtente from "./DettaglioUtente";
import {Progetti} from "./Progetti";
import SplashScreen from "./SplashScreen";
import {useEffect, useState} from "react";

const LayoutUtente = () => {
    return (
        <>
            <NavbarUtente />
            <Outlet />
            <Footer />
        </>
    );
};

const LayoutAdmin = () => {
    return (
        <>
            <NavbarAmministratore/> {}
            <Outlet/>
            <Footer/>
        </>
    );
}

    function App() {

        const [showSplash, setShowSplash] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setShowSplash(false);
            }, 3000);

            return () => clearTimeout(timer);
        }, []);

        if (showSplash) {
            return <SplashScreen />;
        }

        return (
            <div className="App">
                <Router>

                    <Routes path>
                        <Route path="/" element={<Login/>}/>

                        {/*<Route element={<ProtectedRoute allowedRole="user" />}>*/}
                        <Route path="/progetti" element={<Progetti />} />
                            <Route element={<LayoutUtente/>}>
                                <Route path="/home" element={<HomePage/>}/>
                                <Route path="/dettaglio-issue/:id" element={<DettaglioIssue/>}/>
                                <Route path="/segnala-issue" element={<SegnalaIssue/>}/>
                                <Route path="/profilo" element={<Profilo/>}/>
                            </Route>
                        {/*}</Route>*/}

                        {/*<Route element={<ProtectedRoute allowedRole="admin" />}>*/}
                        <Route path="/progetti" element={<Progetti />} />
                            <Route element={<LayoutAdmin/>}>
                                <Route path="/admin/segnala-issue" element={<SegnalaIssue/>}/>
                                <Route path="/admin/home" element={<HomePage/>}/>
                                <Route path="/admin/dettaglio-issue/:id" element={<DettaglioIssue/>}/>
                                <Route path="/admin/profilo" element={<Profilo/>}/>
                                <Route path="/admin/gestione-utenze" element={<GestisciUtenti />} />
                                <Route path="/admin/nuovo-utente" element={<NuovoUtente />} />
                                <Route path="/admin/dettaglio-utente/:id" element={<DettaglioUtente/>} />
                            </Route>
                        {/*</Route>*/}
                    </Routes>
                </Router>
            </div>
        );
    }

    export default App;
