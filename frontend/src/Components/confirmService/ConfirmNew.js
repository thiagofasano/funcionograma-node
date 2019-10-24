import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const defaultProps = {
  title: 'Confirmação',
  message: 'Deseja realizar essa operação?',
};

function Confirm() {
  let resolve;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function create() {
      const containerElement = document.createElement('div');
      document.body.appendChild(containerElement);
      return render(<Confirm />, containerElement);
    }

    create();
  }, []);

  function handleCancel() {
    setIsOpen(false);
    resolve(false);
  }

  function handleConfirm() {
    setIsOpen(false);
    resolve(true);
  }

  function show() {
    setIsOpen(true);
    return new Promise(res => {
      resolve = res;
    });
  }

  return (
    <div className={!isOpen ? 'modal' : 'modal is-active'}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <h3 className="modal-card-title">{defaultProps.title}</h3>
        </header>
        <section className="modal-card-body">
          <p>{defaultProps.message}</p>
        </section>
        <footer className="modal-card-foot">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => handleConfirm()}
          >
            Sim
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm"
            onClick={() => handleCancel()}
          >
            Não
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Confirm;
