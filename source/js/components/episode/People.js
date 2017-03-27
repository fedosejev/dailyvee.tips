import React from 'react';
import Social from './Social';

const People = ({ people, videoId }) => (
  <div className="people">
    {
      people.map(({ url: videoTime, name, social }) => {
        const videoUrl = `https://youtu.be/${videoId}?t=${videoTime}`;

        return (
          <div key={videoUrl} className="person">
            <span className="social">
              <Social social={social} />
            </span>
            <span className="divider">
            </span>
            <a href={videoUrl} target="_blank">{name}</a>
          </div>
        );
      })
    }
  </div>
);

export default People;
