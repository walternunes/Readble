import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';

class Categories extends Component {

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, currentCategory } = this.props
  console.log(categories)
    return (
      <div className="col-sm-3 sidenav">
        <h4>Categories</h4>
        <ul className="nav nav-pills nav-stacked">
          {categories.length > 1 && categories.map((category, index) => (
              <li key={index}><a href="#">{category.name}</a>
              </li>
          ))}
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
