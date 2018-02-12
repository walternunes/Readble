import {
    GET_COMMENTS, VOTE_COMMENT, DELETE_COMMENT, CREATE_COMMENT
} from '../dispatches/CategoryDispatcher.js'; 
const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case VOTE_COMMENT:
        return {
            ...state,
            [action.comments.parentId]: state[action.comments.parentId].map((comment) => comment.id === action.comments.id
              ? action.comments
              : comment)
        };
        case DELETE_COMMENT:
      return {
        ...state,
        [action.comments.parentId]: state[action.comments.parentId].filter((comment) => comment.id !== action.comments.id)
      }
      case CREATE_COMMENT:
                   return {
                    ...state,
                    [action.comments.parentId]: [
                      ...state[action.comments.parentId],
                      action.comments
                    ]
                  }
        case GET_COMMENTS:
                return {
                  ...state,
                  [action.id]: action.comments
                }
              default:
            return state;
    }
}
