import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import PostReducer from './PostReducer';

export default combineReducers({
    categories: CategoryReducer,
    posts: PostReducer
});
