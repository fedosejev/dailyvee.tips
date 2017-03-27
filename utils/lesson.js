const fs = require('fs');
const prompt = require('prompt');

const MINUTES_REGEX = /\d+m/;
const SECONDS_REGEX = /\d+s/;

function hasMinutesAndSeconds(time) {
  let hasMinutesAndSeconds = false;

  if (
    MINUTES_REGEX.test(time)
    && SECONDS_REGEX.test(time)
  ) {
    hasMinutesAndSeconds = true;
  }

  return hasMinutesAndSeconds;
}

function hasOnlyMinutes(time) {
  let hasOnlyMinutes = false;

  if (
    MINUTES_REGEX.test(time)
    && !SECONDS_REGEX.test(time)
  ) {
    hasOnlyMinutes = true;
  }

  return hasOnlyMinutes;
}

function hasOnlySeconds(time) {
  let hasOnlySeconds = false;

  if (
    !MINUTES_REGEX.test(time)
    && SECONDS_REGEX.test(time)
  ) {
    hasOnlySeconds = true;
  }

  return hasOnlySeconds;
}

function convertMinutesAndSecondsToSeconds(minutes, seconds) {
  return (minutes * 60) + seconds;
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

function sortAllLessonsFromAllEpisodes() {
  let content = fs.readFileSync(__dirname + '/../source/data/content.json', 'utf8');
  content = JSON.parse(content);

  content.episodes.forEach(episode => episode.content.lessons.sort(compareLessons));

  fs.writeFileSync(__dirname + '/../source/data/content.json', JSON.stringify(content, null, 2));
}

function saveLesson({ videoId, time, lesson }) {
  let content = fs.readFileSync(__dirname + '/../source/data/content.json', 'utf8');
  content = JSON.parse(content);

  const episode = content.episodes.find(episode => episode.meta.url === videoId);

  episode.content.lessons.push({
    url: time,
    description: lesson
  });

  episode.content.lessons.sort(compareLessons);

  fs.writeFileSync(__dirname + '/../source/data/content.json', JSON.stringify(content, null, 2));
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

function addLesson() {
  prompt.message = '';

  prompt.start();

  const schema = {
    properties: {
      videoUrl: {
        message: 'Video URL?',
        required: true
      },
      lesson: {
        message: 'Lesson learnt?',
        required: true
      }
    }
  };

  prompt.get(schema, (error, result) => {
    const videoUrlParts = result.videoUrl.replace('https://youtu.be/', '').split('?t=');
    const videoId = videoUrlParts[0];
    const time = videoUrlParts[1];
    const lesson = result.lesson;

    const lessonData = {
      videoId,
      time,
      lesson
    };

    saveLesson(lessonData);

    console.log('Successfully added lesson.');
  });
}

module.exports = {
  convertTimeToSeconds,
  addLesson,
  sortAllLessonsFromAllEpisodes
};
