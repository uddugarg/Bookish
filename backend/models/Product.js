const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    author: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: String,
    },
    images: {
        type: Array,
    },
    stock: {
        type: Number
    },
    rating: {
        type: Number,
    },
    reviews: {
        type: String,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }