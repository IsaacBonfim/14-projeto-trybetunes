import React from 'react';

import { getFavoriteSongs /* , removeSong */ } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.update = this.update.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.update();
  }

  update() {
    this.setState(
      { loading: true },
      async () => {
        const favorites = await getFavoriteSongs();

        this.setState({
          favorites: [...favorites],
          loading: false,
        });
      },
    );
  }

  async updateFavorites() {
    const newFavorites = await getFavoriteSongs();

    this.setState({
      favorites: [...newFavorites],
    });
  }

  render() {
    const { loading, favorites } = this.state;

    return (
      <div data-testid="page-favorites" className="page">
        <Header />

        { loading ? <Loading /> : (
          <section className="albun-section-musics">
            { favorites.map((favorite, index) => (
              <div key={ index } className="music-container">
                <MusicCard
                  music={ favorite }
                  outFavorites={ this.updateFavorites }
                />
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default Favorites;
