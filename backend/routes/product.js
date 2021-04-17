const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Product } = require('../models/Product');

var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})

var upload = multer({ storage: storage }).single('file');

router.post('/uploadImage', (req, res) => {
    upload(req, res, (err) => {
        let filePath = res.req.file.path.replace(/\\/g, '/');
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, filePath: filePath, filename: res.req.file.filename });
    })
})

router.post('/uploadProduct', (req, res) => {
    const product = new Product(req.body)

    product.save((err) => {
        if (err)
            return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true });
    })
})

router.post('/getProducts', (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    Product.find()
        .sort({ "createdAt": -1 })
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, products, endProducts: products.length });
        })
})

router.post('/getProduct', (req, res) => {
    Product.findOne({ '_id': req.body.prodId })
        .exec((err, product) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).json({ success: true, product });
        })
})

router.get('/products_by_id', (req, res) => {
    let type = req.query.type;
    let productIds = req.query.id

    if (type === 'array') {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(product);
        })
})


module.exports = router;