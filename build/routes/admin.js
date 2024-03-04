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
const express_1 = require("express");
const Auth = __importStar(require("../middleware/validate"));
const PingController = __importStar(require("../controllers/PingController"));
const AuthController = __importStar(require("../controllers/AuthController"));
const EventController = __importStar(require("../controllers/EventController"));
const GroupController = __importStar(require("../controllers/GroupController"));
const PeopleController = __importStar(require("../controllers/PeopleController"));
const router = (0, express_1.Router)();
router.get('/ping', Auth.validate, PingController.ping);
router.post('/signin', AuthController.signin);
router.get('/events', Auth.validate, EventController.getAll);
router.get('/events/:id', Auth.validate, EventController.getEvent);
router.post('/events/store', Auth.validate, EventController.store);
router.put('/events/:id/update', Auth.validate, EventController.update);
router.delete('/events/:id/destroy', Auth.validate, EventController.destroy);
router.get('/events/:id_event/groups', Auth.validate, GroupController.getAll);
router.get('/events/:id_event/groups/:id', Auth.validate, GroupController.getGroup);
router.post('/events/:id_event/groups/store', Auth.validate, GroupController.store);
router.put('/events/:id_event/groups/:id/update', Auth.validate, GroupController.update);
router.delete('/events/:id_event/groups/:id/destroy', Auth.validate, GroupController.destroy);
router.get('/events/:id_event/groups/:id_group/people', Auth.validate, PeopleController.getAll);
router.get('/events/:id_event/groups/:id_group/person/:id', Auth.validate, PeopleController.getPerson);
router.post('/events/:id_event/groups/:id_group/person/store', Auth.validate, PeopleController.store);
router.put('/events/:id_event/groups/:id_group/person/:id/update', Auth.validate, PeopleController.update);
router.delete('/events/:id_event/groups/:id_group/person/:id/destroy', Auth.validate, PeopleController.destroy);
exports.default = router;
