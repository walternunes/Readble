//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import NewPost from './NewPost.js'
import EditPost from './EditPost.js'
import { getPost, getComments, votePost, deletePost } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { Col, Row } from 'react-bootstrap'

class PostDetail extends Component {
  state = {
      comments: [],
  }


  componentWillMount() {
    this.props.getComments(this.props.match.params.id);
  }

  render() {
    const { comments } = this.props
    console.log("comments--<><>")
    console.log(comments)
   /* const post = posts[0] || {}
    const postComments = comments[post.id] || []
    console.log(this.props)
    console.log(comments)
    console.log(post)
    console.log("<<<<<<<")*/
    return (
      <div>
          <span>this is a comment</span>
          </div>
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
