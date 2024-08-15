import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import LandingPageBody from './Components/LandingPageBody';
import Promotions from './Components/Promotions';
import HomePage from './Components/HomePage'; // Import the new HomePage component
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Header setIsAuthenticated={setIsAuthenticated} />
                  <Promotions />
                  <LandingPageBody setIsAuthenticated={setIsAuthenticated} />
                </>
              ) : (
                <HomePage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
