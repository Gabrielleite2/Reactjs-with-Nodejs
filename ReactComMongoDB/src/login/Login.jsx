import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (email && senha) { 
      axios.post('http://localhost:8000/api/auth/login', { email, senha }) 
        .then(result => {
          console.log(result.data); 
          if (result.data.message === "Success") { 
            alert('Login successful!');
            navigate('/cadastrar'); 
          } else {
            alert(result.data.message); 
          }
        })
        .catch(err => {
          console.log(err); 
          alert('Erro ao fazer login. Tente novamente.'); 
        });
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div className="login-container">
    <div className="square">
        <i style={{ '--clr': '#00f0ff' }}></i>
        <i style={{ '--clr': '#ff0057' }}></i>
        <i style={{ '--clr': '#fffd44' }}></i>
    </div>
      <div className="login-form">
        <h1>Seja Bem-Vindo!</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="emailInput">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="emailInput"
              type="email"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="passwordInput">Senha</label>
            <input
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              id="passwordInput"
              type="password"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta? <Link to="/register">Registrar</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
