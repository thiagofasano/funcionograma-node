import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

function FuncionarioEditar({ match }) {
  const [validated, setValidated] = useState(false);

  // Listas
  const [funcionarios, setFuncionarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [cargos, setCargos] = useState([]);

  // Informações de cadastro
  const [nome, setNome] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [cargo, setCargo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [nucleo, setNucleo] = useState('');
  const [equipe, setEquipe] = useState('');

  const { id } = match.params;

  useEffect(() => {
    async function loadFuncionario() {
      const response = await api.get(`/funcionarios/${id}`);
      setFuncionarios(response.data);
      setNome(response.data[0].nome);
      setCargo(response.data[0].cargo_id);
      setDepartamento(response.data[0].departamento_id);
      setNucleo(response.data[0].nucleo_id);
      setEquipe(response.data[0].equipe_id);

      const response1 = await api.get('/departamentos');
      setDepartamentos(response1.data);

      const response2 = await api.get(
        `/nucleos?departamento=${response.data[0].departamento_id}`
      );
      setNucleos(response2.data);

      const response3 = await api.get(
        `/equipes?nucleo=${response.data[0].nucleo_id}`
      );

      setEquipes(response3.data);

      const response4 = await api.get('/cargos');
      setCargos(response4.data);
    }

    loadFuncionario();
  }, [id]);

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

  // function handleImage(e) {
  //   setImage(e.target.files[0]);
  //   setImagePreview(URL.createObjectURL(e.target.files[0]));
  // }

  async function handleSelectNucleo(e) {
    const response = await api.get(`/equipes/?nucleo=${e}`);
    setEquipes(response.data);
    setNucleo(e);

    if (response.data.length <= 0) {
      setEquipe(null);
    }
  }

  async function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      setValidated(true);
    } else {
      e.preventDefault();

      const data = new FormData();

      data.append('nome', nome);

      data.append('image', image);

      data.append('cargo_id', cargo);
      data.append('departamento_id', departamento);
      data.append('nucleo_id', nucleo);
      data.append('equipe_id', equipe);

      await api.put(`/funcionarios/${id}`, data);

      toast.success(`Atualizado com sucesso!`);
    }
  }

  const departamentosList = departamentos.map(dep => (
    <option key={dep.id} value={dep.id}>
      {dep.nome}
    </option>
  ));

  const nucleosList = nucleos.map(nu => (
    <option key={nu.id} value={nu.id}>
      {nu.nome}
    </option>
  ));

  const equipesList = equipes.map(eq => (
    <option key={eq.id} value={eq.id}>
      {eq.nome}
    </option>
  ));

  const cargosList = cargos.map(car => (
    <option key={car.id} value={car.id}>
      {car.nome}
    </option>
  ));

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Editar Funcionário</h3>
        {funcionarios.map(funcionario => (
          <Form
            key={funcionario.id}
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Row>
              <Form.Group as={Col}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt=""
                    width="150px"
                    className="profile"
                  />
                ) : (
                  <img
                    src={`http://localhost:3333/files/${funcionario.image.path}`}
                    alt=""
                    width="150px"
                    className="profile"
                  />
                )}
              </Form.Group>

              <Form.Group as={Col} xs={12} md={9}>
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="file"
                  name="foto"
                  onChange={e => {
                    setImage(e.target.files[0]);
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />

                <br />
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  defaultValue={funcionario.nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
                <br />
                <Form.Label>Departamento</Form.Label>

                <Form.Control
                  as="select"
                  type="text"
                  name="departamento"
                  value={departamento}
                  onChange={e => handleSelectDepartamento(e.target.value)}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  {departamentosList}
                </Form.Control>
                <br />
                <Form.Label>Núcleo</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="nucleo"
                  value={nucleo}
                  onChange={e => handleSelectNucleo(e.target.value)}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  {nucleosList}
                </Form.Control>
                <br />
                <Form.Label>Equipe</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="equipe"
                  value={equipe}
                  onChange={e => setEquipe(e.target.value)}
                >
                  {}
                  <option value="">Selecione uma opção</option>
                  {equipesList}
                </Form.Control>
                <br />
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="cargo"
                  value={cargo}
                  onChange={e => setCargo(e.target.value)}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  {cargosList}
                </Form.Control>
                <br />
                <Button variant="primary" type="submit" size="sm">
                  Editar
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        ))}
      </div>
    </>
  );
}

export default FuncionarioEditar;
