import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <ul>
        <li>
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
        </li>
        <li>
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
        </li>
        <li>
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
        </li>
      </ul>
    );
  }
}

export default NavBar;
