import React from 'react';

const CoverImage = ({
  videoUrl,
  coverImage,
  showCoverImage,
  number,
}) => {
  return (
    <a href={videoUrl} target="_blank" rel="noopener noreferrer">
      <img
        src={showCoverImage ? `./images/${coverImage}` : 'http://placehold.it/1280x720?text=DAILYVEE'}
        title={`DailyVee #${number}`}
        alt={`DailyVee #${number}`}
        className="episodeCoverImage"
      />
    </a>
  );
};

export default CoverImage;
