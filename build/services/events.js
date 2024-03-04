"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = exports.destroy = exports.update = exports.store = exports.getOne = exports.getAll = void 0;
const client_1 = require("@prisma/client");
const people = __importStar(require("./people"));
const match_1 = require("../utils/match");
const prisma = new client_1.PrismaClient();
const getAll = async () => {
    try {
        return await prisma.event.findMany();
    }
    catch (error) {
        return false;
    }
};
exports.getAll = getAll;
const getOne = async (id) => {
    try {
        return await prisma.event.findFirst({ where: { id: id } });
    }
    catch (error) {
        return false;
    }
};
exports.getOne = getOne;
const store = async (data) => {
    try {
        return await prisma.event.create({ data });
    }
    catch (error) {
        return false;
    }
};
exports.store = store;
const update = async (id, data) => {
    try {
        return await prisma.event.update({ where: { id: id }, data });
    }
    catch (error) {
        return false;
    }
};
exports.update = update;
const destroy = async (id) => {
    try {
        return await prisma.event.delete({ where: { id: id } });
    }
    catch (error) {
        return false;
    }
};
exports.destroy = destroy;
const matches = async (id) => {
    const eventItem = await prisma.event.findFirst({ where: { id }, select: { grouped: true } });
    if (eventItem) {
        const peopleList = await people.getAll({ id_event: id });
        if (peopleList) {
            let sortedList = [];
            let sortable = [];
            let attempts = 0;
            let maxAttempts = peopleList.length;
            let keepTrying = true;
            while (keepTrying && attempts < maxAttempts) {
                keepTrying = false;
                attempts++;
                sortedList = [];
                sortable = peopleList.map(item => item.id);
                for (let i in peopleList) {
                    let sortableFiltered = sortable;
                    if (eventItem.grouped) {
                        sortableFiltered = sortable.filter(sortableItem => {
                            let sortablePerson = peopleList.find(item => item.id === sortableItem);
                            return peopleList[i].id_group !== sortablePerson?.id_group;
                        });
                    }
                    if (sortableFiltered.length === 0 || (sortableFiltered.length === 1 && peopleList[i].id === sortableFiltered[0])) {
                        keepTrying = true;
                    }
                    else {
                        let sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                        while (sortableFiltered[sortedIndex] === peopleList[i].id) {
                            sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                        }
                        sortedList.push({
                            id: peopleList[i].id,
                            match: sortableFiltered[sortedIndex]
                        });
                        sortable = sortable.filter(item => item !== sortableFiltered[sortedIndex]);
                    }
                }
            }
            if (attempts < maxAttempts) {
                for (let i in sortedList) {
                    await people.update({
                        id: sortedList[i].id,
                        id_event: id
                    }, { matched: (0, match_1.encryptMatch)(sortedList[i].match) });
                }
                return true;
            }
        }
    }
    return false;
};
exports.matches = matches;
