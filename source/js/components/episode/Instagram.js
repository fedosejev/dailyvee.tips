import React from 'react';

const Instagram = ({ handle }) => (
  <a href={`https://www.instagram.com/${handle}`} target="_blank">
    <i className="fa fa-instagram" aria-hidden="true"></i>
  </a>
);

export default Instagram;
