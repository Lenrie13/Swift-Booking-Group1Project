import React, { useState } from 'react';
import './HomePage.css'; // Make sure this file contains styles for the HomePage

function HomePage({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here (e.g., validate credentials)
        setIsAuthenticated(true); // Set authentication state to true
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Add sign-up logic here (e.g., create a new account)
        setIsAuthenticated(true); // Set authentication state to true for demo purposes
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="off" // Disable autofill
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
                        <button type="button" className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HomePage;
