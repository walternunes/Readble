import React, { Component } from 'react';
import { getPosts, votePost, deletePost, setPostSort } from '../actions/';
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewPost from './NewPost.js'
import EditPost from './EditPost.js'

class Posts extends Component {
  state = {
      posts: [],
      sort: {}
  }

  getCurrentCategory() {
    if(this.props.match && this.props.match.params){
      return this.props.match.params.category
    } else {
      return "all"
    }
  }

  componentWillMount() {
      this.props.setPostSort("byVote")
      this.props.getPosts(this.getCurrentCategory());
  }

  render() {
    const { deletePost, posts, sort, votePost, setPostSort } = this.props
    const sortPosts = () => {
      switch (sort) {
        case "byVote" :
            return posts.sort((val1, val2) => (val2.voteScore-val1.voteScore))
        case "byDate" :
            return posts.sort((val1, val2) => (val2.timestamp-val1.timestamp))
        default :
            return posts
      }
    }

    return (
      <Col sm={9}>
      <Row>
        <Col sm={3}>
        <div className="form-inline select-sort">
          <label htmlFor="sortBySelect">SortBy:</label>
          <select onChange={event => setPostSort(event.target.value)} className="form-control" id="sortBySelect">
            <option value='byVote'>Vote</option>
            <option value='byDate'>Date</option>
          </select>
        </div>
        </Col>
        <Col sm={9}>
          <NewPost/>
          </Col>
      </Row>
      {posts.length > 0 && sortPosts().map((post, index) => (
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
              <Link to={`/${post.category}/${post.id}`}><span>{post.title} </span></Link>
            </div>
            <div className="list-item-body-author">
              <span className="glyphicon glyphicon-time"></span><span className="list-item-body-author-text"> Post by {post.author} at {new Date(post.timestamp).toLocaleString()}</span>
            </div>
          </div>
          <div className="fixedContainerDelete-Detail">
              <div className="delete-icon icon" onClick={() => deletePost(post.id)}></div>
          </div>
          <div className="fixedContainer-Detail">
              <EditPost post={post}/>
          </div>
        </Row>
      ))}
    </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    sort: state.sort
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        getPosts:    (category)     => dispatch(getPosts(category)),
        votePost:    (postId, vote) => dispatch(votePost(postId, vote)),
        setPostSort: (orderBy)      => dispatch(setPostSort(orderBy)),
        deletePost:  (id)           => dispatch(deletePost(id))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Posts);
