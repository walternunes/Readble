import {
    GET_CATEGORIES,
    GET_ALL_POSTS
} from '../dispatches/CategoryDispatcher.js';
import _ from 'lodash';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CATEGORIES:
        console.log(action);
            return [{name: 'all', path:'all'}].concat(action.categories.categories) 
        default:
            return state;
    }
}
