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

      {posts.length > 1 && posts.map((post, index) => (
    	  <div className="row list-item-box" key={index}>
    			<div className="list-item-vote-box">
    				<div className="list-item-vote-count">
    					<div className="list-item-vote-arrows">
    						<input title="Click to vote up"  type="submit" value="+" className="list-item-vote-arrows-up"/>
    						<input title="Click to vote down"  type="submit" value="&ndash;" className="list-item-vote-arrows-down"/>
    					</div>
    					<div className="list-item-vote-text">
    						<span className="list-item-vote-text">
    							<span className="list-item-vote-text-number">{post.voteScore}</span><span className="list-item-vote-text-number-text"> votes</span>
    						</span>
    					</div>
    				</div>
    				<div className="list-item-vote-answer">
    					<h5><span className="label label-primary">{post.category}</span></h5>
    					<span>{post.commentCount}</span>
    					<span> comments</span>

    				</div>
    			</div>
    			<div className="list-item-body-box">
    				<div className="list-item-body-summary">
    					<a href=""><span>{post.title} </span></a>
    				</div>
    				<div className="list-item-body-author">
    					<span className="glyphicon glyphicon-time"></span><span className="list-item-body-author-text"> Post by {post.author}, Sep 27, 2015.</span>
    				</div>

    			</div>
    			<div className="fixedContainer">
    					<button type="submit" className="btn btn-success">Submit</button>
    				</div>
    	  </div>
      ))}
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
