import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from '../services/auth';

export const signin: RequestHandler = (req, res) => {

    const signinSchema = z.object({
        password: z.string()
    });
    const body = signinSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: `Dados inválidos` });

    if (!auth.validatePassword(body.data.password)) res.status(403).json({ error: 'Acesso negado' });

    return res.json({ token: auth.createToken() });
}

