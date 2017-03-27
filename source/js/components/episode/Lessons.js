import React from 'react';

const Lessons = ({ lessons, videoId }) => (
  <div className="lessons">
    {
      lessons.map(({ url: videoTime, description }) => {
        const videoUrl = `https://youtu.be/${videoId}?t=${videoTime}`;

        return (
          <div key={videoUrl} className="lesson">
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

export default Lessons;
