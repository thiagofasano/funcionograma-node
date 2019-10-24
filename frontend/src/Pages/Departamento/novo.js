import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

function DepartamentoNovo(props) {
  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState('');

  async function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      setValidated(true);
    } else {
      e.preventDefault();
      await api.post(`/departamentos/`, { nome });
      toast.success(`Departamento cadastrado com sucesso!`);
      setNome('');
      setValidated(false);
      props.history.push('/departamentos');
    }
  }

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Novo Departamento</h3>

        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                onChange={e => setNome(e.target.value)}
                value={nome}
                required
              />
            </Form.Group>
          </Form.Row>

          <Button variant="success" type="submit" size="sm">
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default DepartamentoNovo;
