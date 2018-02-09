//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, editPost } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { FormGroup, FormControl } from 'react-bootstrap'
import shortid from 'shortid'
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

    if (!values.title) {
        errors.title = true
    }

    if (!values.description) {
        errors.description = true
    }

    if (!values.category) {
        errors.category = true
    }

    if (!values.author) {
        errors.author = true
    }

    return errors
}

class EditPost extends Component {
  state = {
    editPostModal: false
  }

    openEditPostModal = () => {
      this.props.initialize(this.props.post);
      this.setState(() => ({ editPostModal: true }))
    }
    closeEditPostModal = () => this.setState(() => ({ editPostModal: false }))

    componentWillMount() {
        // this.props.getCategories();
    }

    editPostForm = (post) => {
        console.log("<><>")
        console.log(post)
        /*const uid = shortid.generate();
        const newPost = {
          id: uid,
          title: post.title,
          body: post.description,
          author: post.author,
          category: post.category,
          timestamp: Date.now()
        }*/
        this.props.editPost(post)
        this.props.resetPost()
        this.closeEditPostModal()
      }

      renderInput(values) {
          const { meta: { touched, error, pristine } } = values;
          let className = null;
          if(touched && error){
              className = 'has-error';
          } else if(!pristine){
              className = "has-success"
          }

          return (
              <FormGroup className={className}>
                <label>{values.label}</label>
                <input className="form-control" { ...values.input } type="text" placeholder={values.placeholder}/>
                { error && touched &&
                    <div> <span className="control-label" >Required Field</span></div> }
              </FormGroup>
          );
      }

  render() {
    const { editPostModal } = this.state
    const { handleSubmit, post } = this.props
  //  console.log(post)

    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={editPostModal}
            style={customStyleModal}
            onRequestClose={this.closeEditPostModal}
            contentLabel='Modal'
            >
             <form id="postForm" onSubmit={handleSubmit(this.editPostForm.bind(this))}>
                <Field
                      label="Title:"
                      name="title"
                      placeholder="Post title"
                      component={this.renderInput}
                />
                <Field
                      label="Description:"
                      name="body"
                      placeholder="Description content"
                      component={this.renderInput}
                />
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </Modal>

        <div>
          <button onClick={this.openEditPostModal} className="btn btn-success">Submit</button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state, single) => {
    return { }
  }

const mapDispatchToProps = (dispatch) => {
    return { editPost:    (post)     => dispatch(editPost(post)),
             resetPost:     ()         => dispatch(reset('postForm'))
           }
}

EditPost = connect(mapStateToProps, mapDispatchToProps)(EditPost);

export default reduxForm({
    validate,
    form: 'editForm',
    destroyOnUnmount: false,
})(EditPost)
