import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './components/Alert'
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="Home/*" element={<Home showAlert={showAlert}/>} />
              <Route path="About/*" element={<About />} />
              <Route path="/*" element={<Login showAlert={showAlert}/>} />
              <Route path="SignUp/*" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
