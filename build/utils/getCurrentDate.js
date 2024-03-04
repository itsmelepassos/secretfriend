"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = void 0;
const getCurrentDate = () => Intl.DateTimeFormat('pt-br').format(new Date());
exports.getCurrentDate = getCurrentDate;
