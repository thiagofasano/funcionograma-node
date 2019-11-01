import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Row, Col, Button } from 'react-bootstrap';
import api from '../../services/api';
import confirmService from '../../Components/confirmService/Confirm';
import Menu from '../../Components/Menu';
import Tabela from '../../Components/Tabela';

function Equipe() {
  const [equipes, setEquipes] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [notFound, setNotFound] = useState('');

  useEffect(() => {
    async function loadDepartamento(e) {
      const response = await api.get(`/departamentos`);
      setDepartamentos(response.data);
    }

    loadDepartamento();
  }, []);

  async function handleDelete(id, name) {
    const result = await confirmService.show({
      title: 'Confirmação',
      message: `Deseja deletar a equipe: ${name} ?`,
    });
    if (result) {
      await api.delete(`/equipes/${id}`);
      setEquipes(equipes.filter(equipe => equipe.id !== id));
      return toast.success('Equipe deletada com sucesso.');
    }
    return '';
  }

  async function handleSelectDepartamento(e) {
    const response = await api.get(`/nucleos/?departamento=${e.target.value}`);

    if (response.data.length === 0) {
      setEquipes([]);
      setNucleos([]);
    } else {
      setNucleos(response.data);
    }
  }

  async function handleSelectNucleo(e) {
    const response = await api.get(`/equipes/?nucleo=${e.target.value}`);
    setEquipes(response.data);
    if (response.data.length === 0) {
      setNotFound('Não existe equipe cadastrada.');
    } else {
      setNotFound('');
    }
  }

  const departamentoList = departamentos.map(dep => (
    <option value={dep.id} key={dep.id}>
      {dep.nome}
    </option>
  ));

  const nucleoList = nucleos.map(nu => (
    <option value={nu.id} key={nu.id}>
      {nu.nome}
    </option>
  ));

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Equipes</h3>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Departamento:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              type="text"
              name="departamento"
              onChange={e => handleSelectDepartamento(e)}
            >
              <option value="0">Selecione</option>
              {departamentoList}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Núcleo:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              type="text"
              name="nucleo"
              onChange={e => handleSelectNucleo(e)}
            >
              <option value="selecione">Selecione</option>
              {nucleoList}
            </Form.Control>
          </Col>
        </Form.Group>

        <Tabela
          data={equipes}
          onDelete={handleDelete}
          headingNames={['Nome', 'Atividades']}
          body={['Nome', 'Atividades']}
        />

        <p>{notFound}</p>
        <Button href="novo" variant="success" size="sm">
          Novo
        </Button>
      </div>
    </>
  );
}

export default Equipe;
