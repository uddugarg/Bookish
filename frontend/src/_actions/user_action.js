import axios from 'axios';
import { AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, ADD_TO_CART_USER, GET_CART_ITEMS_USER } from './types';

export function registerUser(submit) {
    const request = axios.post('/api/user/register', submit)
        .then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(submit) {
    const request = axios.post('/api/user/login', submit)
        .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/user/auth')
        .then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get('/api/user/logout')
        .then(response => response.data);
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(_id){
    const request = axios.get(`/api/user/addToCart?prodId=${_id}`)
        .then(response => response.data);
    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

export function getCartItems(cartItems, userCart){
    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if(cartItem.id === productDetail._id){
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })
            return response.data;
        });
    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}