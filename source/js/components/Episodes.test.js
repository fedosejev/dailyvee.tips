import React from 'react';
import Episodes from './Episodes';
import renderer from 'react-test-renderer';

describe('Episodes', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <Episodes />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
