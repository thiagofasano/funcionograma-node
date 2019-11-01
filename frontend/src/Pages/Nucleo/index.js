import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Row, Col, Form } from 'react-bootstrap';
import api from '../../services/api';
import confirmService from '../../Components/confirmService/Confirm';
import Menu from '../../Components/Menu';
import Tabela from '../../Components/Tabela';

function Nucleos() {
  const [nucleos, setNucleos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [notFound, setNotFound] = useState('');

  useEffect(() => {
    async function loadDepartamentos() {
      const response = await api.get('/departamentos');
      setDepartamentos(response.data);
    }

    loadDepartamentos();
  }, []);

  async function handleDelete(id, name) {
    const result = await confirmService.show({
      title: 'Confirmação',
      message: `Deseja deletar o núcleo: ${name} ?`,
    });
    if (result) {
      await api.delete(`/nucleos/${id}`);
      setNucleos(nucleos.filter(nucleo => nucleo.id !== id));
      return toast.success('Núcleo deletado com sucesso.');
    }
    return '';
  }

  async function handleSelectDepartamento(e) {
    const response = await api.get(`/nucleos/?departamento=${e.target.value}`);

    setNucleos(response.data);

    if (response.data.length === 0) {
      setNotFound('Não existe núcleo cadastrado.');
    } else {
      setNotFound('');
    }
  }

  const departamentosList = departamentos.map(dep => (
    <option value={dep.id} key={dep.id}>
      {dep.nome}
    </option>
  ));

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Núcleos</h3>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Departamento:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              type="text"
              name="depatamento"
              onChange={e => handleSelectDepartamento(e)}
            >
              <option value="selecione">Selecione</option>
              {departamentosList}
            </Form.Control>
          </Col>
        </Form.Group>

        <Tabela
          data={nucleos}
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

export default Nucleos;
