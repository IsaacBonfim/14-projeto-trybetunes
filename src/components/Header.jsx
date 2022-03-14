import React from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import Loading from './Loading';

import '../styles/Header.css';

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
      <header data-testid="header-component" className="header">
        {loading ? <Loading /> : (
          <>
            <section className="header-section">
              <h2 className="header-h2">Bem vindo ao TrybeTunes</h2>
              <p className="header-user" data-testid="header-user-name">{user.name}</p>
            </section>
            <nav className="header-navigation">
              <Link
                className="header-link"
                data-testid="link-to-search"
                to="/search"
              >
                <span className="header-icon">
                  <ion-icon name="search-circle-outline" />
                </span>
                <span className="header-text-nav">Pesquisa</span>
              </Link>
              <Link
                className="header-link"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                <span className="header-icon">
                  <ion-icon name="heart-outline" />
                </span>
                <span className="header-text-nav">Favoritas</span>
              </Link>
              <Link
                className="header-link"
                data-testid="link-to-profile"
                to="/profile"
              >
                <span className="header-icon">
                  <ion-icon name="person-outline" />
                </span>
                <span className="header-text-nav">Perfil</span>
              </Link>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
