import React from 'react';
import ClearFilterButton from './ClearFilterButton';
import renderer from 'react-test-renderer';

describe('ClearFilterButton', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <ClearFilterButton />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
