//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import NewPost from './NewPost.js'
import EditPost from './EditPost.js'
import Comments from './Comments.js'
import { getPost, getComments, votePost, deletePost } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { Col, Row } from 'react-bootstrap'

class PostDetail extends Component {
  state = {
      posts: [],
  }


  componentWillMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { deletePost, posts, votePost, comments } = this.props
    const post = posts[0] || {}
    return (
      <Col sm={12}>
        <NewPost/>

        {post &&
          <Row className="list-item-box" >
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
              <div className="list-item-body-description">
                <span className="list-item-body-description-text">{post.body}</span>
              </div>
            </div>
            <div className="fixedContainer">
                <EditPost post={post}/>
                <button onClick={() => deletePost(post.id)} className="btn btn-success">Delete</button>
            </div>
          </Row>
        }
    </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    posts: state.posts

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        getPost: (id) => dispatch(getPost(id)),
        votePost: (postId, vote) => dispatch(votePost(postId, vote)),
        deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(PostDetail);
