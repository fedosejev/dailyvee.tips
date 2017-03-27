import React from 'react';

const LinkedIn = ({ handle }) => (
  <a href={`https://www.linkedin.com/in/${handle}`} target="_blank">
    <i className="fa fa-linkedin" aria-hidden="true"></i>
  </a>
);

export default LinkedIn;
