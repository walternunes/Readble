import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import PostReducer from './PostReducer';
import CommentReducer from './CommentReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    categories: CategoryReducer,
    posts: PostReducer,
    comments: CommentReducer,
    form: formReducer
});
