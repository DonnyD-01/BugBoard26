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
        return (
            <div className="App">
                <Router>

                    <Routes path>
                        <Route path="/" element={<Login/>}/>

                        {/*<Route element={<ProtectedRoute allowedRole="user" />}>*/}
                            <Route element={<LayoutUtente/>}>
                                <Route path="/home" element={<HomePage/>}/>
                                <Route path="/dettaglio-issue/:id" element={<DettaglioIssue/>}/>
                                <Route path="/segnala-issue" element={<SegnalaIssue/>}/>
                                <Route path="/profilo" element={<Profilo/>}/>
                            </Route>
                        {/*}</Route>*/}

                        {/*<Route element={<ProtectedRoute allowedRole="admin" />}>*/}
                            <Route element={<LayoutAdmin/>}>
                                <Route path="/admin/segnala-issue" element={<SegnalaIssue/>}/>
                                <Route path="/admin/home" element={<HomePage/>}/>
                                <Route path="/admin/dettaglio-issue/:id" element={<DettaglioIssue/>}/>
                                <Route path="/admin/profilo" element={<Profilo/>}/>
                                <Route path="/admin/gestione-utenze" element={<GestisciUtenti />} />
                            </Route>
                        {/*</Route>*/}
                    </Routes>
                </Router>
            </div>
        );
    }

    export default App;
