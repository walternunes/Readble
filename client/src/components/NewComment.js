//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, createComment} from '../dispatches/CategoryDispatcher.js';
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

    if (!values.author) {
        errors.author = true
    }

    return errors
}

class NewComment extends Component {
  state = {
    newCommentModal: false
  }

    openNewCommentModal = () => this.setState(() => ({ newCommentModal: true }))
    closeNewCommentModal = () => this.setState(() => ({ newCommentModal: false }))

    commentForm = (comment) => {
        const uid = shortid.generate();
        const parentId = this.props.parentId;

        const newComment = {
          id: uid,
          parentId: parentId,
          body: comment.description,
          author: comment.author,
          timestamp: Date.now()
        }
        this.props.createComment(newComment)

        this.props.resetComment()
        this.closeNewCommentModal()
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
    const { newCommentModal } = this.state
    const { handleSubmit, categories } = this.props

    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={newCommentModal}
            style={customStyleModal}
            onRequestClose={this.closeNewCommentModal}
            contentLabel='Modal'
            >
             <form id="commentForm" onSubmit={handleSubmit(this.commentForm.bind(this))}>
                <Field
                      label="Description:"
                      name="description"
                      placeholder="Description content"
                      component={this.renderInput}
                />
                <Field
                      label="Author:"
                      name="author"
                      placeholder="Author Name"
                      component={this.renderInput}
                />
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </Modal>

        <div>
          <button onClick={this.openNewCommentModal} className="btn btn-success">Submit</button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {  }
  }

const mapDispatchToProps = (dispatch) => {
    return { createComment:    (comment)     => dispatch(createComment(comment)),
             resetComment:     ()         => dispatch(reset('newCommentForm'))
           }
}

NewComment = connect(mapStateToProps, mapDispatchToProps)(NewComment);

export default reduxForm({
    validate,
    form: 'newCommentForm',
    destroyOnUnmount: false,
})(NewComment)
