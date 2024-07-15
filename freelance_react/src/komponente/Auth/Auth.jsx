import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; 

const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('wolff.afton@example.org');
    const [password, setPassword] = useState('password');
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
            });
            setMessage(response.data.Poruka);
        } catch (error) {
            setMessage('Neuspela registracija: ' + error.response.data);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });
            const { 'Poruka': poruka, 'User: ': user, 'Vas token za rad: ': token } = response.data;
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', token);
            setMessage(poruka);
        } catch (error) {
            setMessage('Neuspesan login: ' + error.response.data);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-home">
                <h1>{isLogin ? 'Prijava' : 'Registracija'}</h1>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {!isLogin && (
                        <div>
                            <label htmlFor="name">Ime:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Lozinka:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">{isLogin ? 'Prijavi se' : 'Registruj se'}</button>
                </form>
                <p>{message}</p>
                <p className="auth-toggle">
                    {isLogin ? 'Nemate nalog?' : 'Već imate nalog?'}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? ' Registrujte se' : ' Prijavite se'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
