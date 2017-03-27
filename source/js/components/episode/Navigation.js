import React from 'react';
import Divider from './Divider';
import {
  episodeHasLessons,
  episodeHasMoments,
  episodeHasPeople
} from '../../utils/episode';

const Navigation = ({
  episode,
  navigation,
  navigateToLessons,
  navigateToMoments,
  navigateToPeople,
  navigateToInfo
}) => {
  const elements = [];

  if (episodeHasLessons(episode)) {
    if (navigation === 'lessons') {
      elements.push(<span className="active" key={`lessons${episode.meta.number}`}>Lessons</span>);
    } else {
      elements.push(<a href="#" onClick={navigateToLessons} key={`lessons${episode.meta.number}`}>Lessons</a>);
    }

    elements.push(<Divider key={`lessonsDivider${episode.meta.number}`} />);
  }

  if (episodeHasMoments(episode)) {
    if (navigation === 'moments') {
      elements.push(<span className="active" key={`moments${episode.meta.number}`}>Moments</span>);
    } else {
      elements.push(<a href="#" onClick={navigateToMoments} key={`moments${episode.meta.number}`}>Moments</a>);
    }

    elements.push(<Divider key={`momentsDivider${episode.meta.number}`} />);
  }

  if (episodeHasPeople(episode)) {
    if (navigation === 'people') {
      elements.push(<span className="active" key={`people${episode.meta.number}`}>People</span>);
    } else {
      elements.push(<a href="#" onClick={navigateToPeople} key={`people${episode.meta.number}`}>People</a>);
    }

    elements.push(<Divider key={`peopleDivider${episode.meta.number}`} />);
  }

  if (navigation === 'info') {
    elements.push(<span className="active" key={`info${episode.meta.number}`}>Info</span>);
  } else {
    elements.push(<a href="#" onClick={navigateToInfo} key={`info${episode.meta.number}`}>Info</a>);
  }

  return (
    <h2>
      {elements}
    </h2>
  );
};

export default Navigation;
