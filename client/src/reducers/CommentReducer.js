import { GET_COMMENTS, VOTE_COMMENT, DELETE_COMMENT, CREATE_COMMENT, EDIT_COMMENT } from '../actions/';

export default function (state = {}, action) {
    switch (action.type) {
      case VOTE_COMMENT:
        return {...state, [action.comments.parentId]: state[action.comments.parentId].map((comment) => comment.id === action.comments.id ?
              action.comments : comment)};
      case DELETE_COMMENT:
        return {...state, [action.comments.parentId]: state[action.comments.parentId].filter((comment) => comment.id !== action.comments.id)}
      case EDIT_COMMENT:
        return {...state, [action.comments.parentId]: state[action.comments.parentId].map((comment) => comment.id === action.comments.id ?
                {...comment, body:action.comments.body, timestamp: action.comments.timestamp} : comment)}
      case CREATE_COMMENT:
        return {...state, [action.comments.parentId]: [...state[action.comments.parentId], action.comments]}
      case GET_COMMENTS:
        return {...state, [action.id]: action.comments}
      default:
        return state;
    }
}
