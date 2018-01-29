import {
    GET_ALL_POSTS
} from '../dispatches/CategoryDispatcher.js';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  console.log("allposts")
  console.log(action);
    switch (action.type) {
        case GET_ALL_POSTS:
                return action.posts
        default:
            return state;
    }
}
