import '../scss/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import episodesReducer from './reducers/episodes';
import EpisodesContainer from './components/EpisodesContainer';

const store = createStore(episodesReducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f)
);

render(
  <Provider store={store}>
    <EpisodesContainer />
  </Provider>,
  document.querySelector('[data-react-application]')
);
