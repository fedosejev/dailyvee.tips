import React from 'react';
import { getSocialUrl } from '../../utils/episode';

const FilmedBy = ({ filmedBy: { social, name }}) => (
  <p>
    <a href={getSocialUrl(social)}>{name}</a>
  </p>
);

export default FilmedBy;
