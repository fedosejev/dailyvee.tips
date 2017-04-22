import React from 'react';
import moment from 'moment';
import {
  episodeHasLocations,
  hasFilmedBy,
  hasEditedBy,
} from '../../utils/episode';
import FilmedBy from './FilmedBy';
import EditedBy from './EditedBy';

const getFilmedBy = filmedBy => {
  if (Array.isArray(filmedBy)) {
    return filmedBy.map(filmedByItem => (
      <FilmedBy filmedBy={filmedByItem} key={`filedBy_${filmedByItem.social.handle}`} />
    ));
  }

  return <FilmedBy filmedBy={filmedBy} />;
};

const getEditedBy = editedBy => {
  if (Array.isArray(editedBy)) {
    return editedBy.map(editedByItem => (
      <EditedBy editedBy={editedByItem} key={`editedBy_${editedByItem.social.handle}`} />
    ));
  }

  return <EditedBy editedBy={editedBy} />;
};

const Info = ({
  filmedBy,
  editedBy,
  publishedOn,
  locations,
}) => (
  <div className="info">

    { hasFilmedBy(filmedBy) ?
      <div className="infoBlock filmedBy">
        <h3>Filmed By</h3>
        {getFilmedBy(filmedBy)}
      </div>
      : null
    }

    { hasEditedBy(editedBy) ?
      <div className="infoBlock editedBy">
        <h3>Edited By</h3>
        {getEditedBy(editedBy)}
      </div>
      : null
    }

    { episodeHasLocations(locations) ?
      <div className="infoBlock locations">
        <h3>Locations</h3>
        {
          locations.map(location => (
            <div key={location}>{location}</div>
          ))
        }
      </div>
      : null
    }

    <div className="infoBlock publishedOn">
      <h3>Published On</h3>
      {moment(publishedOn, 'YYYY-MM-DD').format('MMMM Do, YYYY')}
    </div>
  </div>
);

export default Info;
