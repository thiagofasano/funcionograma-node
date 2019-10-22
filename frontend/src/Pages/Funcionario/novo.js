import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';

function FuncionarioNovo() {
  const [departamentos, setDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState(null);
  const [nucleos, setNucleos] = useState([]);
  const [nucleo, setNucleo] = useState(null);
  const [equipes, setEquipes] = useState([]);
  const [equipe, setEquipe] = useState(null);
  const [cargos, setCargos] = useState([]);
  const [cargo, setCargo] = useState(null);
  const [nome, setNome] = useState(null);
  const [image, setImage] = useState(null);
  // const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadOpcoes() {
      const response = await api.get('/departamentos');
      setDepartamentos(response.data);

      const response2 = await api.get(
        `/nucleos?departamento=${response.data[0].departamento_id}`
      );
      setNucleos(response2.data);

      const response4 = await api.get('/cargos');
      setCargos(response4.data);
    }

    loadOpcoes();
  }, []);

  async function handleSelectDepartamento(e) {
    const response = await api.get(`/nucleos/?departamento=${e}`);
    setNucleos(response.data);
    setDepartamento(e);

    if (response.data.length === 0) {
      const response1 = await api.get(`/equipes/?nucleo=0`);
      setEquipes(response1.data);
    } else {
      const response2 = await api.get(
        `/equipes/?nucleo=${response.data[0].id}`
      );
      setEquipes(response2.data);
    }
  }

  async function handleSelectNucleo(e) {
    const response = await api.get(`/equipes/?nucleo=${e}`);
    setEquipes(response.data);
    setNucleo(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append('nome', nome);
    data.append('image', image);
    data.append('cargo_id', cargo);
    data.append('departamento_id', departamento);
    data.append('nucleo_id', nucleo);
    data.append('equipe_id', equipe);

    await api.post(`/funcionarios/`, data);
    return toast.success(`Criado com sucesso!`);
  }

  const departamentosList = departamentos.map(dep => (
    <option value={dep.id}>{dep.nome}</option>
  ));

  const nucleosList = nucleos.map(nu => (
    <option value={nu.id}>{nu.nome}</option>
  ));

  const equipesList = equipes.map(eq => (
    <option value={eq.id}>{eq.nome}</option>
  ));

  const cargosList = cargos.map(car => (
    <option value={car.id}>{car.nome}</option>
  ));

  return (
    <div className="container">
      <h3>Novo Funcionário</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} xs={12} md={12}>
            <Form.Label>Foto</Form.Label>
            <Form.Control
              type="file"
              name="foto"
              onChange={e => setImage(e.target.files[0])}
            />

            <br />

            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              onChange={e => setNome(e.target.value)}
            />
            <br />

            <Form.Label>Departamento</Form.Label>

            <Form.Control
              as="select"
              type="text"
              name="departamento"
              value={departamento}
              onChange={e => handleSelectDepartamento(e.target.value)}
            >
              <option value="0">Selecione uma opção</option>
              {departamentosList}
            </Form.Control>
            <br />
            <Form.Label>Nucleo</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="nucleo"
              value={nucleo}
              onChange={e => handleSelectNucleo(e.target.value)}
            >
              <option value="0">Selecione uma opção</option>
              {nucleosList}
            </Form.Control>
            <br />
            <Form.Label>Equipe</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="equipe"
              onChange={e => setEquipe(e.target.value)}
            >
              <option value="0">Selecione uma opção</option>
              {equipesList}
            </Form.Control>
            <br />
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              as="select"
              type="text"
              name="cargo"
              onChange={e => setCargo(e.target.value)}
            >
              <option value="0">Selecione uma opção</option>
              {cargosList}
            </Form.Control>
            <br />
            <Button variant="success" type="submit" size="sm">
              Cadastrar
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}

export default FuncionarioNovo;
