import React from 'react';

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
            <h2>Seja bem vindo ao TrybeTunes</h2>
            <p data-testid="header-user-name">{user.name}</p>
          </>
        )}
      </header>
    );
  }
}

export default Header;
