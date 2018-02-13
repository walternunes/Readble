//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, editPost } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { FormGroup, FormControl } from 'react-bootstrap'
import shortid from 'shortid'
import Modal from 'react-modal'
import { customSmallStyleModal } from '../style'

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

    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={editPostModal}
            style={customSmallStyleModal}
            onRequestClose={this.closeEditPostModal}
            contentLabel='Modal'
            >
            <h4>Edit Post </h4>
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
                <div className="button-add-modal">
                  <button className='btn btn-danger' onClick={this.closeEditPostModal}>Close</button>
                  <button type="submit" className="btn btn-success button-add-modal-left">Save</button>
                </div>
            </form>
        </Modal>
        <div className="edit-icon icon" onClick={this.openEditPostModal}></div>
    </div>
    )
  }
}

const mapStateToProps = (state, single) => {
    return { }
  }

const mapDispatchToProps = (dispatch) => {
    return { editPost:    (post)     => dispatch(editPost(post)),
             resetPost:     ()         => dispatch(reset('editPostForm'))
           }
}

EditPost = connect(mapStateToProps, mapDispatchToProps)(EditPost);

export default reduxForm({
    validate,
    form: 'editPostForm',
    destroyOnUnmount: false,
})(EditPost)
