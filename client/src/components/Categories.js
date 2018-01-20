import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';

class Categories extends Component { 

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="col-sm-3 sidenav">
        <h4>Categories</h4>
        <ul className="nav nav-pills nav-stacked">
          <li className="active"><a href="#section1">Home</a></li>
          <li><a href="#section2">Friends</a></li>
          <li><a href="#section3">Family</a></li>
          <li><a href="#section3">Photos</a></li>
        </ul>
      </div>
    )
  }
}

function mapProps(state) {
  return { categories: state.categories }
}

export default connect(mapProps, {
  getCategories
})(Categories);
