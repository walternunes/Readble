//import PropTypes from 'prop-types'
import React, { Component } from 'react';
//import { getPosts } from '../dispatches/CategoryDispatcher.js';
//import { connect } from 'react-redux';
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

class NewPost extends Component {
  state = {
    newPostModal: false
}

openNewPostModal = () => this.setState(() => ({ newPostModal: true }))
closeNewPostModal = () => this.setState(() => ({ newPostModal: false }))


  render() {
    const { newPostModal } = this.state
    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={newPostModal}
            style={customStyleModal}
            onRequestClose={this.closeNewPostModal}
            contentLabel='Modal'>
                <div className="close-click" >X</div>
                    {newPostModal && <div><span>teste</span></div>}
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

export default (NewPost);
