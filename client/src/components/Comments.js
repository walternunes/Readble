//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import NewPost from './NewPost.js'
import EditPost from './EditPost.js'
import { getPost, getComments, votePost, deletePost } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { Link } from 'react-router-dom'
import { Col, Row, ListGroupItem, ListGroup } from 'react-bootstrap'

class PostDetail extends Component {
  state = {
      comments: [],
  }


  componentWillMount() {
    this.props.getComments(this.props.match.params.id);
  }

  render() {
    const { comments } = this.props
    const postComments = comments[this.props.match.params.id] || []
    console.log("comments--<><>")
    console.log(postComments)
   /* const post = posts[0] || {}
    const postComments = comments[post.id] || []
    console.log(this.props)
    console.log(comments)
    console.log(post)
    console.log("<<<<<<<")*/
    return (
      <Col sm={12}>
        { postComments.length > 1 && <h4>Comments</h4>}
        <ListGroup >
          {postComments.length > 1 && postComments.map((comment, index) => (
              <ListGroupItem key={index}>
                  <Row className="list-item-box-comments" key={index}>
          <div className="list-item-vote-box">
            <div className="list-item-vote-count">
              <div className="list-item-vote-arrows">
                <input title="Click to vote up"  type="submit" value="+" className="list-item-vote-arrows-up" onClick={() => votePost(comment.id, 'upVote')}/>
                <input title="Click to vote down"  type="submit" value="&ndash;" className="list-item-vote-arrows-down" onClick={() => votePost(comment.id, 'downVote')}/>
              </div>
              <div className="list-item-vote-text">
                <span className="list-item-vote-text">
                  <span className="list-item-vote-text-number">{comment.voteScore}</span><span className="list-item-vote-text-number-text"> votes</span>
                </span>
              </div>
            </div>
          </div>
          <div className="list-item-body-box">
            <div className="list-item-body-summary">
              <a href=""><span>{comment.title} </span></a>
            </div>
            <div className="list-item-body-author">
              <span className="glyphicon glyphicon-time"></span><span className="list-item-body-author-text"> Comment by {comment.author}, <Timestamp time={comment.timestamp} /></span>
            </div>
            <div className="list-item-body-description">
                <span className="list-item-body-description-text">{comment.body}</span>
            </div>
          </div>
          <div className="fixedContainer">
              <EditPost post={comment}/>
              <button onClick={() => deletePost(comment.id)} className="btn btn-success">Delete</button>
          </div>
        </Row>
              </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        getComments: (id) => dispatch(getComments(id)),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(PostDetail);
