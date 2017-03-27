import {
  FILTER,
} from '../actions/filter';

import content from '../../data/content.json';

const initialState = {
  episodes: content.episodes,
  filterBy: '',
};

const filterEpisodes = value => (
  content.episodes.filter(episode => {
    const { content, meta: { name, number } } = episode;
    const { lessons, moments, people, locations } = content;

    const inLessons = lessons.some(lesson => {
      const { description } = lesson;

      return description.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    const inMoments = moments.some(moment => {
      const { description } = moment;

      return description.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    const inPeople = people.some(person => {
      const { name } = person;

      return name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    const inLocations = locations.some(location => {
      return location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    const inName = name.toLowerCase().indexOf(value.toLowerCase()) !== -1;

    const inNumber = number.indexOf(value.toLowerCase()) !== -1;

    return inLessons || inMoments || inPeople || inLocations || inName || inNumber;
  })
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      const filterBy = action.value;
      const episodes = filterEpisodes(filterBy);

      return {
        episodes,
        filterBy,
      };

    default:
      return state;
  }
};

export default reducer;
