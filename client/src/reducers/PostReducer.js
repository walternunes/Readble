import {
    GET_ALL_POSTS,
    VOTE_POST
} from '../dispatches/CategoryDispatcher.js';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  console.log("allposts")
  console.log(action);
    switch (action.type) {
        case GET_ALL_POSTS:
                return action.posts
        case VOTE_POST:
                return state.map((post) => post.id === action.posts.id ? action.posts : post )
        default:
            return state;
    }
}
