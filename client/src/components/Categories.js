import React, { Component } from 'react';
import { Col, ListGroupItem, ListGroup } from 'react-bootstrap'
import { getCategories, getPosts } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Categories extends Component {

  componentWillMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, getPosts } = this.props
    return (
      <Col sm={3} className='categories-box'>
        <h4>Categories</h4>
        <ListGroup >
        {categories.length > 0 && categories.map((category, index) => (
          <ListGroupItem key={index}>
            <Link to={category.path === 'all' ? '/' : `/${category.path}`} onClick={() => getPosts(category.path)}>
              {category.name}
            </Link>
          </ListGroupItem>
        ))}
        </ListGroup>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories }
}

const mapDispatchToProps = (dispatch) => {
  return {
        getCategories: (category) => dispatch(getCategories()),
        getPosts:      (category) => dispatch(getPosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
