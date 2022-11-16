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
          <div className="teste">
            <div className="profile-container">
              <img
                className="profile-image"
                data-testid="profile-image"
                src={ user.image }
                alt={ user.name }
              />
              <Link className="profile-edit" to="/profile/edit">Editar perfil</Link>
              <label htmlFor="userName" className="profile-input-group">
                <span className="profile-input-text">Nome</span>
                <p
                  name="userName"
                  className="profile-info"
                >
                  { user.name }
                </p>
              </label>
              <label htmlFor="userEmail" className="profile-input-group">
                <span className="profile-input-text">E-mail</span>
                <p
                  name="userEmail"
                  className="profile-info"
                >
                  { user.email }
                </p>
              </label>
              <label htmlFor="userDescription" className="profile-input-group">
                <span className="profile-input-text">Descrição</span>
                <p
                  name="userDescription"
                  className="profile-info"
                >
                  { user.description }
                </p>
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
