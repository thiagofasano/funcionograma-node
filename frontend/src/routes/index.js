import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Main from '../Pages/Main';

// Departamento
import Departamento from '../Pages/Departamento';
import DepartamentoNovoEditar from '../Pages/Departamento/departamento';

// Nucleo
import Nucleo from '../Pages/Nucleo';
import NucleoNovoEditar from '../Pages/Nucleo/nucleo';

// Equipe
import Equipe from '../Pages/Equipe';
import EquipeNovoEditar from '../Pages/Equipe/equipe';

// Cargos
import Cargo from '../Pages/Cargo';
import CargoEditar from '../Pages/Cargo/editar';
import CargoNovo from '../Pages/Cargo/novo';

// Funcionario
import Funcionario from '../Pages/Funcionario';
import FuncionarioEditar from '../Pages/Funcionario/editar';
import FuncionarioNovo from '../Pages/Funcionario/novo';

// Funcionograma
import Funcionograma from '../Pages/Funcionograma';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/departamentos/" exact component={Departamento} />
        <Route path="/departamentos/novo" component={DepartamentoNovoEditar} />
        <Route path="/departamentos/:id" component={DepartamentoNovoEditar} />
        <Route path="/nucleos/" exact component={Nucleo} />
        <Route path="/nucleos/novo" exact component={NucleoNovoEditar} />
        <Route path="/nucleos/:id" component={NucleoNovoEditar} />
        <Route path="/equipes/" exact component={Equipe} />
        <Route path="/equipes/novo" component={EquipeNovoEditar} />
        <Route path="/equipes/:id" component={EquipeNovoEditar} />
        <Route path="/cargos/" exact component={Cargo} />
        <Route path="/cargos/novo" exact component={CargoNovo} />
        <Route path="/cargos/:id" exact component={CargoEditar} />
        <Route path="/funcionarios/" exact component={Funcionario} />
        <Route path="/funcionarios/novo" exact component={FuncionarioNovo} />
        <Route path="/funcionarios/:id" exact component={FuncionarioEditar} />
        <Route
          path="/funcionograma/:departamento"
          exact
          component={Funcionograma}
        />
        {/* <Route path="/404" component={NoExist} />
        <Redirect from="*" to="/404" component={NoExist} /> */}
      </Switch>
    </BrowserRouter>
  );
}
