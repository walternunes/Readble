//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import NewPost from './NewPost.js'
import EditPost from './EditPost.js'
import { getPosts, votePost, deletePost } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { Col, Row } from 'react-bootstrap'

class Posts extends Component {
  state = {
      posts: [],
  }


  componentWillMount() {
    if(this.props.match && this.props.match.params){
      this.props.getPosts(this.props.match.params.category);
    } else {
      this.props.getPosts('all');
    }
  }

  render() {
    const { deletePost, posts, votePost } = this.props
    console.log(posts)
    return (
      <Col sm={9}>
        <NewPost/>

      {posts.length > 0 && posts.map((post, index) => (
        <Row className="list-item-box" key={index}>
          <div className="list-item-vote-box">
            <div className="list-item-vote-count">
              <div className="list-item-vote-arrows">
                <input title="Click to vote up"  type="submit" value="+" className="list-item-vote-arrows-up" onClick={() => votePost(post.id, 'upVote')}/>
                <input title="Click to vote down"  type="submit" value="&ndash;" className="list-item-vote-arrows-down" onClick={() => votePost(post.id, 'downVote')}/>
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
              <span className="glyphicon glyphicon-time"></span><span className="list-item-body-author-text"> Post by {post.author}, <Timestamp time={post.timestamp} /></span>
            </div>

          </div>
          <div className="fixedContainer">
              <EditPost post={post}/>
              <button onClick={() => deletePost(post.id)} className="btn btn-success">Delete</button>
          </div>
        </Row>
      ))}
    </Col>
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
        getPosts: (category) => dispatch(getPosts(category)),
        votePost: (postId, vote) => dispatch(votePost(postId, vote)),
        deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Posts);
