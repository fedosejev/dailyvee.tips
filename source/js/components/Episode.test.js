import React from 'react';
import Episode from './Episode';
import renderer from 'react-test-renderer';

describe('Episode', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <Episode />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
