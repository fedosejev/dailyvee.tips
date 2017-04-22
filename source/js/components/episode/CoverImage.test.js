import React from 'react';
import CoverImage from './CoverImage';
import renderer from 'react-test-renderer';

describe('CoverImage', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <CoverImage />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
