import React from 'react';
import { getSocialUrl } from '../../utils/episode';

const EditedBy = ({ editedBy: { social, name } }) => (
  <p>
    <a href={getSocialUrl(social)}>{name}</a>
  </p>
);

export default EditedBy;
