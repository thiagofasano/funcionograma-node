import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';
import confirmService from '../../Components/confirmService/Confirm';
import Menu from '../../Components/Menu';
import Tabela from '../../Components/Tabela';

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
    <>
      <Menu />
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

        <Tabela
          data={funcionarios}
          onDelete={handleDelete}
          body={['Foto', 'Nome', 'Departamento', 'Nucleo', 'Equipe', 'Cargo']}
          headingNames={[
            'Foto',
            'Nome',
            'Departamento',
            'Núcleo',
            'Equipe',
            'Cargo',
          ]}
        />

        <p>{notFound}</p>

        <Button href="novo" variant="success" size="sm">
          Novo
        </Button>
      </div>
    </>
  );
}

export default Funcionario;
