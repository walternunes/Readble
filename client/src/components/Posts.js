//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getPosts } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';

class Posts extends Component {
  state = {
      posts: [],
  }
  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props
    console.log(this.props)
    return (
      <div className="col-sm-9">


    	  <div className="row list-item-box">
    			<div className="list-item-vote-box">
    				<div className="list-item-vote-count">
    					<div className="list-item-vote-arrows">
    						<input title="Click to vote up"  type="submit" value="+" className="list-item-vote-arrows-up"/>
    						<input title="Click to vote down"  type="submit" value="&ndash;" className="list-item-vote-arrows-down"/>
    					</div>
    					<div className="list-item-vote-text">
    						<span className="list-item-vote-text">
    							<span className="list-item-vote-text-number">+2</span><span className="list-item-vote-text-number-text"> votes</span>
    						</span>
    					</div>
    				</div>
    				<div className="list-item-vote-answer">
    					<h5><span className="label label-primary">Ipsum</span></h5>
    					<span>48</span>
    					<span>answers</span>

    				</div>
    			</div>
    			<div className="list-item-body-box">
    				<div className="list-item-body-summary">
    					<a href=""><span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </span></a>
    				</div>
    				<div className="list-item-body-author">
    					<span className="glyphicon glyphicon-time"></span><span className="list-item-body-author-text"> Post by Jane Dane, Sep 27, 2015.</span>
    				</div>

    			</div>
    			<div className="fixedContainer">
    					<button type="submit" className="btn btn-success">Submit</button>
    				</div>
    	  </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        getPosts: (category) => dispatch(getPosts())
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Posts);
