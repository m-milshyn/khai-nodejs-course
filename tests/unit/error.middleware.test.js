const { errorResponder } = require('../../error.middleware');

describe('Error Middleware Tests', () => {
    test('errorResponder - should return the error message and status code', () => {
        const err = { statusCode: 400, message: 'Test error' };
        const req = {};
        const res = {
            header: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        errorResponder(err, req, res, next);

        expect(res.header).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Test error');
    });

    test('errorResponder - should use default status code and message', () => {
        const err = {};
        const req = {};
        const res = {
            header: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const next = jest.fn();

        errorResponder(err, req, res, next);

        expect(res.header).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
});
