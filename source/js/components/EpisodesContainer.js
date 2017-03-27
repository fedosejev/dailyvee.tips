import { connect } from 'react-redux';

import {
  filter,
} from '../actions/filter';

import Episodes from './Episodes';

const mapStateToProps = ({ episodes, filterBy }) => ({
  episodes,
  filterBy,
});

const mapDispatchToProps = dispatch => ({
  filter: value => (
    dispatch(filter(value))
  ),
});

const EpisodesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Episodes);

export default EpisodesContainer;
