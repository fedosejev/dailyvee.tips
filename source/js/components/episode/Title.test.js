import React from 'react';
import Title from './Title';
import renderer from 'react-test-renderer';

describe('Title', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <Title />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
