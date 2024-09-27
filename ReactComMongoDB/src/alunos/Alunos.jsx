import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './alunos.css';

const Alunos = () => {
  const [students, setStudents] = useState([]); 
  const [deletedStudents, setDeletedStudents] = useState([]);

  useEffect(() => {
    
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/getAllUsers');
        setStudents(response.data); 
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchStudents(); 
  }, []); 

  const deleteStudent = async (id) => {
    const studentToDelete = students.find((student) => student._id === id);
    if (studentToDelete) {
      try {
        
        await axios.delete(`http://localhost:8000/api/user/delete/${id}`);
        
        
        setDeletedStudents([...deletedStudents, studentToDelete]);
        const updatedStudents = students.filter((student) => student._id !== id);
        setStudents(updatedStudents);
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
      }
    }
  };

  const restoreStudent = () => {
    if (deletedStudents.length > 0) {
      const lastDeleted = deletedStudents[deletedStudents.length - 1];
      setStudents([...students, lastDeleted]);
      setDeletedStudents(deletedStudents.slice(0, -1));
    }
  };

  const toggleFrozen = (id) => {
    const updatedStudents = students.map((student) =>
      student._id === id ? { ...student, frozen: !student.frozen } : student
    );
    setStudents(updatedStudents);
  };

  const manageWorkout = (id) => {
    localStorage.setItem('currentStudentId', id);
    window.location.href = '/treino';
  };

  const editStudent = async (id) => {
    const studentToEdit = students.find((student) => student._id === id);
    if (studentToEdit) {
      const newName = prompt('Digite o novo nome do aluno:', studentToEdit.nome); 
      const newCpf = prompt('Digite o novo CPF do aluno:', studentToEdit.cpf);
      const newDob = prompt('Digite a nova data de nascimento do aluno:', studentToEdit.dataDeNascimento); // Usar 'dataDeNascimento'
      const newContract = prompt('Digite o novo número de meses do contrato:', studentToEdit.tempoDeContrato); // Usar 'tempoDeContrato'

      if (newName && newCpf && newDob && newContract) {
        try {
          
          await axios.put(`http://localhost:8000/api/user/update/${id}`, {
            nome: newName,
            cpf: newCpf,
            dataDeNascimento: newDob,
            tempoDeContrato: newContract
          });

          
          const updatedStudents = students.map((student) =>
            student._id === id
              ? { ...student, nome: newName, cpf: newCpf, dataDeNascimento: newDob, tempoDeContrato: newContract }
              : student
          );
          setStudents(updatedStudents);
        } catch (error) {
          console.error('Erro ao editar aluno:', error);
        }
      }
    }
  };

  return (
    <div className="container">
      <h1>Alunos Matriculados</h1>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <strong>{student.nome}</strong> - CPF: {student.cpf} <br />
            Data de Nascimento: {student.dataDeNascimento} <br />
            Contrato: {student.tempoDeContrato} meses <br />
            Status: {student.frozen ? 'Contrato Congelado' : 'Ativo'} <br />
            {student.veteran && student.discount && (
              <>
                Desconto: {student.discount}% <br />
              </>
            )}
            {/* Verificação se o aluno veio de uma promoção */}
            {student.fromPromotion && (
              <>
                <strong>Promoção Ativada:</strong> <br />
                Valor da Promoção: {student.promotionPlan} <br />
                Duração do Plano: {student.promotionDuration} meses <br />
              </>
            )}
            <button className="btn-congelar" onClick={() => toggleFrozen(student._id)}>
              {student.frozen ? 'Descongelar Contrato' : 'Congelar Contrato'}
            </button>
            <button className="btn-gerenciar" onClick={() => manageWorkout(student._id)}>Gerenciar Treinos</button>
            <button className="btn-excluir" onClick={() => deleteStudent(student._id)}>Excluir</button>
            <button className="btn-editar" onClick={() => editStudent(student._id)}>Editar</button>
          </li>
        ))}
      </ul>
      {deletedStudents.length > 0 && (
        <button onClick={restoreStudent} className="restore-btn">Recuperar Último Aluno Excluído</button>
      )}
    </div>
  );
};

export default Alunos;
