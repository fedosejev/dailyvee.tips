import React from 'react';
import Lessons from './Lessons';
import renderer from 'react-test-renderer';

describe('Lessons', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <Lessons />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
