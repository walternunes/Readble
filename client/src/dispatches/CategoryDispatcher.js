import axios from 'axios';

export const GET_CATEGORIES = 'get_categories';
export const GET_ALL_POSTS = 'get_all_posts';
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
    console.log("--->");
    console.log(category);
    return dispatch => {
      axios.get(`http://localhost:3001/posts`)
          .then(res => dispatch({ type: GET_ALL_POSTS, posts: res.data }))
          .catch(error => console.log(error))
    }
  } else {
    console.log("---<");
    console.log(category);
    return dispatch => {
      axios.get(`http://localhost:3001/${category}/posts`)
          .then(res => dispatch({ type: GET_ALL_POSTS, posts: res.data }))
          .catch(error => console.log(error))
    }
  }
}
