import React from 'react';

import { Redirect } from 'react-router-dom';

import { getUser, updateUser } from '../services/userAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.validate = this.validate.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      disableButton: true,
      loading: false,
      save: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const user = await getUser();
        const { name, email, image, description } = user;

        this.setState({
          loading: false,
          description,
          email,
          image,
          name,
          disableButton: true,
        }, () => this.validate());
      },
    );
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate() {
    const { description, name, email, image } = this.state;

    this.setState({
      disableButton: !(name
        && email
        && this.validateEmail(email)
        && image
        && description),
    });
  }

  validateEmail(email) {
    // Consultei essa forma de validação para o campo de e-mail no site abaixo:
    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  updateProfile() {
    this.setState(
      { loading: true },
      async () => {
        const { description, email, image, name } = this.state;
        const user = { name, email, image, description };

        await updateUser(user);

        this.setState(
          { loading: false,
            save: true },
        );
      },
    );
  }

  render() {
    const { loading, description, email,
      image, name, disableButton, save } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ name }
            />
            <input
              name="image"
              value={ image }
              placeholder="Informe um o caminho para uma nova imagem"
              data-testid="edit-input-image"
              onChange={ this.handleChange }
            />
            <label htmlFor="userName">
              Nome
              <input
                type="text"
                name="name"
                value={ name }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="userEmail">
              E-mail
              <input
                type="email"
                name="email"
                value={ email }
                required
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="userDescription">
              Descrição
              <textarea
                name="description"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ disableButton }
              onClick={ this.updateProfile }
            >
              Salvar
            </button>
          </form>
        )}
        { save && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
