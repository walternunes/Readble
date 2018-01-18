import React from 'react';
import PropTypes from 'prop-types'

const Categories = (props) => {
  Categories.propTypes = {
  }

    return (
      <div class="col-sm-3 sidenav">
      <h4>Categories</h4>
      <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#section1">Home</a></li>
        <li><a href="#section2">Friends</a></li>
        <li><a href="#section3">Family</a></li>
        <li><a href="#section3">Photos</a></li>
      </ul>
      </div>
    )
}

export default Categories
