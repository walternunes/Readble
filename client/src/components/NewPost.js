//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, addNewPost } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-modal'

const customStyleModal = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '50%',
    left                       : '50%',


    border                     : '1px solid rgb(204, 204, 204)',
    background                 : 'rgb(255, 255, 255)',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    width                      : '500px',
    height                     : '500px',
    transform                  : 'translate(-50%, -50%)'
  }
}

const validate = values => {

    const errors = {};

    return errors
}



class NewPost extends Component {
  state = {
    newPostModal: false
  }

    openNewPostModal = () => this.setState(() => ({ newPostModal: true }))
    closeNewPostModal = () => this.setState(() => ({ newPostModal: false }))

    componentWillMount() {
        this.props.getCategories();
    }

    postForm = (post) => {
        const uid = 23123;
        const newPost = {
          id: uid,
          timestamp: Date.now(),
          title: 'aaaaa',
          body: post.body,
          author: 'bbbb',
          category: 'redux'
        }
        this.props.createPost(newPost, () => {
            this.props.history.push('/');
        });
      //  this.props.resetPostForm()
        this.closeNewPostModal()
      }

  render() {
    const { newPostModal } = this.state
    const { categories } = this.props
    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={newPostModal}
            style={customStyleModal}
            onRequestClose={this.closeNewPostModal}
            contentLabel='Modal'>
            {newPostModal && <form >
                <div className="close-click" >X</div>
                <div className="form-group">
                    <label htmlFor="titlePost">Title</label>
                    <input type="text" className="form-control" id="titlePost" placeholder="Post title"/>
                </div>
                <div className="form-group">
                    <label htmlFor="authorPost">Author</label>
                    <input type="text" className="form-control" id="authorPost" placeholder="Author name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="commentPost">Category</label>
                    <select className="form-control" id="CategoryPost">
                    {categories.length > 1 && categories.map((category, index) => (
                        category.name != "all" &&
                            <option
                                key={index}
                                value={category.name}>
                                    {category.name}
                            </option>
                    ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="categoryPost">Comment</label>
                    <input type="text" className="form-control" id="commentPost" placeholder="Comment"/>
                </div>
                <button onClick={this.postForm} className="btn btn-success">Submit</button>
             </form>
            }
        </Modal>
      <div>
             <button onClick={this.openNewPostModal} className="btn btn-success">Submit</button>
        </div>
    </div>
    )
  }
}
/*
const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
        getPosts: (category) => dispatch(getPosts(category))
  }
}*/

// export default (NewPost);

const mapStateToProps = (state) => {
    return { categories: state.categories }
  }

const mapDispatchToProps = (dispatch) => {
    return { getCategories: (category) => dispatch(getCategories()),
             addNewPost:    (post)      => dispatch(addNewPost(post)) }
}

NewPost = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default reduxForm({
    validate,
    form: 'postForm',
})(NewPost)
