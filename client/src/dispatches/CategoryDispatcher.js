import _ from 'lodash'
import axios from 'axios';

export const GET_CATEGORIES = 'get_categories';
const AUTH_HEADERS = { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', };
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function getCategories() {

    return dispatch => {
        axios.get(`http://localhost:3001/categories`)
            .then(res => dispatch(getCategoriesObj(res.data)));
    }
}

function getCategoriesObj(data) {
    return {
        type: GET_CATEGORIES,
        categories: data
    };
}
