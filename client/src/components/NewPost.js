//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, createPost} from '../dispatches/CategoryDispatcher.js';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { FormGroup, FormControl } from 'react-bootstrap'
import shortid from 'shortid'
import Modal from 'react-modal'
import { customPostStyleModal } from '../style'

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
        const uid = shortid.generate();
        const newPost = {
          id: uid,
          title: post.title,
          body: post.description,
          author: post.author,
          category: post.category,
          timestamp: Date.now()
        }
        this.props.createPost(newPost)

        this.props.resetPost()
        this.closeNewPostModal()
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


    renderSelect(values) {
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
              <select className="form-control" { ...values.input }>
                <option value="" defaultValue> Please select a category </option>
                {values.categories.length > 0 && values.categories.map((category, index) => (
                    category.name != "all" &&
                        <option
                            key={index}
                            value={category.name} >
                                {category.name}
                        </option>
                ))}
                </select>
                { error && touched &&
                    <div> <span className="control-label" >Required Field</span></div> }
            </FormGroup>
        );
    }

  render() {
    const { newPostModal } = this.state
    const { handleSubmit, categories } = this.props

    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={newPostModal}
            style={customPostStyleModal}
            onRequestClose={this.closeNewPostModal}
            contentLabel='Modal'
            >
            <h4>New Post </h4>
             <form id="postForm" onSubmit={handleSubmit(this.postForm.bind(this))}>
                <Field
                      label="Title:"
                      name="title"
                      placeholder="Post title"
                      component={this.renderInput}
                />
                <Field
                      label="Description:"
                      name="description"
                      placeholder="Description content"
                      component={this.renderInput}
                />
                <Field
                      label="Category:"
                      name="category"
                      placeholder="Author Name"
                      categories={categories}
                      component={this.renderSelect}
                />
                <Field
                      label="Author:"
                      name="author"
                      placeholder="Author Name"
                      component={this.renderInput}
                />
                <div className="button-add-modal">
                  <button className='btn btn-danger' onClick={this.closeNewPostModal}>Close</button>
                  <button type="submit" className="btn btn-success button-add-modal-left">Submit</button>
                </div>
            </form>
        </Modal>


        <div className='button-add-post'>
          <button onClick={this.openNewPostModal} className="btn btn-primary">Add Post</button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
    return { categories: state.categories }
  }

const mapDispatchToProps = (dispatch) => {
    return { getCategories: (category) => dispatch(getCategories()),
             createPost:    (post)     => dispatch(createPost(post)),
             resetPost:     ()         => dispatch(reset('newPostForm'))
           }
}

NewPost = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default reduxForm({
    validate,
    form: 'newPostForm',
    destroyOnUnmount: false,
})(NewPost)
