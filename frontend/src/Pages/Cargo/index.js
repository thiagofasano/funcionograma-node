/* eslint-disable func-names */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'react-bootstrap';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import sortable from 'html5sortable/dist/html5sortable.es';
import api from '../../services/api';
import confirmService from '../../Components/confirmService/Confirm';
import Menu from '../../Components/Menu';

function Cargos() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    async function loadCargos() {
      const response = await api.get('/cargos');
      setCargos(response.data);
    }

    sortable('.js-sortable', {
      forcePlaceholderSize: true,
    });

    sortable('.js-sortable')[0].addEventListener('sortupdate', async e => {
      const arrayTr = e.detail.destination.items;
      const arrayObj = [];

      for (let i = 0; i < arrayTr.length; i++) {
        arrayObj.push({
          id: arrayTr[i].id,
          nome: arrayTr[i].textContent,
          ordem: arrayTr[i].sectionRowIndex,
        });
      }

      await api.put('/cargos/', arrayObj);
      return toast.success('Ordenação atualizada com sucesso.');
    });

    loadCargos();
  }, []);

  async function handleDelete(id, name) {
    const result = await confirmService.show({
      title: 'Confirmação',
      message: `Deseja deletar o cargo: ${name} ?`,
    });
    if (result) {
      await api.delete(`/cargos/${id}`);
      setCargos(cargos.filter(cargo => cargo.id !== id));
      return toast.success('Cargo deletado com sucesso.');
    }
    return '';
  }

  // async function handleDelete(id) {
  //   try {
  //     await api.delete(`/cargos/${id}`);
  //     setCargos(cargos.filter(cargo => cargo.id !== id));
  //     return toast.success('Cargo com sucesso.');
  //   } catch (err) {
  //     return toast.error('Não foi possível deletar.');
  //   }
  // }

  return (
    <>
      <Menu />
      <div className="container">
        <h3>Cargos</h3>
        <Alert variant="primary">
          Arraste os cargos da lista para alterar a ordem de importância.
        </Alert>

        <Table striped bordered className="cargos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody className="js-sortable">
            {cargos.map(cargo => (
              <tr id={cargo.id} key={cargo.id} draggable="true">
                <td>{cargo.nome}</td>
                <td>
                  <Link to={`/cargos/${cargo.id}`} size="sm">
                    <MdModeEdit size="16px" id={cargo.id} />
                  </Link>

                  <Link to="#" size="sm">
                    <MdDelete
                      onClick={() => handleDelete(cargo.id, cargo.nome)}
                      size="16px"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button href="novo" variant="success" size="sm">
          Novo
        </Button>
      </div>
    </>
  );
}

export default Cargos;
