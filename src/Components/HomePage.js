import React, { useState } from 'react';
import './HomePage.css';

function HomePage({ setIsAuthenticated, setSignedInUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setSignedInUser(data.username);
                setIsAuthenticated(true);
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error logging in');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Error logging in');
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                })
            });

            if (response.ok) {
                const data = await response.json();
                setSignedInUser(username);
                setIsAuthenticated(true);
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error signing up');
            }
        } catch (err) {
            console.error('Error signing up:', err);
            setError('Error signing up');
        }
    };

    return (
        <div className="home-page">
            <div className="auth-form">
                <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoComplete="off"
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
                            autoComplete="off"
                        />
                    </div>
                    {isSignUp && (
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="button-container">
                        {isSignUp ? (
                            <button type="submit" className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
                        ) : (
                            <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
                        )}
                        <button type="button" className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default HomePage;
