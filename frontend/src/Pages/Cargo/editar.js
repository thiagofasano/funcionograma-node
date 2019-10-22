import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

function CargosEditar({ match }) {
  const [cargos, setCargos] = useState([]);
  const [nome, setNome] = useState('');

  const { id } = match.params;

  useEffect(() => {
    async function loadCargos() {
      const response = await api.get(`/cargos/${id}`);
      setCargos(response.data);
      setNome(response.data.nome);
    }

    loadCargos();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    await api.put(`/cargos/${id}`, {
      nome,
    });

    return toast.success(`Atualizado com sucesso!`);
  }

  return (
    <div className="container">
      <h3>Editar Cargo</h3>

      <Form onSubmit={handleSubmit}>
        {cargos.map(cargo => (
          <Form.Row key={cargo.id}>
            <Form.Group as={Col}>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                defaultValue={cargo.nome}
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
  );
}

export default CargosEditar;
