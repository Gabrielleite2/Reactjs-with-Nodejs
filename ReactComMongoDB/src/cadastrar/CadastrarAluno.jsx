import React, { useState } from 'react';
import axios from 'axios'; 
import './cadastrar.css';

const CadastrarAluno = () => {
  const [formData, setFormData] = useState({
    nome: '', 
    cpf: '', 
    dataDeNascimento: '', 
    tempoDeContrato: '', 
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const newStudent = {
      nome: formData.nome,
      cpf: formData.cpf,
      dataDeNascimento: formData.dataDeNascimento,
      tempoDeContrato: formData.tempoDeContrato,
    };

    
    axios.post('http://localhost:8000/api/user/create', newStudent)
      .then(response => {
        console.log(response.data); 
        alert('Aluno cadastrado com sucesso!'); 
        window.location.href = '/alunos'; 
      })
      .catch(err => {
        console.error(err); 
        alert('Erro ao cadastrar aluno. Tente novamente.'); 
      });

   
    setFormData({
      nome: '',
      cpf: '',
      dataDeNascimento: '',
      tempoDeContrato: '',
    });
  };

  return (
    <div className="container">
      <h1>Cadastrar Novo Aluno</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome" 
          value={formData.nome}
          onChange={handleChange}
          required 
        />

        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required 
        />

        <label htmlFor="dataDeNascimento">Data de Nascimento:</label>
        <input
          type="date"
          id="dataDeNascimento" 
          value={formData.dataDeNascimento}
          onChange={handleChange}
          required 
        />

        <label htmlFor="tempoDeContrato">Tempo de Contrato (meses):</label>
        <input
          type="number"
          id="tempoDeContrato" 
          value={formData.tempoDeContrato}
          onChange={handleChange}
          required 
        />

        <button type="submit" className="btn-cadastrar">Cadastrar Aluno</button>
      </form>
    </div>
  );
};

export default CadastrarAluno;
