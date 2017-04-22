import React from 'react';
import Navigation from './Navigation';
import renderer from 'react-test-renderer';

describe('Navigation', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <Navigation />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
