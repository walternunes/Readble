import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { customSmallStyleModal } from '../style'
import { editComment } from '../actions/';
import { connect } from 'react-redux';
import { FormGroup } from 'react-bootstrap'
import Modal from 'react-modal'

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

    closeEditCommentModal = () => this.setState(() => ({ editCommentModal: false }))
    openEditCommentModal = () => {
      this.props.initialize(this.props.comment);
      this.setState(() => ({ editCommentModal: true }))
    }

    editCommentForm = (comment) => {
      this.props.editComment(comment)
      this.props.resetComment()
      this.closeEditCommentModal()
    }

    renderInput(values) {
        const { meta: { touched, error, pristine } } = values;
        let className = null;

        if(touched && error) {
            className = 'has-error';
        } else if (!pristine) {
            className = "has-success"
        }

        return (
            <FormGroup className={className}>
              <label>{values.label}</label>
              <input className="form-control" { ...values.input } type="text" placeholder={values.placeholder}/>
              { error && touched &&
                  <div> <span className="control-label" >Required Field</span></div>
              }
            </FormGroup>
        );
    }

    render() {
      const { editCommentModal } = this.state
      const { handleSubmit } = this.props

      Modal.setAppElement('body')
      return (
        <div>
          <Modal
            overlayClassName='overlay'
            isOpen={editCommentModal}
            style={customSmallStyleModal}
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
                <button type="submit" className="btn btn-success button-add-modal-left">Save</button>
              </div>
            </form>
          </Modal>
          <div className="edit-icon icon" onClick={this.openEditCommentModal}></div>
        </div>
      )
    }
  }

const mapStateToProps = (state, single) => {
    return { }
  }

const mapDispatchToProps = (dispatch) => {
    return { editComment:    (comment)     => dispatch(editComment(comment)),
             resetComment:   ()            => dispatch(reset('editCommentForm'))
           }
}

EditComment = connect(mapStateToProps, mapDispatchToProps)(EditComment);

export default reduxForm({
    validate,
    form: 'editCommentForm',
    destroyOnUnmount: false,
})(EditComment)
