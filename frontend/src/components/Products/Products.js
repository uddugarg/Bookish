import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import axios from 'axios';
import './Products.css';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'


function Products() {

    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [endProducts, setEndProducts] = useState(0);

    useEffect(() => {
        const variable = {
            skip: skip,
            limit: limit,
        }

        getProducts(variable);
    }, [])


    const getProducts = (variable) => {
        axios.post('/api/product/getProducts', variable)
            .then(response => {
                if (response.data.success) {
                    setProducts([...products, ...response.data.products]);
                    setEndProducts(response.data.endProducts);
                } else {
                    alert('Failed to get videos');
                }
            })
    }


    const handleLoadMore = () => {
        let Skip = skip + limit;

        const variable = {
            skip: Skip,
            limit: limit,
        }

        getProducts(variable);

        setSkip(Skip);
    }


    return (
        <div>
            <div className='product'>
                {
                    products.map((product, index) => (
                        <Card key={index} className='product__card'>
                            <CardContent className='product__content'>
                                <Link to={`/bookish/${product._id}`}>
                                    <Carousel autoplay>
                                        {product.images.map(image => (
                                            <img className='product__img' src={`http://localhost:5000/${image}`} />
                                        ))}
                                    </Carousel>
                                </Link>
                                <span>{product.author}</span>
                                <Link to={`/bookish/${product._id}`}>
                                    <h4 className='product__name'>{product.title}</h4>
                                </Link>
                                <h3><sup>₹</sup>{product.price}</h3>
                                <p>{product.rating} stars ({product.reviews}reviews)</p>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>

            {endProducts >= limit &&
                <div className='product__load'>
                    <Button variant='text' onClick={handleLoadMore}>Load More</Button>
                </div>
            }
        </div>
    )
}

export default Products
