import React from 'react';
import EditedBy from './EditedBy';
import renderer from 'react-test-renderer';

describe('EditedBy', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <EditedBy />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
