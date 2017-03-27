import React from 'react';
import Divider from './Divider';
import renderer from 'react-test-renderer';

describe('Divider', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <Divider />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
