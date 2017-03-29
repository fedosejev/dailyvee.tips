const fs = require('fs');
const path = require('path');
const prompt = require('prompt');

const MINUTES_REGEX = /\d+m/;
const SECONDS_REGEX = /\d+s/;

function convertMinutesAndSecondsToSeconds(minutes, seconds) {
  return (minutes * 60) + seconds;
}

function hasMinutesAndSeconds(time) {
  let timeHasMinutesAndSeconds = false;

  if (
    MINUTES_REGEX.test(time)
    && SECONDS_REGEX.test(time)
  ) {
    timeHasMinutesAndSeconds = true;
  }

  return timeHasMinutesAndSeconds;
}

function hasOnlyMinutes(time) {
  let timeHasOnlyMinutes = false;

  if (
    MINUTES_REGEX.test(time)
    && !SECONDS_REGEX.test(time)
  ) {
    timeHasOnlyMinutes = true;
  }

  return timeHasOnlyMinutes;
}

function hasOnlySeconds(time) {
  let timeHasOnlySeconds = false;

  if (
    !MINUTES_REGEX.test(time)
    && SECONDS_REGEX.test(time)
  ) {
    timeHasOnlySeconds = true;
  }

  return timeHasOnlySeconds;
}

function convertTimeToSeconds(time) {
  const timeParts = time.split('m');
  let minutes = 0;
  let seconds = 0;

  if (hasMinutesAndSeconds(time)) {
    minutes = parseInt(timeParts[0], 10);
    seconds = parseInt(timeParts[1].replace('s', ''), 10);
  } else if (hasOnlyMinutes(time)) {
    minutes = parseInt(timeParts[0], 10);
  } else if (hasOnlySeconds(time)) {
    seconds = parseInt(timeParts[0].replace('s', ''), 10);
  }

  return convertMinutesAndSecondsToSeconds(minutes, seconds);
}

function compareLessons(lessonOne, lessonTwo) {
  const lessonOneSeconds = convertTimeToSeconds(lessonOne.url);
  const lessonTwoSeconds = convertTimeToSeconds(lessonTwo.url);

  if (lessonOneSeconds < lessonTwoSeconds) {
    return -1;
  }

  if (lessonOneSeconds > lessonTwoSeconds) {
    return 1;
  }

  return 0;
}

function sortAllLessonsFromAllEpisodes() {
  const contentFilePath = path.resolve(__dirname, '../source/data/content.json');
  let content = fs.readFileSync(contentFilePath, 'utf8');
  content = JSON.parse(content);

  content.episodes.forEach(episode => episode.content.lessons.sort(compareLessons));

  fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2));
}

function saveLesson({ videoId, time, lesson }) {
  const contentFilePath = path.resolve(__dirname, '../source/data/content.json');
  let content = fs.readFileSync(contentFilePath, 'utf8');
  content = JSON.parse(content);

  const episode = content.episodes.find(episodeData => episodeData.meta.url === videoId);

  episode.content.lessons.push({
    url: time,
    description: lesson,
  });

  episode.content.lessons.sort(compareLessons);

  fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2));
}

function addLesson() {
  prompt.message = '';

  prompt.start();

  const schema = {
    properties: {
      videoUrl: {
        message: 'Video URL?',
        required: true,
      },
      lesson: {
        message: 'Lesson learnt?',
        required: true,
      },
    },
  };

  prompt.get(schema, (error, result) => {
    const videoUrlParts = result.videoUrl.replace('https://youtu.be/', '').split('?t=');
    const videoId = videoUrlParts[0];
    const time = videoUrlParts[1];
    const lesson = result.lesson;

    const lessonData = {
      videoId,
      time,
      lesson,
    };

    saveLesson(lessonData);

    console.log('Successfully added lesson.');
  });
}

module.exports = {
  convertTimeToSeconds,
  addLesson,
  sortAllLessonsFromAllEpisodes,
};
