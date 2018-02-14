import axios from 'axios';

export const GET_CATEGORIES = 'get_categories';
export const GET_POST = 'get_post';
export const GET_ALL_POSTS = 'get_all_posts';
export const CREATE_POST = 'create_post';
export const EDIT_POST = 'edit_post';
export const VOTE_POST = 'vote_posts';
export const DELETE_POST = 'delete_post';
export const GET_COMMENTS = 'get_comments';
export const VOTE_COMMENT = 'vote_comment';
export const DELETE_COMMENT = 'delete_comment';
export const CREATE_COMMENT = 'create_comment';
export const EDIT_COMMENT = 'edit_comment';
export const ADD_COMMENT = 'add_comment'
export const SUB_COMMENT = 'sub_comment'
export const SORT_BY = 'sort_by'

const API_URL = "http://localhost:3001/"
const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

/* Categories actions */
export function getCategories() {
    return dispatch => {
        axios.get(`${API_URL}categories`)
            .then(response => dispatch({ type: GET_CATEGORIES, categories: response.data }))
    }
}

/* Posts actions */
export function getPost(id) {
    return dispatch => {
        axios.get(`${API_URL}posts/${id}`)
            .then(response => dispatch({type: GET_POST, posts: response.data}));
    }
}

export function getPosts(category) {
  if (category === 'all') {
    return dispatch => {
      axios.get(`${API_URL}posts`)
          .then(response => dispatch({ type: GET_ALL_POSTS, posts: response.data }))
    }
  } else {
    return dispatch => {
      axios.get(`${API_URL}${category}/posts`)
          .then(response => dispatch({ type: GET_ALL_POSTS, posts: response.data }))
    }
  }
}

export function createPost(values) {
  const { title, body, author, category } = values;
  const data = {
    id: Date.now(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  }
  return dispatch => {
    axios.post(`${API_URL}posts/`, data)
        .then(response => {
            dispatch({ type: CREATE_POST, posts: response.data });
        });
  }
}

export function editPost(values) {
  return dispatch => {
    axios.put(`${API_URL}posts/${values.id}`, values)
        .then(response => {
            dispatch({type: EDIT_POST, posts: response.data})
        });
  }
}

export function deletePost(id, func = () => {}) {
    return dispatch => {
      axios.delete(`${API_URL}posts/${id}`)
          .then(response => {
              func();
              dispatch({type: DELETE_POST, posts: response.data});
          });
    }
}

export function votePost(postId, vote) {
  return dispatch => {
      axios.post(`${API_URL}posts/${postId}`, { option: vote })
          .then(response => dispatch({ type: VOTE_POST, posts: response.data }))
  }
}

/* Comments actions */
export function getComments(id) {
  return dispatch => {
      axios.get(`${API_URL}posts/${id}/comments`)
          .then(response => { dispatch({type: GET_COMMENTS, id: id, comments: response.data})});
  }
}

export function createComment(values) {
  const { parentId, body, author } = values;
  const data = {
      id: Date.now(),
      timestamp: Date.now(),
      parentId,
      body,
      author
  }
  return dispatch => {
      axios.post(`${API_URL}comments/`, data)
          .then(response =>  dispatch({ type: CREATE_COMMENT, comments: response.data }))
          .then(() => dispatch(addCountComment(parentId)));
  }
}

export function editComment(values) {
    return dispatch => {
        axios.put(`${API_URL}comments/${values.id}`, values)
            .then(response => { dispatch({ type: EDIT_COMMENT, comments: response.data })});
    }
}

export function deleteComment(id, parentId) {
    return dispatch => {
        axios.delete(`${API_URL}comments/${id}`)
            .then(response => dispatch({type: DELETE_COMMENT, comments: response.data}))
            .then(() => dispatch(subCountComment(parentId)));
    }
}

export function voteComment(commentId, vote) {
  return dispatch => {
      axios.post(`${API_URL}comments/${commentId}`, { option: vote })
          .then(response => dispatch({ type: VOTE_COMMENT, comments: response.data }))
  }
}

/* Control post detail count comments actions */
export const addCountComment = (id) => {
  return { type: ADD_COMMENT, id }
}

export const subCountComment = (id) => {
  return { type: SUB_COMMENT, id }
}

/* Sort actions */
export const setPostSort = (sortBy) => {
  return { type: SORT_BY, sortBy }
}
