import React, { Component } from 'react';
import _ from 'lodash';
import {
  scrollTop,
} from '../utils/episode';
import ClearFilterButton from './ClearFilterButton';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    this.focusOnTextInput();
  }

  componentDidUpdate() {
    this.focusOnTextInput();
  }

  handleSearchChange = event => {
    const { value } = event.target;
    const { filter } = this.props;
    const FILTER_DELAY_IN_MILLISECONDS = 250;

    this.setState({
      search: value,
    });

    const debouncedFilter = _.debounce(() => {
      scrollTop();
      filter(value);
    }, FILTER_DELAY_IN_MILLISECONDS);

    debouncedFilter();
  }

  focusOnTextInput = () => {
    this.textInput.focus();
  }

  clearFilter = () => {
    const { filter } = this.props;

    this.state = {
      search: '',
    };

    filter('');

    scrollTop();
  }

  renderHeader = () => {
    const { episodes, filterBy } = this.props;

    if (filterBy) {
      return (
        <h1>
          {`${episodes.length} ${episodes.length === 1 ? 'episode' : 'episodes'}`}
          <ClearFilterButton onClearFilter={this.clearFilter} />
        </h1>
      );
    }

    return (
      <h1>DailyVee Tips</h1>
    );
  }

  render() {
    const { search } = this.state;

    return (
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              {this.renderHeader()}
            </div>
            <div className="col-sm-9">

              <form className="search" onSubmit={event => event.preventDefault()}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-lg"
                    placeholder="Search for lessons, moments or episodes..."
                    value={search}
                    onChange={this.handleSearchChange}
                    ref={input => { this.textInput = input; }}
                  />
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  episodes: React.PropTypes.array.isRequired,
  filterBy: React.PropTypes.string.isRequired,
  filter: React.PropTypes.func.isRequired,
};

export default Header;
