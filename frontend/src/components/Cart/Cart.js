import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../_actions/user_action';
import './Cart.css';

function Cart() {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        let cartItems = [];

        if (user.userData && user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, user.userData.cart))
            }
        }
    }, [user.userData])

    const renderItems = () => (
        user.cartDetail && user.cartDetail.map(product => {
            <tr key={product._id}>
                <td>
                    <img alt='product'></img>
                </td>
                <td>{product.quantity} EA</td>
                <td>{product.price}</td>
                <td><Button>Remove</Button></td>
            </tr>
        })
    )

    return (
        <div className='cart'>
            <h1>My Cart</h1>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Quantity</th>
                            <th>Product Price</th>
                            <th>Remove from Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderItems}
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Total Amount: </h2>
            </div>

            <Button>Proceed To Pay</Button>
        </div>
    )
}

export default Cart
