const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

router.get('/products', (request, response) => {
    return response.json(products);
});

router.get('/products/:brand', blockSpecialBrand, (request, response) => {
    const { brand } = request.params;
    const filteredProducts = products.filter(product => product.brand === brand);
    response.json(filteredProducts);
});

router.get('/productswitherror', (request, response) => {
    response.status(400).send({ error: 'Processing error' });
});

router.get('/products/id/:id', (request, response) => {
    const { id } = request.params;
    const product = products.find(product => product.id === parseInt(id, 10));
    if (product) {
        response.json(product);
    } else {
        response.status(404).send({ error: 'Product not found' });
    }
});

module.exports = router;
