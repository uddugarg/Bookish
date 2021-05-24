import { Button } from '@material-ui/core';
import { Empty, Result } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, orderSuccessful, removeCartItem } from '../../_actions/user_action';
import './Cart.css';
import CartItems from './CartItems';
import Paypal from './Payment/Paypal';

function Cart(props) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [totalAmt, setTotalAmt] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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

    useEffect(() => {
        if (user.cartDetail && user.cartDetail.length > 0) {
            calculateTotal(user.cartDetail)
        }
    }, [user.cartDetail])

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity;
        });

        setTotalAmt(total);
        setShowTotal(true);
    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(() => {
                // if(user.cartDetail.length <= 0){
                //     setShowTotal(false);
                // }else{
                //     calculateTotal(user.cartDetail)
                // }
                axios.get('/api/user/userCartInfo')
                    .then(response => {
                        if (response.data.success) {
                            if (response.data.cartDetail.length <= 0) {
                                setShowTotal(false);
                            } else {
                                calculateTotal(response.data.cartDetail)
                            }
                        } else {
                            alert('Failed to get cart information')
                        }
                    })
            })
    }

    const transactionSuccess = (data) => {

        let variables = {
            cartDetail: user.cartDetail,
            paymentData: data
        }

        axios.post('/api/user/orderSuccess', variables)
            .then(response => {
                if (response.data.success) {
                    setShowSuccess(true);
                    setShowTotal(false);
                    dispatch(orderSuccessful({
                        cart: response.data.cart,
                        cartDetail: response.data.cartDetail
                    }))
                    window.location.reload();
                } else {
                    alert('Transaction Failed')
                }
            })
    }

    const transactionError = () => {
        console.log('Paypal Transaction Error');
    }

    const transactionCancelled = () => {
        console.log('Paypal Transaction Cancelled');
    }

    const totalUSD = parseInt(totalAmt / 70);
    console.log(totalUSD);

    return (
        <div className='cart'>
            <h1>My Cart</h1>
            <div>

                <CartItems cartItems={user && user.cartDetail} removeItem={removeFromCart} />

                {showTotal ?
                    <div className='cart__total'>
                        <h2>Total Amount: ₹ {totalAmt}</h2>
                    </div>
                    :
                    showSuccess ?
                        <Result status='success' title='Successfully Purchased' />
                        :
                        <div className='cart__empty'>
                            <br />
                            <Empty description={false} />
                            <p>No Items In The Cart</p>
                        </div>
                }

                {showTotal &&
                    <div style={{ marginTop: "20px" }}>
                        <Paypal
                            toPay={totalUSD}
                            onSuccess={transactionSuccess}
                            transactionError={transactionError}
                            transactionCancelled={transactionCancelled}
                        />
                    </div>
                }

            </div>
        </div>
    )
}

export default Cart
