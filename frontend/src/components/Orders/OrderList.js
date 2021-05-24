import axios from 'axios'
import React, { useEffect, useState } from 'react'

function OrderList() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/user/getOrderHistory')
            .then(response => {
                if (response.data.success) {
                    setOrders(response.data.history)
                } else {
                    alert('Failed to get Order History')
                }
            })
    }, [])

    return (
        <div style={{ width: '80%', margin: '7rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />
            <table style={{ textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.dateOfPurchase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderList
