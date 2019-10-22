import React from 'react';
import { NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Header } from './styles';

const history = createBrowserHistory();

const show = history.location.pathname.indexOf('funcionograma') === 1;

export default function Menu() {
  return (
    <>
      {show ? (
        ''
      ) : (
        <Header>
          <div className="container">
            <NavLink to="">Home</NavLink>
            <NavLink to="/departamentos/">Departamentos</NavLink>
            <NavLink to="/nucleos/">Núcleos</NavLink>
            <NavLink to="/equipes/">Equipes</NavLink>
            <NavLink to="/cargos/">Cargos</NavLink>
            <NavLink to="/funcionarios/">Funcionários</NavLink>
          </div>
        </Header>
      )}
    </>
  );
}
