import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../services/api';

function Funcionograma({ match }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [equipes, setEquipes] = useState([]);

  const { departamento } = match.params;

  useEffect(() => {
    async function loadFuncionograma() {
      const [dataFuncionarios, dataEquipes, dataNucleos] = await Promise.all([
        api.get(`/funcionarios?departamento=${departamento}`),
        api.get(`/equipes?departamento=${departamento}`),
        api.get(`/nucleos?departamento=${departamento}`),
      ]);

      setFuncionarios(dataFuncionarios.data);
      setNucleos(dataNucleos.data);
      setEquipes(dataEquipes.data);

      // const { dispatch } = props;

      // dispatch({
      //   type: 'MENU_VIEW',
      //   visitante: true,
      // });
    }

    loadFuncionograma();
  }, [departamento]);

  return (
    <div className="container">
      <h3>Funcionograma</h3>

      {nucleos.map(nuc => (
        <div key={nuc.id}>
          <br />
          <h5>
            <strong>{nuc.nome}</strong>
          </h5>
          <p>{nuc.atividades}</p>
          <ul>
            {funcionarios
              .filter(fun => fun.nucleo.id === nuc.id)
              .filter(fun => !fun.equipe)
              .sort((a, b) => a.cargo.ordem - b.cargo.ordem)
              .map(func => (
                <li key={func.id}>
                  <img
                    src={`http://localhost:3333/files/${func.image.path}`}
                    alt=""
                    width="75px"
                    className="profile"
                  />
                  {func.nome} <p> {func.cargo.nome} </p>
                </li>
              ))}
          </ul>

          {equipes
            .filter(equ => equ.nucleo.id === nuc.id)
            .map(equipe => (
              <div key={equipe.id}>
                <h6>
                  <strong>{equipe.nome} </strong>
                </h6>
                <ul>
                  {funcionarios
                    .filter(fun =>
                      fun.equipe ? equipe.id === fun.equipe.id : ''
                    )
                    .sort((a, b) => a.cargo.ordem - b.cargo.ordem)
                    .map(func => (
                      <li key={func.id}>
                        <img
                          src={`http://localhost:3333/files/${func.image.path}`}
                          alt=""
                          width="75px"
                          className="profile"
                        />
                        {func.nome} <p> {func.cargo.nome} </p>
                      </li>
                    ))}
                </ul>
                <br />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default connect(state => ({
  user: state.user,
}))(Funcionograma);
