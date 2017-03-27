import React from 'react';

const Title = ({ videoUrl, number, name }) => (
  <a href={videoUrl} target="_blank">
    <h2>
      <span className="episodeNumber">#{number} </span>
      {name}
    </h2>
  </a>
);

export default Title;
