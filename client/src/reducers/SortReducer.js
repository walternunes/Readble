import  { SORT_BY } from '../actions/';

export default function (state = {sortType: 'byVote'}, action) {
    switch (action.type) {

      case SORT_BY:
        return  action.sortBy

      default:
        return state;
    }
}
