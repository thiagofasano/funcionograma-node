import React, { Component } from 'react';
import { render } from 'react-dom';

const defaultProps = {
  title: 'Confirmação',
  message: 'Deseja realizar essa operação?',
};

let resolve;

class Confirm extends Component {
  static create(props = {}) {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    return render(<Confirm createConfirmProps={props} />, containerElement);
  }

  constructor() {
    super();

    this.state = {
      isOpen: false,
      showConfirmProps: {},
    };
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
    resolve(false);
  };

  handleConfirm = () => {
    this.setState({ isOpen: false });
    resolve(true);
  };

  show(props = {}) {
    const showConfirmProps = { ...this.props.createConfirmProps, ...props };
    this.setState({ isOpen: true, showConfirmProps });
    return new Promise(res => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps } = this.state;
    const { message, title } = showConfirmProps;
    return (
      <div className={!isOpen ? 'modal' : 'modal is-active'}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <h3 className="modal-card-title">{title || defaultProps.title}</h3>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={this.handleCancel}
            />
          </header>
          <section className="modal-card-body">
            <p className="modal-card-title">
              {message || defaultProps.message}
            </p>
          </section>
          <footer className="modal-card-foot">
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={this.handleConfirm}
            >
              Sim
            </button>
            <button
              type="button"
              className="btn btn-default btn-sm"
              onClick={this.handleCancel}
            >
              Não
            </button>
          </footer>
        </div>
      </div>
    );
  }
}

export default Confirm.create();
