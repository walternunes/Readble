//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, editComment } from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { FormGroup, FormControl } from 'react-bootstrap'
import shortid from 'shortid'
import Modal from 'react-modal'
import { customCommentStyleModal } from '../style'

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

class EditComment extends Component {
  state = {
    editCommentModal: false
  }

    openEditCommentModal = () => {
      this.props.initialize(this.props.comment);
      this.setState(() => ({ editCommentModal: true }))
    }
    closeEditCommentModal = () => this.setState(() => ({ editCommentModal: false }))

    componentWillMount() {
        // this.props.getCategories();
    }

    editCommentForm = (comment) => {
        this.props.editComment(comment)
        this.props.resetComment()
        this.closeEditCommentModal()
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
    const { editCommentModal } = this.state
    const { handleSubmit, comment } = this.props

    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={editCommentModal}
            style={customCommentStyleModal}
            onRequestClose={this.closeEditCommentModal}
            contentLabel='Modal'
            >
             <h4>Edit Comment </h4>
             <form id="commentForm" onSubmit={handleSubmit(this.editCommentForm.bind(this))}>
                <Field
                      label="Description:"
                      name="body"
                      placeholder="Description content"
                      component={this.renderInput}
                />
                <Field
                      label="Author:"
                      name="author"
                      placeholder="Author Name"
                      component={this.renderInput}
                />
                <div className="button-add-modal">
                  <button className='btn btn-danger' onClick={this.closeEditCommentModal}>Close</button>
                  <button type="submit" className="btn btn-success button-add-modal-left">Submit</button>
                </div>
            </form>
        </Modal>

        <div>
          <button onClick={this.openEditCommentModal} className="btn btn-success">Submit</button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state, single) => {
    return { }
  }

const mapDispatchToProps = (dispatch) => {
    return { editComment:    (comment)     => dispatch(editComment(comment)),
             resetComment:     ()         => dispatch(reset('editCommentForm'))
           }
}

EditComment = connect(mapStateToProps, mapDispatchToProps)(EditComment);

export default reduxForm({
    validate,
    form: 'editCommentForm',
    destroyOnUnmount: false,
})(EditComment)
