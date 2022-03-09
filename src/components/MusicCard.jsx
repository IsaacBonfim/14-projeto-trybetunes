import React from 'react';
import PropTypes from 'prop-types';

import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.save = this.save.bind(this);

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

  save(music) {
    this.setState(
      { loading: true },
      async () => {
        await addSong(music);

        this.setState({
          loading: false,
        });
      },
    );
  }

  render() {
    const { loading, favorites } = this.state;
    const { music } = this.props;

    return (
      <section>
        {loading ? <Loading /> : (
          <>
            <p>{ music.trackName }</p>
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <label htmlFor={ `favorite-${music.trackId}` }>
              <input
                id={ `favorite-${music.trackId}` }
                type="checkbox"
                name="favorite"
                data-testid={ `checkbox-music-${music.trackId}` }
                onChange={ () => this.save(music) }
                checked={ favorites
                  .some(({ trackName }) => music.trackName === trackName) }
              />
              Favorita
            </label>
          </>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
