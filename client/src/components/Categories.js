//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, getPosts } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Categories extends Component {

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { categories } = this.props
    return (
      <div className="col-sm-3 sidenav">
        <h4>Categories</h4>
        <ul className="nav nav-pills nav-stacked">
          {categories.length > 1 && categories.map((category, index) => (
              <li key={index}>
                  <Link to={category.path === 'all' ? '/' : `/${category.path}`} onClick={() => getPosts(category.path)}>
                    {category.name}
                  </Link>
              </li>
          ))}
        </ul>
      </div>
    )
  }
}
/*
function mapStateToProps (state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps , {
  getCategories,
  getPosts
})(Categories);
*/

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        getCategories: (category) => dispatch(getCategories()),
        getPosts: (category) => dispatch(getPosts(category))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Categories);
