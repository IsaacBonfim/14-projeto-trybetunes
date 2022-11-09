import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import NavBar from './HeaderLinks';
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
              <NavBar />
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
