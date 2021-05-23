import { Button } from '@material-ui/core'
import React from 'react'

function CartItems({ cartItems, removeItem }) {

    const renderCartImg = (images) => {
        if (images.length > 0) {
            let image = images[0];
            return `http://localhost:5000/${image}`;
        }
    }

    const renderItems = () => (
        cartItems && cartItems.map(product => (
            <tr key={product._id}>
                <td>
                    <img style={{ width: '70px' }} src={renderCartImg(product.images)} alt='product'></img>
                </td>
                <td>{product.quantity} EA</td>
                <td>₹ {product.price}</td>
                <td>
                    <Button onClick={() => removeItem(product._id)}>Remove</Button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table className='cart__table'>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default CartItems
