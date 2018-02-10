import {
    GET_COMMENTS
} from '../dispatches/CategoryDispatcher.js';
import _ from 'lodash';
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_COMMENTS:
                console.log("--<>")
                return _.mapKeys(action.payload, 'id');
        default:
            return state;
    }
}
