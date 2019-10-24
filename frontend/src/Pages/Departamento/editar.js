import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

function DepartamentoEditar({ match }) {
  const [departamentos, setDepartamentos] = useState([]);
  const [nome, setNome] = useState('');

  const { id } = match.params;

  useEffect(() => {
    async function loadDeps() {
      const response = await api.get(`/departamentos/${id}`);
      setDepartamentos(response.data);
      setNome(response.data.nome);
    }

    loadDeps();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.put(`/departamentos/${id}`, { nome });
    return toast.success(`Atualizado com sucesso!`);
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Editar Departamento</h3>

        <Form onSubmit={handleSubmit}>
          {departamentos.map(dep => (
            <Form.Row key={dep.id}>
              <Form.Group as={Col}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={dep.nome}
                  onChange={e => setNome(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
          ))}

          <Button variant="primary" type="submit" size="sm">
            Editar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default DepartamentoEditar;
