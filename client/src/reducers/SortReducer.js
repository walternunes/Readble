import  {
    SORT_BY
} from '../actions/';

const INITIAL_STATE = {sortType: 'byVote'};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case SORT_BY:
            return  action.sortBy
        default:
            return state;
    }
}
