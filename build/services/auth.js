"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = exports.validatePassword = void 0;
const getCurrentDate_1 = require("../utils/getCurrentDate");
const validatePassword = (password) => {
    const currentPassword = (0, getCurrentDate_1.getCurrentDate)().split('/').join('');
    return password === currentPassword;
};
exports.validatePassword = validatePassword;
const createToken = () => {
    const currentPassword = (0, getCurrentDate_1.getCurrentDate)().split('/').join('');
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
};
exports.createToken = createToken;
const validateToken = (token) => {
    const currentToken = (0, exports.createToken)();
    return token === currentToken;
};
exports.validateToken = validateToken;
