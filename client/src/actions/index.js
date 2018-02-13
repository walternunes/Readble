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
export const SORT_BY = 'sort_by'


const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function getCategories() {

    return dispatch => {
        axios.get(`http://localhost:3001/categories`)
            .then(res => dispatch({ type: GET_CATEGORIES, categories: res.data }))
    }
}

export function getPosts(category) {
  if (category === 'all') {
    return dispatch => {
      axios.get(`http://localhost:3001/posts`)
          .then(res => dispatch({ type: GET_ALL_POSTS, posts: res.data }))
    }
  } else {
    return dispatch => {
      axios.get(`http://localhost:3001/${category}/posts`)
          .then(res => dispatch({ type: GET_ALL_POSTS, posts: res.data }))
    }
  }
}

export function votePost(postId, vote) {
  return dispatch => {
      axios.post(`http://localhost:3001/posts/${postId}`, { option: vote })
          .then(res => dispatch({ type: VOTE_POST, posts: res.data }))
  }
}

export function voteComment(commentId, vote) {
    return dispatch => {
        axios.post(`http://localhost:3001/comments/${commentId}`, { option: vote })
            .then(res => dispatch({ type: VOTE_COMMENT, comments: res.data }))
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
      axios.post(`http://localhost:3001/posts/`, data)
          .then(res => {
              dispatch({ type: CREATE_POST, posts: res.data });
          });

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
        axios.post(`http://localhost:3001/comments/`, data)
            .then(res => {
                dispatch({ type: CREATE_COMMENT, comments: res.data });
            });
    }
  }

  export const setPostSort = (sortBy) => {
  return {
    type: SORT_BY,
    sortBy
  }
}

export function editPost(values) {
  return dispatch => {
        axios.put(`http://localhost:3001/posts/${values.id}`, values)
            .then(res => {
                dispatch({type: EDIT_POST, posts: res.data})
            });
    }
}

export function editComment(values) {

    return dispatch => {
        axios.put(`http://localhost:3001/comments/${values.id}`, values)
            .then(res => {
                dispatch({ type: EDIT_COMMENT, comments: res.data })
            });

    }
}

export function deletePost(id) {
    return dispatch => {
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(res => {
                dispatch({type: DELETE_POST, posts: res.data});
            });
    }
}

export function deleteComment(id) {
    return dispatch => {
        axios.delete(`http://localhost:3001/comments/${id}`)
            .then(res => {
                dispatch({type: DELETE_COMMENT, comments: res.data});
            });
    }
}

export function getPost(id) {
    return dispatch => {
        axios.get(`http://localhost:3001/posts/${id}`)
            .then(res => dispatch({type: GET_POST, posts: res.data}));

    }
}

export function getComments(id) {
  return dispatch => {
        axios.get(`http://localhost:3001/posts/${id}/comments`)
            .then(res => {dispatch({type: GET_COMMENTS, id: id, comments: res.data})});

    }
}
