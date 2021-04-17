import React, { useState } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import DropZone from './DropZone';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Upload.css';

function Upload(props) {

    const user = useSelector(state => state.user);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState([]);

    const categories = [
        {
            value: "Fantasy",
            label: "Fantasy"
        },
        {
            value: "Sci-Fi",
            label: "Sci-Fi"
        },
        {
            value: "Mystery",
            label: "Mystery"
        },
        {
            value: "Thriller",
            label: "Thriller"
        },
        {
            value: "Romance",
            label: "Romance"
        },
        {
            value: "Western",
            label: "Western"
        },
        {
            value: "Dystopian",
            label: "Dystopian"
        },
        {
            value: "Contemporary",
            label: "Contemporary"
        },
    ];


    const handleSubmit = (e) => {
        e.preventDefault();

        if (title === ''
            || description === ''
            || author === ''
            || price === ''
            || category === ''
            || image === ''
            || stock === '') {
            return alert('Fields are empty');
        }

        const variable = {
            title: title,
            description: description,
            author: author,
            price: price,
            category: category,
            images: image,
            stock: stock,
        }

        axios.post('/api/product/uploadProduct', variable)
            .then(response => {
                if (response.data.success) {
                    alert('Product Details Successfully Uploaded');
                    props.history.push('/');
                } else {
                    alert('Failed to upload the details');
                }
            })
    }

    if (user.userData && user.userData.isAdmin) {
        return (
            <div className='upload'>
                <h2>Upload Products</h2>
                <center>
                    <form onSubmit={handleSubmit} className='upload__form'>
                        <DropZone
                            image={image}
                            setImage={setImage}
                        />

                        <TextField className='upload__details' label='Product Title' type='text' variant='filled' required onChange={(e) => setTitle(e.target.value)} />
                        <TextField className='upload__details' label='Product Author' type='text' variant='filled' required onChange={(e) => setAuthor(e.target.value)} />
                        <TextField className='upload__details' label='Product Descrption' type='text' variant='filled' required onChange={(e) => setDescription(e.target.value)} />
                        <TextField className='upload__details' label='Product Price ₹' type='text' variant='filled' required onChange={(e) => setPrice(e.target.value)} />
                        <br />

                        <FormControl className='upload__select'>
                            <InputLabel id="demo-simple-select-filled-label">Select Category</InputLabel>
                            <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" onChange={(e) => setCategory(e.target.value)} required>
                                {categories.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />

                        <TextField className='upload__details' label='Product Stock' type='number' variant='filled' required onChange={(e) => setStock(e.target.value)} />
                        <br />

                        <Button className='upload__btn' variant='contained' type='submit' onClick={handleSubmit}>Upload</Button>

                    </form>
                </center>
            </div>
        )
    } else {
        return (
            <div className='upload'>
                <h2>Sorry, This Page is not Available</h2>
            </div>
        )
    }
}

export default Upload
