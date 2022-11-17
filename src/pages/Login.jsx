import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import LoginImage from '../images/music.svg';
import '../styles/Login.css';

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
    const { value } = target;

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
      <main className="main-login">
        { loading ? <Loading /> : (
          <div className="login-sections-container">
            <section className="image-section">
              <img src={ LoginImage } className="login-image" alt="login" />
            </section>

            <section data-testid="page-login" className="login-container">
              <h1 className="login-h1">TrybeTunes</h1>

              <h3 className="login-h3">Login</h3>

              <input
                type="text"
                name="user"
                autoComplete="off"
                placeholder="Nome de Usuário"
                className="login-input"
                data-testid="login-name-input"
                value={ user }
                onChange={ this.handleChange }
              />

              <button
                type="button"
                data-testid="login-submit-button"
                className="login-button"
                disabled={ disableLoginButton }
                onClick={ this.login }
              >
                Entrar
              </button>
            </section>
          </div>
        )}
        { saved ? <Redirect to="/search" /> : '' }
      </main>
    );
  }
}

export default Login;
