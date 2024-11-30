
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import { useState, useEffect } from 'react';

function App() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    },2000);
    return () => clearTimeout(timer);
  },[]);
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert msg={"good night"} show={show}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
