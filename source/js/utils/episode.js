import {
  INSTAGRAM,
  FACEBOOK,
  TWITTER,
  LINKEDIN,
  YOUTUBE_VIDEO_BASE_URL,
  INSTAGRAM_URL,
  TWITTER_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
} from '../constants/episode';

export const episodeHasLocations = locations => (
  locations.length > 0
);

export const episodeHasLessons = ({ content: { lessons } }) => (
  lessons.length > 0
);

export const episodeHasMoments = ({ content: { moments } }) => (
  moments.length > 0
);

export const episodeHasPeople = ({ content: { people } }) => (
  people.length > 0
);

export const hasFilmedBy = filmedBy => {
  if (Array.isArray(filmedBy)) {
    return filmedBy.length > 0;
  }

  return true;
};

export const hasEditedBy = editedBy => {
  if (Array.isArray(editedBy)) {
    return editedBy.length > 0;
  }

  return true;
};

export const getVideoUrl = videoId => (
  `${YOUTUBE_VIDEO_BASE_URL}${videoId}`
);

export const getSocialUrl = ({ type, handle }) => {
  if (type === INSTAGRAM) {
    return `${INSTAGRAM_URL}${handle}`;
  } else if (type === TWITTER) {
    return `${TWITTER_URL}${handle}`;
  } else if (type === FACEBOOK) {
    return `${FACEBOOK_URL}${handle}`;
  } else if (type === LINKEDIN) {
    return `${LINKEDIN_URL}${handle}`;
  }

  return '';
};

export const isInViewport = element => {
  const rect = element.getBoundingClientRect();
  const rootElement = document.documentElement;

  return (
    rect.top < (window.innerHeight || rootElement.clientHeight)
  );
};

export const getDocumentTopPosition = () => (
  document.documentElement.getBoundingClientRect().top
);

export const scrollTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
