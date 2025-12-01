import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import './Navbar';
import './SegnalaIssue';
import Navbar from "./Navbar";
import SegnalaIssue from "./SegnalaIssue";


function App() {
  return (
    <div className="App">
        <Router>
            <Navbar></Navbar>
            <Routes path>
                <Route path="/VisualizzaIssue" element={<App/>}/>
                <Route path="/SegnalaIssue" element={<SegnalaIssue/>}/>
            </Routes>
        </Router>
        <div className="homepage-container">
            <h1>Le tue issue</h1>
        </div>
    </div>
  );
}

export default App;
