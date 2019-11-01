import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Button, Col } from 'react-bootstrap';
import api from '../../services/api';
import Menu from '../../Components/Menu';

function EquipeNovo(props) {
  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState('');
  const [atividades, setAtividades] = useState('');
  const [nucleo, setNucleo] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [departamento, setDepartamento] = useState('');
  const [departamentos, setDepartamentos] = useState([]);

  async function loadNucleos() {
    const response = await api.get('/nucleos');
    setNucleos(response.data);

    const responseDepartamentos = await api.get(`/departamentos`);
    setDepartamentos(responseDepartamentos.data);
  }

  useEffect(() => {
    loadNucleos();
  }, []);

  async function handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      setValidated(true);
    } else {
      e.preventDefault();
      await api.post(`/equipes/`, {
        nome,
        atividades,
        nucleo_id: nucleo,
        departamento_id: departamento,
      });
      toast.success(`Atualizado com sucesso!`);
      setValidated(false);
      props.history.push('/equipes');
    }
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

  const departamentosList = departamentos.map(dep => (
    <option key={dep.id} value={dep.id}>
      {dep.nome}
    </option>
  ));

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Nova Equipe</h3>

        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Equipe</Form.Label>
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
                  name="departamento"
                  onChange={e => handleChangeDepartamento(e.target.value)}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  {departamentosList}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Núcleo</Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="nucleo"
                  onChange={e => setNucleo(e.target.value)}
                  required
                >
                  <option key="" value="">
                    Selecione uma opção
                  </option>

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
                onChange={e => setAtividades(e.target.value)}
                required
              />
            </Form.Group>
          </>

          <Button variant="success" type="submit" size="sm">
            Cadastrar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default EquipeNovo;
