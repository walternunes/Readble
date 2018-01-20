import { combineReducers } from 'redux';
import CategoryReducer from './CategoryReducer'; 


export const RootReducer = combineReducers({ 
    categories: CategoryReducer
});

export default RootReducer;