import { RequestHandler } from "express-serve-static-core";
import * as groups from '../services/groups';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const { id_event } = req.params;

    const items = await groups.getAll(parseInt(id_event as string));

    if (items) return res.json({ groups: items });

    res.json({ error: `Ocorreu um erro!` });
}

export const getGroup: RequestHandler = async (req, res) => {
    const { id_event, id } = req.params;

    const groupItem = await groups.getOne({
        id: parseInt(id as string),
        id_event: parseInt(id_event as string)
    });

    if (groupItem) return res.json({ group: groupItem });

    res.json({ error: `Ocorreu um erro!` });
}

export const store: RequestHandler = async (req, res) => {
    const { id_event } = req.params;

    const storeGroupSchema = z.object({
        name: z.string(),
    });

    const body = storeGroupSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: 'Dados inválidos!' });

    const newGroup = await groups.store({
        name: body.data.name,
        id_event: parseInt(id_event as string)
    });

    if (newGroup) return res.status(201).json({ event: newGroup });

    res.json({ error: `Ocorreu um erro!` });
}

export const update: RequestHandler = async (req, res) => {
    const { id, id_event } = req.params;

    const updateGroupSchema = z.object({
        name: z.string().optional(),
    });

    const body = updateGroupSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: 'Dados inválidos!' });

    const updatedGroup = await groups.update({
        id: parseInt(id as string),
        id_event: parseInt(id_event as string)
    }, body.data);

    if (updatedGroup) return res.json({ group: updatedGroup });

    res.json({ error: `Ocorreu um erro!` });
}

export const destroy: RequestHandler = async (req, res) => {
    const {id, id_event} = req.params;

    const deletedGroup = await groups.destroy({
        id: parseInt(id as string),
        id_event: parseInt(id_event as string)
    });

    if (deletedGroup) return res.json({ group: deletedGroup });

    res.json({ error: `Ocorreu um erro!` });
}