import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './HomePage.css'; 

function HomePage({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    const handleLogin = (event) => {
        event.preventDefault();
        // Add login logic here (e.g., validate credentials)
        setIsAuthenticated(true); // Set authentication state to true
        navigate('/'); // Redirect to home page or desired page after login
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        // Add sign-up logic here (e.g., create a new account)
        setIsAuthenticated(true); // Set authentication state to true for demo purposes
        navigate('/'); // Redirect to home page or desired page after sign-up
    };

    return (
        <div className="home-page">
            <div className="auth-form">
                <h2>Sign In / Sign Up</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoComplete="off" // Disable autofill
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            autoComplete="off" // Disable autofill
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
                        <button type="button" className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
                    </div>
                </form>
                <div className="link-container">
                    <button 
                        className="list-property-button"
                        onClick={() => navigate('/list-your-property')} // Navigate to List Your Property page
                    >
                        List Your Property
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
