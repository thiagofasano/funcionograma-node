import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

// import { Container } from './styles';

const Nucleo = ({ match }) => {
  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState('');
  const [atividades, setAtividades] = useState('');
  const [departamento, setDepartamento] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  const { id } = match.params;

  async function loadDeps() {
    const response = await api.get(`/departamentos/`);
    setDepartamentos(response.data);
  }

  async function loadNucleo() {
    const response = await api.get(`/nucleos/${id}`);
    setNome(response.data.nome);
    setAtividades(response.data.atividades);
    setDepartamento(response.data.departamento.id);
  }

  useEffect(() => {
    loadDeps();
    id && loadNucleo();
  }, []);

  async function handleSubmitEditar(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      return setValidated(true);
    }
    await api.put(`/nucleos/${id}`, {
      nome,
      atividades,
      departamento_id: departamento,
    });
    return toast.success(`Cadastrado com sucesso!`);
  }

  async function handleSubmitNovo(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    }
    await api.post(`/nucleos/`, {
      nome,
      atividades,
      departamento_id: departamento,
    });
    toast.success(`Cadastrado com sucesso!`);
    setValidated(false);
  }

  const departamentosList = departamentos.map(dep => (
    <option key={dep.id} value={dep.id}>
      {dep.nome}
    </option>
  ));

  return (
    <>
      <Menu />
      <div className="container">
        <h3>{id ? 'Editar' : 'Novo'} Núcleo</h3>

        <Form
          onSubmit={id ? handleSubmitEditar : handleSubmitNovo}
          noValidate
          validated={validated}
        >
          <>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  onChange={e => setNome(e.target.value)}
                  defaultValue={id && nome}
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
                  value={departamento}
                >
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
                value={id && atividades}
                onChange={e => setAtividades(e.target.value)}
                required
              />
            </Form.Group>
          </>

          <Button variant="primary" type="submit" size="sm">
            {id ? 'Editar' : 'Novo'}
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Nucleo;
