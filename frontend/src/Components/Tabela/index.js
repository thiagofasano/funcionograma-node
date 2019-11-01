import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { MdDelete, MdModeEdit } from 'react-icons/md';

export default function Tabela({ classe, body, data, onDelete, headingNames }) {
  function renderTableHeader() {
    return headingNames.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  }

  function renderTableData() {
    return data.map(el => {
      return (
        <tr key={el.id}>
          {body.includes('Foto') && (
            <td>
              <img
                src={`http://localhost:3333/files/${el.image.path}`}
                alt=""
                width="50px"
                className="profile-grid"
              />
            </td>
          )}
          {body.includes('Nome') && <td>{el.nome}</td>}
          {body.includes('Departamento') && <td>{el.departamento.nome}</td>}
          {body.includes('Nucleo') && el.nucleo != null && (
            <td>{el.nucleo.nome}</td>
          )}
          {body.includes('Nucleo') && el.nucleo === null && <td> </td>}

          {body.includes('Equipe') && el.equipe != null && (
            <td>{el.equipe.nome}</td>
          )}
          {body.includes('Equipe') && el.equipe === null && <td> </td>}
          {body.includes('Cargo') && <td>{el.cargo.nome}</td>}
          {body.includes('Atividades') && <td>{el.atividades}</td>}
          <td>
            <Link to={`./${el.id}`} size="sm">
              <MdModeEdit size="16px" id={el.id} />
            </Link>

            <Link to="#" size="sm">
              <MdDelete onClick={() => onDelete(el.id, el.nome)} size="16px" />
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <Table striped bordered className={classe}>
      <thead>
        <tr>
          {renderTableHeader()}
          {data.length > 0 && <th>Ações</th>}
        </tr>
      </thead>

      <tbody>{renderTableData()}</tbody>
    </Table>
  );
}
