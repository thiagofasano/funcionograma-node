import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Main from '../Pages/Main';
import Menu from '../Components/Menu';
import NoExist from '../Pages/NoExist';

// Departamento
import Departamento from '../Pages/Departamento';
import DepartamentoEditar from '../Pages/Departamento/editar';
import DepartamentoNovo from '../Pages/Departamento/novo';

// Nucleo
import Nucleo from '../Pages/Nucleo';
import NucleoEditar from '../Pages/Nucleo/editar';
import NucleoNovo from '../Pages/Nucleo/novo';

// Equipe
import Equipe from '../Pages/Equipe';
import EquipeEditar from '../Pages/Equipe/editar';
import EquipeNovo from '../Pages/Equipe/novo';

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
      <Menu />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/departamentos/" exact component={Departamento} />
        <Route path="/departamentos/novo" component={DepartamentoNovo} />
        <Route path="/departamentos/:id" component={DepartamentoEditar} />
        <Route path="/nucleos/" exact component={Nucleo} />
        <Route path="/nucleos/novo" exact component={NucleoNovo} />
        <Route path="/nucleos/:id" component={NucleoEditar} />
        <Route path="/equipes/" exact component={Equipe} />
        <Route path="/equipes/novo" component={EquipeNovo} />
        <Route path="/equipes/:id" component={EquipeEditar} />
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
        <Route path="/404" component={NoExist} />
        <Redirect from="*" to="/404" component={NoExist} />
      </Switch>
    </BrowserRouter>
  );
}
