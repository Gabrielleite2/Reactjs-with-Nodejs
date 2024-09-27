import React, { useState } from 'react';
import axios from 'axios'; 
import './cadastrar.css';

const CadastrarPromocao = () => {
  const [formData, setFormData] = useState({
    nome: '', 
    precoAtual: '', 
    precoComPromocao: '', 
    tipo: '', 
    descricao: '', 
    dataDeValidade: '' 
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const newPromotion = {
      nome: formData.nome,
      precoAtual: formData.precoAtual,
      precoComPromocao: formData.precoComPromocao,
      tipo: formData.tipo,
      descricao: formData.descricao,
      dataDeValidade: formData.dataDeValidade
    };

    
    axios.post('http://localhost:8000/api/promotion/create', newPromotion)
      .then(response => {
        console.log(response.data); 
        alert('Promoção cadastrada com sucesso!'); 
        window.location.href = '/promocoes'; 
      })
      .catch(err => {
        console.error(err); 
        alert('Erro ao cadastrar promoção. Tente novamente.'); 
      });

   
    setFormData({
      nome: '',
      precoAtual: '',
      precoComPromocao: '',
      tipo: '',
      descricao: '',
      dataDeValidade: ''
    });
  };

  return (
    <div className="container">
      <h1>Cadastrar Nova Promoção</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={formData.nome}
          onChange={handleChange}
          required 
        />

        <label htmlFor="precoAtual">Preço Atual:</label>
        <input
          type="number"
          id="precoAtual"
          value={formData.precoAtual}
          onChange={handleChange}
          required 
        />

        <label htmlFor="precoComPromocao">Preço com Promoção:</label>
        <input
          type="number"
          id="precoComPromocao"
          value={formData.precoComPromocao}
          onChange={handleChange}
          required 
        />

        <label htmlFor="tipo">Tipo:</label>
        <input
          type="text"
          id="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required 
        />

        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required 
        />

        <label htmlFor="dataDeValidade">Data de Validade:</label>
        <input
          type="date"
          id="dataDeValidade"
          value={formData.dataDeValidade}
          onChange={handleChange}
          required 
        />

        <button type="submit" className="btn-cadastrar-promocao">Cadastrar Promoção</button>
      </form>
    </div>
  );
};

export default CadastrarPromocao;
