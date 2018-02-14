import { GET_CATEGORIES } from '../actions/';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return [{name: 'all', path:'all'}].concat(action.categories.categories)
        default:
            return state;
    }
}
