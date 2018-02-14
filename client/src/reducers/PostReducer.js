import { GET_POST, GET_ALL_POSTS, VOTE_POST, CREATE_POST, EDIT_POST, DELETE_POST } from '../actions/';

export default function (state = {}, action) {
    switch (action.type) {

      case GET_POST:
        return [action.posts]

      case GET_ALL_POSTS:
        return action.posts

      case VOTE_POST:
        return state.map((post) => post.id === action.posts.id ? action.posts : post )

      case CREATE_POST:
        return [...state, action.posts];

      case EDIT_POST:
        return state.map((post) => post.id === action.posts.id ?
            {...post, title: action.posts.title, body:action.posts.body} : post)

      case DELETE_POST:
        return state.filter((post) => post.id !== action.posts.id)

      default:
        return state;
    }
}
