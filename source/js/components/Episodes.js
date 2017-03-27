import React, { Component } from 'react';
import Header from './Header';
import Episode from './Episode';
import NoEpisodes from './NoEpisodes';
import Footer from './Footer';
import {
  getDocumentTopPosition,
} from '../utils/episode';

class Episodes extends Component {
  constructor() {
    super();

    this.state = {
      documentTopPosition: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const documentTopPosition = getDocumentTopPosition();

    this.setState({
      documentTopPosition,
    });
  }

  renderEpisodes = episodes => {
    if (episodes.length > 0) {
      return episodes.map(episode => (
        <Episode episode={episode} key={episode.meta.number} />
      ));
    }

    return <NoEpisodes />;
  }

  render() {
    const { episodes, filterBy, filter } = this.props;

    return (
      <div>

        <Header episodes={episodes} filter={filter} filterBy={filterBy} />

        <div className="episodes">
          <div className="container">
            { this.renderEpisodes(episodes) }
          </div>
        </div>

        <Footer />

      </div>
    );
  }
}

Episodes.propTypes = {
  episodes: React.PropTypes.array.isRequired,
  filterBy: React.PropTypes.string.isRequired,
  filter: React.PropTypes.func.isRequired,
};

export default Episodes;
