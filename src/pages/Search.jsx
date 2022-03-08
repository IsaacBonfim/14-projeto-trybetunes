import React from 'react';

import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      busca: '',
      disableSearchButton: true,
    };
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate() {
    const { busca } = this.state;

    const minCharacters = 2;

    this.setState({
      disableSearchButton: busca.length < minCharacters,
    });
  }

  render() {
    const { busca, disableSearchButton } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        <input
          type="text"
          name="busca"
          placeholder="Pesquisar..."
          data-testid="search-artist-input"
          value={ busca }
          onChange={ this.handleChange }
        />

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disableSearchButton }
          // onClick={ this.login }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Search;
