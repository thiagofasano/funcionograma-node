import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import confirmService from '../../confirmService/Confirm';

function Funcionario() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [notFound, setNotFound] = useState('');

  async function loadDepartamentos() {
    const response = await api.get('/departamentos');
    setDepartamentos(response.data);
  }

  const departamentosList = departamentos.map(dep => (
    <option value={dep.id} key={dep.id}>
      {dep.nome}
    </option>
  ));

  async function handleSelectDepartamento(e) {
    const response = await api.get(
      `/funcionarios/?departamento=${e.target.value}`
    );
    setFuncionarios(response.data);
    setCurrentList(response.data);

    if (response.data.length === 0) {
      setNotFound('Não existe funcionário cadastrado.');
    } else {
      setNotFound('');
    }
  }

  useEffect(() => {
    loadDepartamentos();
  }, []);

  async function handleDelete(id, name) {
    const result = await confirmService.show({
      title: 'Confirmação',
      message: `Deseja deletar o funcionário: ${name} ?`,
    });
    if (result) {
      await api.delete(`/funcionarios/${id}`);
      setFuncionarios(
        funcionarios.filter(funcionario => funcionario.id !== id)
      );
      return toast.success('Funcionário deletado com sucesso.');
    }
    return '';
  }

  function search(e) {
    if (e.target.value) {
      const val = e.target.value.toLowerCase();
      const newList = funcionarios.filter(v =>
        v.nome.toLowerCase().includes(val)
      );
      setFuncionarios(newList);
    } else {
      setFuncionarios(currentList);
    }
  }

  return (
    <div className="container">
      <h3>Funcionários</h3>

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
            {departamentosList}
          </Form.Control>
        </Col>
      </Form.Group>

      {funcionarios.length <= 0 ? (
        ''
      ) : (
        <div>
          <Form.Control
            placeholder="Pesquisar por nome.."
            type="text"
            onChange={e => search(e)}
          />
          <br />
        </div>
      )}

      <Table striped bordered>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Departamento</th>
            <th>Núcleo</th>
            <th>Equipe</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => (
            <tr key={funcionario.id}>
              <td>
                {funcionario.image ? (
                  <img
                    src={`http://localhost:3333/files/${funcionario.image.path}`}
                    alt=""
                    width="61px"
                    className="profile"
                  />
                ) : (
                  <img src="" alt="" width="61px" className="profile" />
                )}
              </td>
              <td>{funcionario.nome}</td>
              <td>
                {funcionario.departamento ? funcionario.departamento.nome : ''}
              </td>
              <td>{funcionario.nucleo ? funcionario.nucleo.nome : ''}</td>
              <td>{funcionario.equipe ? funcionario.equipe.nome : ''}</td>
              <td>{funcionario.cargo ? funcionario.cargo.nome : ''}</td>
              <td>
                <Link
                  to={{
                    pathname: `/funcionarios/${funcionario.id}`,
                    data: funcionario,
                  }}
                >
                  <MdModeEdit size="16px" id={funcionario.id} />
                </Link>

                <Link to="#" size="sm">
                  <MdDelete
                    onClick={() =>
                      handleDelete(funcionario.id, funcionario.nome)
                    }
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
  );
}

export default Funcionario;
