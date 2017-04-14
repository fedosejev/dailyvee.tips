const YouTube = require('youtube-node');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const imageDownloader = require('image-downloader');
const prompt = require('prompt');
const API_KEY = require('../config.json').apiKey;

const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=';

function compareEpisodes(episodeOne, episodeTwo) {
  if (parseInt(episodeOne.meta.number, 10) > parseInt(episodeTwo.meta.number, 10)) {
    return -1;
  }

  if (parseInt(episodeOne.meta.number, 10) < parseInt(episodeTwo.meta.number, 10)) {
    return 1;
  }

  return 0;
}

function sortAllEpisodes() {
  const contentFilePath = path.resolve(__dirname, '../source/data/content.json');
  let content = fs.readFileSync(contentFilePath, 'utf8');
  content = JSON.parse(content);

  content.episodes.sort(compareEpisodes);

  fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2));
}

function addEpisodeDescription(episode) {
  const contentFilePath = path.resolve(__dirname, '../source/data/content.json');
  let content = fs.readFileSync(contentFilePath, 'utf8');
  content = JSON.parse(content);

  content.episodes.unshift(episode);

  fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2));
}

function downloadCoverImage(coverImageUrl, number) {
  imageDownloader({
    url: coverImageUrl,
    dest: path.resolve(__dirname, `../source/data/images/dailyvee${number}.jpg`),
    done: (error, filename) => {
      if (error) {
        throw error;
      }

      console.log('File saved to', filename);
    },
  });
}

function parseVideoDetails(details) {
  const episode = {
    meta: {
      name: null,
      number: null,
      url: null,
      coverImage: null,
      filmedBy: [],
      editedBy: [],
      publishedOn: null,
    },
    content: {
      lessons: [],
      moments: [],
      people: [],
      locations: [],
    },
  };

  const video = details.items[0].snippet;

  const name = video.title.split('|')[0].trim();
  const number = video.title.split('|')[1].replace('DailyVee', '').trim();
  const url = `${details.items[0].id}`;
  const coverImage = `dailyvee${number}.jpg`;
  const publishedOn = moment(video.publishedAt).format('YYYY-MM-DD');
  const coverImageUrl = video.thumbnails.maxres.url;

  episode.meta.name = name;
  episode.meta.number = number;
  episode.meta.url = url;
  episode.meta.coverImage = coverImage;
  episode.meta.publishedOn = publishedOn;

  downloadCoverImage(coverImageUrl, number);
  addEpisodeDescription(episode);
}

function getVideoDetails(videoId) {
  const youTube = new YouTube();

  youTube.setKey(API_KEY);

  youTube.getById(videoId, (error, result) => {
    if (error) {
      throw error;
    }

    parseVideoDetails(result);
  });
}

function addEpisode() {
  prompt.message = '';

  prompt.start();

  const schema = {
    properties: {
      videoUrl: {
        message: 'Video URL?',
        required: true,
      },
    },
  };

  prompt.get(schema, (err, result) => {
    const videoId = result.videoUrl.replace(YOUTUBE_VIDEO_URL, '');

    getVideoDetails(videoId);
  });
}

module.exports = {
  addEpisode,
  sortAllEpisodes,
};
