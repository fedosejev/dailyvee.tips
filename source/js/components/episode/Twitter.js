import React from 'react';

const Twitter = ({ handle }) => (
  <a href={`https://www.twitter.com/${handle}`} target="_blank">
    <i className="fa fa-twitter" aria-hidden="true"></i>
  </a>
);

export default Twitter;
