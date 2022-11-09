import React from 'react';
import Header from '../components/Header';
import AlbunCard from '../components/AlbunCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../styles/Search.css';

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
          <main className="search-container">
            <section className="search-section">
              <input
                type="text"
                name="busca"
                placeholder="Pesquisar..."
                className="search-input"
                data-testid="search-artist-input"
                value={ busca }
                onChange={ this.handleChange }
              />

              <button
                type="button"
                className="search-button"
                data-testid="search-artist-button"
                disabled={ disableSearchButton }
                onClick={ this.search }
              >
                Pesquisar
              </button>
            </section>

            {artist ? (
              <section className="search-result-section">
                { albuns.length !== 0 ? (
                  <>
                    <h3>{ `Resultado de álbuns de: ${artist}` }</h3>
                    <div className="search-result-list">
                      {
                        albuns.map((albun, index) => (
                          <AlbunCard key={ index } albun={ albun } />
                        ))
                      }
                    </div>
                  </>
                ) : <p>Nenhum álbum foi encontrado</p> }
              </section>
            ) : ''}
          </main>
        ) }
      </div>
    );
  }
}

export default Search;
