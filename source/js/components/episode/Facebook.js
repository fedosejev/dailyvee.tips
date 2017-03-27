import React from 'react';

const Facebook = ({ handle }) => (
  <a href={`https://www.facebook.com/${handle}`} target="_blank">
    <i className="fa fa-facebook" aria-hidden="true"></i>
  </a>
);

export default Facebook;
