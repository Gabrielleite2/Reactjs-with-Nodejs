import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

const Register = () => {
    const [name, setName] = useState({ value: '', dirty: false });
    const [email, setEmail] = useState({ value: '', dirty: false });
    const [password, setPassword] = useState({ value: '', dirty: false });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

      
        axios.post('http://localhost:8000/api/auth/register', { 
            nome: name.value, 
            email: email.value, 
            senha: password.value 
        })
            .then(result => {
                if (result.data === "Already registered") {
                    alert("E-mail já registrado! Por favor, faça login para continuar.");
                    navigate('/'); 
                } else {
                    alert("Registrado com sucesso! Por favor, faça login para continuar.");
                    navigate('/'); 
                }
            })
            .catch(err => {
                console.error("Erro ao registrar:", err); 
                alert("Ocorreu um erro ao registrar. Tente novamente.");
            });
    };

    const handleName = (e) => {
        setName({ value: e.target.value, dirty: true });
    };

    const handleEmail = (e) => {
        setEmail({ value: e.target.value, dirty: true });
    };

    const handlePassword = (e) => {
        setPassword({ value: e.target.value, dirty: true });
    };

    return (
        <div className="REGISTRO-container">
            <div className="REGISTRO-square">
                <i style={{ '--clr': '#00f0ff' }}></i>
                <i style={{ '--clr': '#ff0057' }}></i>
                <i style={{ '--clr': '#fffd44' }}></i>
            </div>
            <div className="REGISTRO-form">
                <h1>Crie sua conta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label htmlFor="nameInput">Nome</label>
                        <input
                            value={name.value}
                            onChange={handleName}
                            id="nameInput"
                            type="text"
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="emailInput">Email</label>
                        <input
                            value={email.value}
                            onChange={handleEmail}
                            id="emailInput"
                            type="email"
                            placeholder="Digite seu email"
                            required
                        />
                    </div>

                    <div className="input-box">
                        <label htmlFor="passwordInput">Senha</label>
                        <input
                            value={password.value}
                            onChange={handlePassword}
                            id="passwordInput"
                            type="password"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button type="submit">Registrar</button>
                </form>

                <p className="REGISTRO">Já tem uma conta? <Link to="/">Faça login</Link></p>
            </div>
        </div>
    );
};

export default Register;
