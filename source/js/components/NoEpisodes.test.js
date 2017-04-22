import React from 'react';
import NoEpisodes from './NoEpisodes';
import renderer from 'react-test-renderer';

describe('NoEpisodes', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <NoEpisodes />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
