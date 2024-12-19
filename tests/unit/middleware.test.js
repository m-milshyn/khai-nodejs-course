const { blockSpecialBrand, logRequest } = require('../../middleware');

describe('Middleware Tests', () => {
    test('blockSpecialBrand - should block Brand C', () => {
        const req = { params: { brand: 'Brand C' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        blockSpecialBrand(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('Unavailable Brand');
        expect(next).not.toHaveBeenCalled();
    });

    test('blockSpecialBrand - should call next for other brands', () => {
        const req = { params: { brand: 'Brand A' } };
        const res = {};
        const next = jest.fn();

        blockSpecialBrand(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    test('logRequest - should log the request details', () => {
        const req = { method: 'GET', url: '/products' };
        const res = {};
        const next = jest.fn();
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

        logRequest(req, res, next);

        expect(consoleSpy).toHaveBeenCalledWith('Received a GET request to /products');
        expect(next).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});
