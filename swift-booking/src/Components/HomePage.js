import React, { useState } from 'react';
import './HomePage.css';

function HomePage({ setIsAuthenticated,setSignedInUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                setSignedInUser(user)
                setIsAuthenticated(true);
                setError('');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Error logging in');
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                setError('Email already in use');
                return;
            }

            const newUser = {
                id: users.length + 1,
                username,
                email,
                password,
                profile: {
                    firstName,
                    lastName,
                    phoneNumber,
                    address
                }
            };

            const postResponse = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (postResponse.ok) {
                setIsAuthenticated(true);
                setSignedInUser(newUser);
                setError('');
            } else {
                setError('Error signing up');
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
                        <>
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
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    required
                                />
                            </div>
                        </>
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
