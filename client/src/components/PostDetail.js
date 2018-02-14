//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getPost, votePost, deletePost } from '../actions/';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap'
import NewPost from './NewPost.js'
import EditPost from './EditPost.js'

class PostDetail extends Component {
  state = {
      posts: [],
  }

  componentWillMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { posts, deletePost, votePost } = this.props
    const post = posts[0] || {}
    if (!post.id) {
      return (
        <div>
          <h2 > Post not Found </h2>
        </div>
      )
    } else {
    return (
      <Col sm={12}>
        <Row>
          <Col sm={3}>
          <div className="form-inline select-sort">
            <Button onClick={()=> this.props.history.push('/') } className="btn btn-info">Back</Button>
          </div>
          </Col>
          <Col sm={9}>
            <NewPost/>
          </Col>
        </Row>
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
                <span>{post.title} </span>
              </div>
              <div className="list-item-body-author">
                <span className="glyphicon glyphicon-time"></span><span className="list-item-body-author-text"> Post by {post.author} at {new Date(post.timestamp).toLocaleString()} </span>
              </div>
              <div className="list-item-body-description">
                <span className="list-item-body-description-text">{post.body}</span>
              </div>
            </div>
            <div className="fixedContainerDelete-Detail">
                <div className="delete-icon icon" onClick={() => deletePost(post.id, () => {this.props.history.push('/') })}></div>
            </div>
            <div className="fixedContainer-Detail">
                <EditPost post={post}/>
            </div>
          </Row>
        }
    </Col>
  )}
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
        getPost:    (id)           => dispatch(getPost(id)),
        deletePost: (id, func)     => dispatch(deletePost(id, func)),
        votePost:   (postId, vote) => dispatch(votePost(postId, vote))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(PostDetail);
