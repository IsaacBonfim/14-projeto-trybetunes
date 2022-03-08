import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.loadingComponent = this.loadingComponent.bind(this);

    this.state = {
      user: '',
      loading: false,
      disableLoginButton: true,
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

  async loadingComponent() {
    this.setState(
      { loading: true },
      async () => {
        this.setState({
          loading: false,
        });
      },
    );
  }

  render() {
    const { user, disableLoginButton, loading,
    } = this.state;

    const loadingElement = <span>Carregando...</span>;

    return (
      <div>
        <h1>TrybeTunes</h1>

        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {
                loading ? loadingElement : <Login
                  user={ user }
                  disableLoginButton={ disableLoginButton }
                  onInputChange={ this.handleChange }
                  login={ async () => {
                    await createUser({ name: user });
                  } }
                />
              }
            </Route>
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
