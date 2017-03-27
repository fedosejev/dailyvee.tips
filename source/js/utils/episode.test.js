const utils = require('./episode');
const constants = require('../constants/episode');

describe('episode', () => {
  test('getVideoUrl', () => {
    const videoId = 'abc';
    const videoUrl = utils.getVideoUrl(videoId);

    expect(videoUrl).toBe(`${constants.YOUTUBE_VIDEO_BASE_URL}${videoId}`);
  });
});
