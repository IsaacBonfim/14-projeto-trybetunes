import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbunCard extends React.Component {
  render() {
    const { albun } = this.props;

    return (
      <div className="search-result-card">
        <div className="search-albun-blob" />
        <img
          src={ albun.artworkUrl100 }
          alt="arte do album"
          className="album-image"
        />
        <span className="album-artist-name">
          {albun.artistName}
        </span>
        <Link
          to={ `/album/${albun.collectionId}` }
          className="album-link"
          data-testid={ `link-to-album-${albun.collectionId}` }
        >
          {albun.collectionName}
        </Link>
      </div>
    );
  }
}

AlbunCard.propTypes = {
  albun: PropTypes.shape({
    artworkUrl100: PropTypes.string,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};

export default AlbunCard;
