import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.change = this.change.bind(this);
    this.updateOutFavorites = this.updateOutFavorites.bind(this);

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
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

  change({ target }, music) {
    this.setState(
      { loading: true },
      async () => {
        const { favorites } = this.state;
        const { checked } = target;

        if (checked === true) {
          await addSong(music);

          this.setState({
            favorites: [...favorites, music],
            loading: false,
          });
        } else {
          await removeSong(music);

          this.setState({
            favorites: [...favorites
              .filter((favorite) => favorite.trackId !== music.trackId)],
          });

          await this.updateOutFavorites();

          this.setState({
            loading: false,
          });
        }
      },
    );
  }

  async updateOutFavorites() {
    const { outFavorites } = this.props;

    if (typeof outFavorites === 'function') {
      await outFavorites();
    }
  }

  render() {
    const { loading, favorites } = this.state;
    const { music } = this.props;

    return (
      <div className="albun-music-card">
        {loading ? <Loading /> : (
          <>
            <p>{ music.trackName }</p>
            <audio
              className="albun-music"
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <label
              className="albun-checkbox-label"
              htmlFor={ `favorite-${music.trackId}` }
            >
              <input
                id={ `favorite-${music.trackId}` }
                type="checkbox"
                name="favorite"
                className="albun-favorite-checkbox"
                data-testid={ `checkbox-music-${music.trackId}` }
                onChange={ (click) => this.change(click, music) }
                checked={ favorites
                  .some(({ trackName }) => music.trackName === trackName) }
              />
              <div className="checkmark" />
              <span>
                { favorites
                  .some(({ trackName }) => music.trackName === trackName)
                  ? 'Favorita' : 'Favoritar' }
              </span>
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  outFavorites: PropTypes.func,
};

MusicCard.defaultProps = {
  outFavorites: null,
};

export default MusicCard;
