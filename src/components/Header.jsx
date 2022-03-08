import React from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        this.setState({
          user: await getUser(),
          loading: false,
        });
      },
    );
  }

  render() {
    const { user, loading } = this.state;

    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <>
            <section>
              <h2>Seja bem vindo ao TrybeTunes</h2>
              <p data-testid="header-user-name">{user.name}</p>
            </section>
            <nav>
              <Link
                data-testid="link-to-search"
                to="/search"
              >
                Pesquisa
              </Link>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favoritas
              </Link>
              <Link
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil
              </Link>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
