import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

function NucleoEditar({ match }) {
  const [nome, setNome] = useState('');
  const [atividades, setAtividades] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [departamentos, setDepartamentos] = useState([]);

  const { id } = match.params;

  useEffect(() => {
    async function loadNucleos() {
      const response = await api.get(`/nucleos/${id}`);
      setAtividades(response.data.atividades);
      setNome(response.data.nome);
      setDepartamento(response.data.departamento_id);
    }

    async function loadDepartamentos() {
      const response = await api.get('/departamentos');
      setDepartamentos(response.data);
    }

    loadNucleos();
    loadDepartamentos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.put(`/nucleos/${id}`, {
      nome,
      atividades,
      departamento_id: departamento,
    });
    return toast.success(`Cadastrado com sucesso!`);
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
        <h3>Editar Núcleo</h3>

        <Form onSubmit={handleSubmit}>
          <>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  onChange={e => setNome(e.target.value)}
                  defaultValue={nome}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="depatamento"
                  value={departamento}
                  onChange={e => setDepartamento(e.target.value)}
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
                value={atividades}
                onChange={e => setAtividades(e.target.value)}
              />
            </Form.Group>
          </>

          <Button variant="primary" type="submit" size="sm">
            Editar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default NucleoEditar;
