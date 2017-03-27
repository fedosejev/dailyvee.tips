import React, { Component } from 'react';
import Navigation from './episode/Navigation';
import Lessons from './episode/Lessons';
import Moments from './episode/Moments';
import People from './episode/People';
import Info from './episode/Info';
import Title from './episode/Title';
import CoverImage from './episode/CoverImage';

import {
  episodeHasLessons,
  episodeHasMoments,
  episodeHasPeople,
  getVideoUrl,
  isInViewport,
} from '../utils/episode';

import {
  EPISODE_SECTION_LESSONS,
  EPISODE_SECTION_MOMENTS,
  EPISODE_SECTION_PEOPLE,
  EPISODE_SECTION_INFO,
} from '../constants/episode';

class Episode extends Component {
  constructor(props) {
    super(props);

    const { episode } = props;
    let navigation;

    if (episodeHasLessons(episode)) {
      navigation = EPISODE_SECTION_LESSONS;
    } else if (episodeHasMoments(episode)) {
      navigation = EPISODE_SECTION_MOMENTS;
    } else if (episodeHasPeople(episode)) {
      navigation = EPISODE_SECTION_PEOPLE;
    } else {
      navigation = EPISODE_SECTION_INFO;
    }

    this.state = {
      navigation,
      showCoverImage: false,
    };
  }

  componentDidMount() {
    this.updateCoverImage();
  }

  componentDidUpdate() {
    this.updateCoverImage();
  }

  navigateToLessons = event => {
    event.preventDefault();

    this.navigateTo(EPISODE_SECTION_LESSONS);
  }

  navigateToMoments = event => {
    event.preventDefault();

    this.navigateTo(EPISODE_SECTION_MOMENTS);
  }

  navigateToPeople = event => {
    event.preventDefault();

    this.navigateTo(EPISODE_SECTION_PEOPLE);
  }

  navigateToInfo = event => {
    event.preventDefault();

    this.navigateTo(EPISODE_SECTION_INFO);
  }

  navigateTo = section => {
    this.setState({
      navigation: section,
    });
  }

  updateCoverImage = () => {
    const { showCoverImage } = this.state;

    if (!showCoverImage && isInViewport(this.element)) {
      this.setState({
        showCoverImage: true,
      });
    }
  }

  render() {
    const { navigation, showCoverImage } = this.state;
    const { episode } = this.props;
    const {
      meta: {
        url,
        name,
        number,
        coverImage,
        filmedBy,
        editedBy,
        publishedOn,
      },
      content: {
        people,
        locations,
        lessons,
        moments,
      },
    } = episode;

    const videoUrl = getVideoUrl(url);

    return (
      <div
        className="row episode"
        id={number}
        ref={element => { this.element = element; }}
      >
        <div className="col-sm-6">

          <Title
            videoUrl={videoUrl}
            number={number}
            name={name}
          />

          <CoverImage
            videoUrl={videoUrl}
            coverImage={coverImage}
            showCoverImage={showCoverImage}
            number={number}
          />

        </div>
        <div className="col-sm-6">

          <Navigation
            episode={episode}
            navigation={navigation}
            navigateToLessons={this.navigateToLessons}
            navigateToMoments={this.navigateToMoments}
            navigateToPeople={this.navigateToPeople}
            navigateToInfo={this.navigateToInfo}
          />

          { navigation === EPISODE_SECTION_LESSONS ?
            <Lessons lessons={lessons} videoId={url} /> : null
          }

          { navigation === EPISODE_SECTION_MOMENTS ?
            <Moments moments={moments} videoId={url} /> : null
          }

          { navigation === EPISODE_SECTION_PEOPLE ?
            <People people={people} videoId={url} /> : null
          }

          { navigation === EPISODE_SECTION_INFO ?
            <Info
              filmedBy={filmedBy}
              editedBy={editedBy}
              publishedOn={publishedOn}
              locations={locations}
            /> : null
          }

        </div>
      </div>
    );
  }
}

Episode.propTypes = {
  episode: React.PropTypes.object.isRequired,
};

export default Episode;
