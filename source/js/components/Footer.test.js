import React from 'react';
import Footer from './Footer';
import renderer from 'react-test-renderer';

describe('Footer', () => {
  test('SHOULD render correctly', () => {
    const tree = renderer.create(
      <Footer />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
