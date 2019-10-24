import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Table, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import api from '../../services/api';
import confirmService from '../../Components/confirmService/Confirm';
import Menu from '../../Components/Menu';

function Equipe() {
  const [equipes, setEquipes] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [notFound, setNotFound] = useState('');

  useEffect(() => {
    async function loadDepartamento(e) {
      const response = await api.get(`/departamentos`);
      setDepartamento(response.data);
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
    setNucleos(response.data);
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

  const departamentoList = departamento.map(dep => (
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
              <option value="selecione">Selecione</option>
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

        <Table striped bordered>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Atividades</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipes.map(equipe => (
              <tr key={equipe.id}>
                <td>{equipe.nome}</td>
                <td>{equipe.atividades}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/equipes/${equipe.id}`,
                      data: equipe,
                    }}
                  >
                    <MdModeEdit size="16px" id={equipe.id} />
                  </Link>
                  <Link to="#" size="sm">
                    <MdDelete
                      onClick={() => handleDelete(equipe.id, equipe.nome)}
                      size="16px"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p>{notFound}</p>
        <Button href="novo" variant="success" size="sm">
          Novo
        </Button>
      </div>
    </>
  );
}

export default Equipe;
