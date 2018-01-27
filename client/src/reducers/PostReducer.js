import {
    GET_ALL_POSTS
} from '../dispatches/CategoryDispatcher.js';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
                console.log(action);
                return action.posts
        default:
            return state;
    }
}
