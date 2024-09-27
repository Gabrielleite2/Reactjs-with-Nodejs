import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CadastrarAluno from './cadastrar/CadastrarAluno';
import Alunos from './alunos/Alunos';
import Promocoes from './promocoes/Promocoes';
import Header from './Header';
import Login from './login/Login';
import CadastrarPromocao from './cadastrar/CadastrarPromocao';
import Register from './login/Register'; 


const App = () => {
  const location = useLocation(); // Pega a rota atual
  const [data,setData]= React.useState(null)
  
  fetch('http://localhost:8000/api/auth/login').then((data)=> data.json()
  ).then((data)=>setData(data))

  return (
    <div>
            {/* O Header só será exibido se a rota atual não for a página de login ou de registro */}
  {location.pathname !== '/' && location.pathname !== '/register' && <Header />}
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Página de Login */}
          <Route path="/cadastrar" element={<CadastrarAluno />} /> {/* Página de Cadastro */}
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/promocoes" element={<Promocoes />} />
          <Route path="/cadastrar-promocao" element={<CadastrarPromocao />} />
          <Route path="/register" element={<Register />} /> {/* Página de Registro */}
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
