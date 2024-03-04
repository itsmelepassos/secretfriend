import { RequestHandler } from "express";
import * as auth from '../services/auth';

export const validate: RequestHandler = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({ error: `Acesso negado!` });

    const token = req.headers.authorization.split(' ')[1];
    if(!auth.validateToken(token)) return res.status(403).json({ error: `Acesso negado!` });

    next();
}