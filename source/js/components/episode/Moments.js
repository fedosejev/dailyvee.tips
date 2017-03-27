import React from 'react';

const Moments = ({ moments, videoId }) => (
  <div className="moments">
    {
      moments.map(({ url: videoTime, description }) => {
        const videoUrl = `https://youtu.be/${videoId}?t=${videoTime}`;

        return (
          <div key={videoUrl} className="moment">
            <div className="icon">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
            <a href={videoUrl} target="_blank">{description}</a>
          </div>
        );
      })
    }
  </div>
);

export default Moments;
