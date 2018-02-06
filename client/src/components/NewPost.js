//import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { getCategories, createPost } from '../dispatches/CategoryDispatcher.js';
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
        console.log(this.props)
        this.props.createPost(newPost, () => {
            this.props.history.push('/');
        });

        this.props.resetPost()
        this.closeNewPostModal()
      }

      renderInput(values) {
          //const { meta: { touched, error } } = field;
          const className = null;
          return (
              <FormGroup validationState={className}>
                <label>{values.label}</label>
                <input className="form-control" { ...values.input } type="text" placeholder={values.placeholder}/>
              </FormGroup>
          );
      }


    renderSelect(values) {
        //const { categories } = this.props;
        //const { meta: { touched, error } } = field;
        const className = null;
        console.log(values)
        return (
            <FormGroup validationState={className}>
              <label>{values.label}</label>
              <select className="form-control" id="CategoryPost">
                {values.categories.length > 1 && values.categories.map((category, index) => (
                    category.name != "all" &&
                        <option
                            key={index}
                            value={category.name}>
                                {category.name}
                        </option>
                ))}
                </select>
            </FormGroup>
        );
    }

  render() {
    const { newPostModal } = this.state
    const { handleSubmit, categories } = this.props
    console.log(this.props)
    console.log(this.context)
    console.log(this.context.router)
    console.log("--->")
    Modal.setAppElement('body')
    return (
     <div>
        <Modal
            overlayClassName='overlay'
            isOpen={newPostModal}
            style={customStyleModal}
            onRequestClose={this.closeNewPostModal}
            contentLabel='Modal'
            >
             <form onSubmit={handleSubmit(this.postForm.bind(this))}>
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
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </Modal>

        <div>
          <button onClick={this.openNewPostModal} className="btn btn-success">Submit</button>
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
             createPost:    (post)     => dispatch(createPost(post), () => { this.props.history.push('/'); }),
             resetPost:     ()         => dispatch(reset('postForm'))
           }
}

NewPost = connect(mapStateToProps, mapDispatchToProps)(NewPost);

export default reduxForm({
    validate,
    form: 'postForm',
})(NewPost)
