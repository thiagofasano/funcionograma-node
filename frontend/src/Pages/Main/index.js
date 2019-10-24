import React from 'react';
import Menu from '../../Components/Menu';

export default function Main() {
  return (
    <>
      <Menu />
      <div className="container">
        <h3>Bem-vindo!</h3>
        <p>
          Este é um gerenciador (CRUD) para funcionogramas feito em MVC. No
          front-end ReactJS, no back-end NodeJS com express e sequelize. Utilize
          o menu superior para iniciar sua navegação.
        </p>
      </div>
    </>
  );
}
