import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import confirmService from '../../Components/confirmService/Confirm';
import Menu from '../../Components/Menu';
import Tabela from '../../Components/Tabela';

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    async function loadDeps() {
      const response = await api.get('/departamentos');
      setDepartamentos(response.data);
    }

    loadDeps();
  }, []);

  async function handleDelete(id, name) {
    const result = await confirmService.show({
      title: 'Confirmação',
      message: `Deseja deletar o departamento: ${name} ?`,
    });
    if (result) {
      await api.delete(`/departamentos/${id}`);
      setDepartamentos(
        departamentos.filter(departamento => departamento.id !== id)
      );
      return toast.success('Departamento deletado com sucesso.');
    }
    return '';
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Departamentos</h3>
        <Tabela
          data={departamentos}
          onDelete={handleDelete}
          headingNames={['Nome']}
          body={['Nome']}
        />
        <Button href="./novo" variant="success" size="sm">
          Novo
        </Button>
      </div>
    </>
  );
}

export default Departamentos;
