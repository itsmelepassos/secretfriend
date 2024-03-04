"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInterceptor = void 0;
const requestInterceptor = (req, res, next) => {
    console.log(`=> ${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
};
exports.requestInterceptor = requestInterceptor;
