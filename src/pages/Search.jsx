import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      artist: '',
      albuns: [],
      busca: '',
      disableSearchButton: true,
      loading: false,
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

  search() {
    this.setState(
      { loading: true },
      async () => {
        const { busca } = this.state;
        const result = await searchAlbumsAPI(busca);

        this.setState({
          artist: busca,
          albuns: [...result],
          busca: '',
          disableSearchButton: true,
          loading: false,
        });
      },
    );
  }

  render() {
    const { artist, albuns, busca, disableSearchButton, loading } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <>
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
              onClick={ this.search }
            >
              Pesquisar
            </button>

            {artist ? (
              <>
                { albuns.length !== 0 ? (
                  <div>
                    <h3>{ `Resultado de álbuns de: ${artist}` }</h3>
                    <div>
                      {
                        albuns.map((albun, index) => (
                          <div key={ index }>
                            {albun.artistName}
                            <Link
                              to={ `/album/${albun.collectionId}` }
                              data-testid={ `link-to-album-${albun.collectionId}` }
                            >
                              {albun.collectionName}
                            </Link>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ) : <p>Nenhum álbum foi encontrado</p> }
                <p />
              </>
            ) : ''}
          </>
        ) }
      </div>
    );
  }
}

export default Search;
