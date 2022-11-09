import React from 'react';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading-effect" />
        <span className="loading-text">Carregando...</span>
      </div>
    );
  }
}

export default Loading;
