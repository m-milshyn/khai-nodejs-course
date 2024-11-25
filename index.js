const express = require('express');
const app = express();

const products = [
    { id: 1, name: 'Product 1', brand: 'Brand A' },
    { id: 2, name: 'Product 2', brand: 'Brand B' },
    { id: 3, name: 'Product 3', brand: 'Brand A' },
];

app.get('/', (request, response) => {
    response.send('Response for GET request');
});

app.get('/products/brand/:brand', (req, res) => {
    const { brand } = req.params;
    const filteredProducts = products.filter(product => product.brand === brand);
    if (filteredProducts) {
        res.json(filteredProducts);
    } else {
        res.status(404).send({ error: 'Product by brand not found' });
    }
});

app.get('/products/name/:name', (req, res) => {
    const { name } = req.params;
    const filteredProducts = products.filter(product => product.name === name);
    if (filteredProducts) {
        res.json(filteredProducts);
    } else {
        res.status(404).send({ error: 'Product by name not found' });
    }
});

app.get('/products/id/:id', (req, res) => {
    const { id } = req.params;
    const filteredProducts = products.find(product => product.id === parseInt(id, 10));
    if (product) {
        res.json(filteredProducts);
    } else {
        res.status(404).send({ error: 'Product by id not found' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}/`);
});
