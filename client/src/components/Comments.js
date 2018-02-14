import React, { Component } from 'react';
import { getComments, getPost, voteComment, deleteComment } from '../actions';
import { Col, Row, ListGroupItem, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NewComment from './NewComment.js';
import EditComment from './EditComment.js'

class PostDetail extends Component {
  state = {
      comments: [],
  }

  componentWillMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  render() {
    const { comments, voteComment, deleteComment, posts } = this.props
    const postComments = comments[this.props.match.params.id] || []
    const post = posts[0] || {}
    if (!post.id) {
      return (
        <div>
          <Link to='/'><h4 > Back to home page </h4></Link>
        </div>
      )
    } else {
    return (
      <Col sm={12}>
        <NewComment parentId={this.props.match.params.id} />
        <ListGroup >
        {postComments.length > 0 && postComments.map((comment, index) => (
          <ListGroupItem key={index}>
            <Row className="list-item-box-comments" key={index}>
              <div className="list-item-vote-box">
                <div className="list-item-vote-count">
                  <div className="list-item-vote-arrows">
                    <input title="Click to vote up"  type="submit" value="+" className="list-item-vote-arrows-up" onClick={() => voteComment(comment.id, 'upVote')}/>
                    <input title="Click to vote down"  type="submit" value="&ndash;" className="list-item-vote-arrows-down" onClick={() => voteComment(comment.id, 'downVote')}/>
                  </div>
                  <div className="list-item-vote-text">
                    <span className="list-item-vote-text">
                      <span className="list-item-vote-text-number">{comment.voteScore}</span><span className="list-item-vote-text-number-text"> votes</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="list-item-body-box">
                <div className="list-item-body-author">
                  <span className="glyphicon glyphicon-time"></span><span className="list-item-body-author-text"> Comment by {comment.author} at {new Date(comment.timestamp).toLocaleString()}</span>
                </div>
                <div className="list-item-body-description">
                  <span className="list-item-body-description-text">{comment.body}</span>
                </div>
              </div>
              <div className="fixedContainerDelete">
                <div className="delete-icon icon" onClick={() => deleteComment(comment.id, comment.parentId)}></div>
              </div>
              <div className="fixedContainer">
                <EditComment comment={comment}/>
              </div>
            </Row>
          </ListGroupItem>
        ))}
        </ListGroup>
      </Col>
    )}
  }
}

const mapStateToProps = (state) => {
  return { comments: state.comments, posts: state.posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
        voteComment:   (commentId, vote) => dispatch(voteComment(commentId, vote)),
        deleteComment: (id, parentId)    => dispatch(deleteComment(id, parentId)),
        getComments:   (id)              => dispatch(getComments(id)),
        getPost:       (id)              => dispatch(getPost(id))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(PostDetail);
