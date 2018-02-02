import {
    GET_CATEGORIES,
} from '../dispatches/CategoryDispatcher.js';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  //console.log("allcategories")
  //console.log(action.type);
    switch (action.type) {
        case GET_CATEGORIES:
            return [{name: 'all', path:'all'}].concat(action.categories.categories)
        default:
            return state;
    }
}
