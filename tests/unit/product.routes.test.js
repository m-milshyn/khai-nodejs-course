const request = require('supertest');
const express = require('express');
const productRoutes = require('../../product.routes');

const app = express();
app.use(productRoutes);

describe('Product Routes', () => {
    test('GET /products - should return all products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /products/:brand - should return products for a specific brand', async () => {
        const response = await request(app).get('/products/Brand A');
        expect(response.status).toBe(200);
        expect(response.body.every(product => product.brand === 'Brand A')).toBe(true);
    });

    test('GET /products/:brand - should return 403 for Brand C', async () => {
        const response = await request(app).get('/products/Brand C');
        expect(response.status).toBe(403);
        expect(response.text).toBe('Unavailable Brand');
    });

    test('GET /products/id/:id - should return product by ID', async () => {
        const response = await request(app).get('/products/id/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: 'Product 1',
            brand: 'Brand A'
        });
    });

    test('GET /products/id/:id - should return 404 for non-existent product', async () => {
        const response = await request(app).get('/products/id/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Product not found' });
    });

    test('GET /productswitherror - should return 400 error', async () => {
        const response = await request(app).get('/productswitherror');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Processing error" }); // Виправлено
    });
});
