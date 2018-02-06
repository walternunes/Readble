import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer';
import PostReducer from './PostReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    categories: CategoryReducer,
    posts: PostReducer,
    form: formReducer
});
