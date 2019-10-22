import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Funcionograma({ match }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nucleos, setNucleos] = useState([]);
  const [equipes, setEquipes] = useState([]);

  const { departamento } = match.params;

  useEffect(() => {
    async function loadNucleos() {
      const response = await api.get(`/nucleos?departamento=${departamento}`);
      setNucleos(response.data);
    }

    async function loadEquipes() {
      const response = await api.get(`/equipes?departamento=${departamento}`);
      setEquipes(response.data);
    }

    async function loadFuncionarios() {
      const response = await api.get(
        `/funcionarios?departamento=${departamento}`
      );
      setFuncionarios(response.data);
    }

    loadNucleos();
    loadEquipes();
    loadFuncionarios();
  }, []);

  return (
    <div className="container">
      <h3>Funcionograma</h3>

      {nucleos.map(nuc => (
        <div>
          <br />
          <h5>
            <strong>{nuc.nome}</strong>
          </h5>
          <p>{nuc.atividades}</p>
          <ul>
            {funcionarios
              .filter(fun => fun.nucleo.id == nuc.id)
              .filter(fun => !fun.equipe)
              .sort((a, b) => a.cargo.ordem - b.cargo.ordem)
              .map(func => (
                <li>
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
            .filter(equ => equ.nucleo.id == nuc.id)
            .map(equipe => (
              <div>
                <h6>
                  <strong>{equipe.nome} </strong>
                </h6>
                <ul>
                  {funcionarios
                    .filter(fun =>
                      fun.equipe ? equipe.id == fun.equipe.id : ''
                    )
                    .sort((a, b) => a.cargo.ordem - b.cargo.ordem)
                    .map(func => (
                      <li>
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
export default Funcionograma;
