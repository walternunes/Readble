import _ from 'lodash'
import axios from 'axios';

export const GET_CATEGORIES = 'get_categories';

export function getCategories() { 
    
    return dispatch => {
        axios.get(`http://localhost:3001/categories`)
            .then(res => dispatch(fetchCategoriesSuccess(res.data))); 
    }
}

function fetchCategoriesSuccess(data) {
    return {
        type: GET_CATEGORIES,
        payload: data
    };
}