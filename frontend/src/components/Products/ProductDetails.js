import React, { useEffect, useState } from 'react';
import { Divider, Card, CardContent, Button } from '@material-ui/core';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import { addToCart } from '../../_actions/user_action';
import { useDispatch } from 'react-redux';

function ProductDetails(props) {

    const prodId = props.match.params.prodId;

    const dispatch = useDispatch();

    const [product, setProduct] = useState('');

    const variable = {
        prodId: prodId,
    }

    useEffect(() => {

        axios.post('/api/product/getProduct', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.product);
                    setProduct(response.data.product);
                } else {
                    alert('Unable to fetch products!');
                }
            })

    }, [])

    const addToCartHandle = () => {
        dispatch(addToCart(prodId));
    }

    return (
        <div className='details'>

            <div className='details__img'>
                {product.images && product.images[0] &&
                    <Carousel autoplay={false}>
                        {product.images.map(image => (
                            <img className='image' src={`http://localhost:5000/${image}`} alt='images' />
                        ))}
                    </Carousel>
                }
            </div>

            <div className='details__content'>
                <h2>{product.title}</h2>
                <p>{product.author}</p>
                <p>{product.description}</p>
                <p>{product.rating} stars | ({product.reviews} reviews)</p>
                <Divider />
                <h4>Price: <sup> ₹</sup>{product.price}</h4>
                <span>Inclusive of all taxes</span>
            </div>

            <Card className='details__card'>
                <CardContent className='details__cardContent'>
                    <h4>Price: <sup> ₹</sup>{product.price}</h4>
                    <Button className='details__btn' type='submit' variant='contained' onClick={addToCartHandle}>Add to Cart</Button><br />
                    Qty: <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select> <br />
                    <Button className='details__btn' type='submit' variant='contained'>Buy Now</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductDetails
