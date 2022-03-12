import React from 'react';

import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const user = await getUser();

        this.setState({
          loading: false,
          user: { ...user },
        });
      },
    );
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img
              data-testid="profile-image"
              src={ user.image }
              alt={ user.name }
            />
            <Link to="/profile/edit">Editar perfil</Link>
            <label htmlFor="userName">
              Nome
              <p name="userName">{ user.name }</p>
            </label>
            <label htmlFor="userEmail">
              E-mail
              <p name="userEmail">{ user.email }</p>
            </label>
            <label htmlFor="userDescription">
              Descrição
              <p name="userDescription">{ user.description }</p>
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
