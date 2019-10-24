import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import confirmService from '../../Components/confirmService/Confirm';
import Menu from '../../Components/Menu';

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

        <Table striped bordered>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map(dep => (
              <tr key={dep.id}>
                <td>{dep.nome}</td>
                <td>
                  <Link to={`/departamentos/${dep.id}`} size="sm">
                    <MdModeEdit size="16px" id={dep.id} />
                  </Link>

                  <Link to="#" size="sm">
                    <MdDelete
                      onClick={() => handleDelete(dep.id, dep.nome)}
                      size="16px"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button href="novo" variant="success" size="sm">
          Novo
        </Button>
      </div>
    </>
  );
}

export default Departamentos;
