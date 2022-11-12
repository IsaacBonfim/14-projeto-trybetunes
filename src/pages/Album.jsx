import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import '../styles/Albuns.css';

class Album extends React.Component {
  constructor() {
    super();

    this.findMusics = this.findMusics.bind(this);

    this.state = {
      artist: '',
      album: '',
      loading: false,
      musics: [],
    };
  }

  componentDidMount() {
    this.findMusics();
  }

  findMusics() {
    this.setState(
      { loading: true },
      async () => {
        const { match: { params: { id } } } = this.props;
        const musics = await getMusics(id);

        this.setState({
          artist: musics[0].artistName,
          album: musics[0].collectionName,
          musics: [...musics],
          loading: false,
        });
      },
    );
  }

  render() {
    const { artist, album, loading, musics } = this.state;

    return (
      <div data-testid="page-album" className="page">
        <Header />
        <section className="albun-title-section">
          <h4
            className="albun-artist"
            data-testid="artist-name"
          >
            { artist }
          </h4>
          <h4
            className="albun-name"
            data-testid="album-name"
          >
            { album }
          </h4>
        </section>

        { loading ? <Loading /> : (
          <section className="albun-section-musics">
            { musics.map((music, index) => (
              index !== 0 ? (
                <div key={ index } className="music-container">
                  <MusicCard
                    music={ music }
                  />
                </div>
              ) : ''
            ))}
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
