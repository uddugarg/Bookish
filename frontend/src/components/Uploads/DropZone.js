import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import './Upload.css';

function DropZone({ image, setImage }) {

    const handleDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files);
        formData.append('file', files[0]);

        axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setImage([...image, response.data.filePath])
                } else {
                    alert('Failed to upload image!')
                }
            })
    }

    const handleDelete = (img) => {
        const deletedImage = image.indexOf(img);

        let images = [...image]
        images.splice(deletedImage, 1);

        setImage(images);
    }


    return (
        <div className='upload__arena'>
            <div className='upload__area'>
                <Dropzone onDrop={handleDrop}
                    multiple={false}
                    maxSize={80000000000}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="container">
                            <div
                                {...getRootProps({
                                    className: 'dropzone',
                                    onDrop: event => event.stopPropagation()
                                })}
                            >
                                <input name='file' {...getInputProps()} />
                                <AddIcon className='upload__areaBtn' />
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>

            {image.map((img, index) => (
                <div className='upload__thumbnail'>
                    <img src={`http://localhost:5000/${img}`} alt={index} />
                    <DeleteIcon className='upload__delete' onClick={() => handleDelete(img)} />
                </div>
            ))}

        </div>
    )
}

export default DropZone
