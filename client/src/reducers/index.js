import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import PostReducer from './PostReducer';
import CommentReducer from './CommentReducer';
import SortReducer from './SortReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    categories: CategoryReducer,
    posts: PostReducer,
    comments: CommentReducer,
    sort: SortReducer,
    form: formReducer
});
