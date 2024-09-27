import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './promocoes.css';

const Promocoes = () => {
  const [promotions, setPromotions] = useState([]); 

  useEffect(() => {
    
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/promotion/getAllPromotion');
        setPromotions(response.data); 
      } catch (error) {
        console.error('Erro ao buscar promoções:', error);
      }
    };

    fetchPromotions(); 
  }, []); 

  const deletePromotion = async (id) => {
    const promotionToDelete = promotions.find((promotion) => promotion._id === id);
    if (promotionToDelete) {
      try {
        
        await axios.delete(`http://localhost:8000/api/promotion/delete/${id}`);
        
        
        const updatedPromotions = promotions.filter((promotion) => promotion._id !== id);
        setPromotions(updatedPromotions);
      } catch (error) {
        console.error('Erro ao excluir promoção:', error);
      }
    }
  };

  const editPromotion = async (id) => {
    const promotionToEdit = promotions.find((promotion) => promotion._id === id);
    if (promotionToEdit) {
      const newName = prompt('Digite o novo nome da promoção:', promotionToEdit.nome);
      const newCurrentPrice = prompt('Digite o novo preço atual:', promotionToEdit.precoAtual);
      const newPromoPrice = prompt('Digite o novo preço em promoção:', promotionToEdit.precoComPromocao);
      const newType = prompt('Digite o novo tipo da promoção:', promotionToEdit.tipo);
      const newDescription = prompt('Digite a nova descrição da promoção:', promotionToEdit.descricao);
      const newValidUntil = prompt('Digite a nova data de validade:', promotionToEdit.dataDeValidade);

      if (newName && newCurrentPrice && newPromoPrice && newType && newDescription && newValidUntil) {
        try {
          
          await axios.put(`http://localhost:8000/api/promotion/update/${id}`, {
            nome: newName,
            precoAtual: newCurrentPrice,
            precoComPromocao: newPromoPrice,
            tipo: newType,
            descricao: newDescription,
            dataDeValidade: newValidUntil
          });

          
          const updatedPromotions = promotions.map((promotion) =>
            promotion._id === id
              ? { ...promotion, nome: newName, precoAtual: newCurrentPrice, precoComPromocao: newPromoPrice, tipo: newType, descricao: newDescription, dataDeValidade: newValidUntil }
              : promotion
          );
          setPromotions(updatedPromotions);
        } catch (error) {
          console.error('Erro ao editar promoção:', error);
        }
      }
    }
  };

  const handleBuy = () => {
    window.location.href = '/cadastrar';
  };

  return (
    <div className="container">
      <h1>Promoções Disponíveis</h1>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion._id}>
            <strong>{promotion.nome}</strong> <br />
            Preço Atual: R$ {promotion.precoAtual} <br />
            Preço com Promoção: R$ {promotion.precoComPromocao} <br />
            Tipo: {promotion.tipo} <br />
            Descrição: {promotion.descricao} <br />
            Validade: {promotion.dataDeValidade} <br />
            <button className="btn-editar-promocao" onClick={() => editPromotion(promotion._id)}>Editar</button>
            <button className="btn-deletar-promocao" onClick={() => deletePromotion(promotion._id)}>Excluir</button>
            <button className="btn-comprar-promocao" onClick={handleBuy}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Promocoes;
