import React from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';

import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.save = this.save.bind(this);

    this.state = {
      check: false,
      loading: false,
    };
  }

  save(music) {
    this.setState(
      { loading: true },
      async () => {
        const { check } = this.state;
        await addSong(music);

        if (check) {
          this.setState({
            check: false,
            loading: false,
          });
        } else {
          this.setState({
            check: true,
            loading: false,
          });
        }
      },
    );
  }

  render() {
    const { loading, check } = this.state;
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
                checked={ check }
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
