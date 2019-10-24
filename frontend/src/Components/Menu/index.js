import React from 'react';
import { NavLink } from 'react-router-dom';

import { Header } from './styles';

function Menu() {
  return (
    <>
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
    </>
  );
}

export default Menu;
