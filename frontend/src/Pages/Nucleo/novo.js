import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';

function NucleoNovo(props) {
  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState('');
  const [atividades, setAtividades] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [departamentos, setDepartamentos] = useState([]);

  async function loadDepartamentos() {
    const response = await api.get('/departamentos');
    setDepartamentos(response.data);
  }

  useEffect(() => {
    loadDepartamentos();
  }, []);

  async function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      setValidated(true);
    }
    e.preventDefault();
    await api.post(`/nucleos/`, {
      nome,
      atividades,
      departamento_id: departamento,
    });
    setValidated(false);
    toast.success(`Cadastrado com sucesso!`);
    setValidated(false);
    props.history.push('/nucleos');
  }

  const departamentosList = departamentos.map(dep => (
    <option value={dep.id}>{dep.nome}</option>
  ));

  return (
    <div className="container">
      <h3>Novo Núcleo</h3>

      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Núcleo</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              onChange={e => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Departamento</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="depatamento"
              onChange={e => setDepartamento(e.target.value)}
              required
            >
              <option value="">Selecione uma opção</option>
              {departamentosList}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>Atividades</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="atividades"
            onChange={e => setAtividades(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" size="sm">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}

export default NucleoNovo;
