/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

// import { Container } from './styles';

const Departamento = ({ match }) => {
  const [validated, setValidated] = useState(false);
  const [departamento, setDepartamento] = useState({});
  const [nome, setNome] = useState('');

  const { id } = match.params;

  async function loadDeps() {
    const response = await api.get(`/departamentos/${id}`);
    setDepartamento(response.data);
  }

  useEffect(() => {
    loadDeps();
  }, []);

  async function handleSubmitEditar(e) {
    e.preventDefault();
    await api.put(`/departamentos/${id}`, { nome });
    return toast.success(`Atualizado com sucesso!`);
  }

  async function handleSubmitNovo(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      await api.post(`/departamentos/`, { nome });
      toast.success(`Departamento cadastrado com sucesso!`);
      setNome('');
      setValidated(false);
    }
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h3>{id ? 'Editar' : 'Novo'} Departamento</h3>

        <Form
          onSubmit={id ? handleSubmitEditar : handleSubmitNovo}
          noValidate
          validated={validated}
        >
          <Form.Row key={id && departamento.id}>
            <Form.Group as={Col}>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                defaultValue={id && departamento.nome}
                onChange={e => setNome(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit" size="sm">
            {id ? 'Editar' : 'Novo'}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Departamento;
