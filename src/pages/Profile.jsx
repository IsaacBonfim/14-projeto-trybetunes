import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/Profile.css';

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
      <div data-testid="page-profile" className="page">
        <Header />
        { loading ? <Loading /> : (
          <div className="profile-container">
            <img
              className="profile-image"
              data-testid="profile-image"
              src={ user.image }
              alt={ user.name }
            />
            <Link to="/profile/edit">Editar perfil</Link>
            <label htmlFor="userName">
              <span>Nome</span>
              <p name="userName">{ user.name }</p>
            </label>
            <label htmlFor="userEmail">
              <span>E-mail</span>
              <p name="userEmail">{ user.email }</p>
            </label>
            <label htmlFor="userDescription">
              <span>Descrição</span>
              <p name="userDescription">{ user.description }</p>
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
