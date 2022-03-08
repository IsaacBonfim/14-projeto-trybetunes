import React from 'react';
import { Redirect } from 'react-router-dom';

import { createUser } from '../services/userAPI';

import Loading from '../Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      user: '',
      loading: false,
      disableLoginButton: true,
      saved: false,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate() {
    const { user } = this.state;

    const minCharacters = 3;

    this.setState({
      disableLoginButton: user.length < minCharacters,
    });
  }

  async login() {
    this.setState(
      { loading: true },
      async () => {
        const { user } = this.state;
        await createUser({ name: user });

        this.setState({
          loading: false,
          saved: true,
        });
      },
    );
  }

  render() {
    const {
      user, loading, disableLoginButton, saved,
    } = this.state;

    return (
      <main>
        { loading ? <Loading /> : (
          <div data-testid="page-login">
            <h3>Login</h3>

            <label htmlFor="user">
              Nome de Usuário
              <input
                type="text"
                name="user"
                data-testid="login-name-input"
                value={ user }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ disableLoginButton }
              onClick={ this.login }
            >
              Entrar
            </button>
          </div>
        )}
        { saved ? <Redirect to="/search" /> : '' }
      </main>
    );
  }
}

export default Login;
