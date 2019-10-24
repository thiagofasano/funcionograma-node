import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

function EquipeDetail({ match }) {
  const [nome, setNome] = useState('');
  const [atividades, setAtividades] = useState('');
  const [nucleo, setNucleo] = useState('');
  const [nucleos, setNucleos] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  const { id } = match.params;

  useEffect(() => {
    async function loadEquipe() {
      const responseEquipe = await api.get(`/equipes/${id}`);
      setAtividades(responseEquipe.data.atividades);
      setNome(responseEquipe.data.nome);
      setNucleo(responseEquipe.data.nucleo_id);
      setDepartamento(responseEquipe.data.nucleo.departamento_id);

      const responseNucleos = await api.get(
        `/nucleos/?departamento=${responseEquipe.data.nucleo.departamento_id}`
      );
      setNucleos(responseNucleos.data);

      const responseDepartamentos = await api.get(`/departamentos`);
      setDepartamentos(responseDepartamentos.data);
    }

    loadEquipe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.put(`/equipes/${id}`, {
      nome,
      atividades,
      departamento_id: departamento,
      nucleo_id: nucleo,
    });
    return toast.success(`Atualizado com sucesso!`);
  }

  async function handleChangeDepartamento(e) {
    const response = await api.get(`/nucleos/?departamento=${e}`);
    setNucleos(response.data);
    setDepartamento(e);
  }

  const nucleosList = nucleos.map(nu => (
    <option key={nu.id} value={nu.id}>
      {nu.nome}
    </option>
  ));

  const departamentosListFilter = departamentos.filter(dep => {
    return dep.id === departamento;
  });

  const departamentosList = departamentosListFilter.map(dep => (
    <option key={dep.id} value={dep.id}>
      {dep.nome}
    </option>
  ));

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Editar Equipe</h3>

        <Form onSubmit={handleSubmit}>
          <>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  defaultValue={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="departamento"
                  defaultValue={departamento}
                  onChange={e => handleChangeDepartamento(e.target.value)}
                >
                  {departamentosList}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Núcleo</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="nucleo"
                  value={nucleo}
                  onChange={e => setNucleo(e.target.value)}
                >
                  {nucleosList}
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
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default EquipeDetail;
