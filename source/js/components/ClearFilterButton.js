import React, { Component } from 'react';

class ClearFilterButton extends Component {
  handleClick = () => {
    const { onClearFilter } = this.props;

    onClearFilter();
  }

  render() {
    return (
      <button className="clearFilterButton" title="Clear filter" onClick={this.handleClick}>
        <i className="fa fa-times-circle" aria-hidden="true" />
      </button>
    );
  }
}

ClearFilterButton.propTypes = {
  onClearFilter: React.PropTypes.func.isRequired,
};

export default ClearFilterButton;
