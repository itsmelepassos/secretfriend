import { Router } from "express";
import * as Auth from '../middleware/validate';
import * as PingController from '../controllers/PingController';
import * as AuthController from '../controllers/AuthController';
import * as EventController from '../controllers/EventController';
import * as GroupController from '../controllers/GroupController';
import * as PeopleController from '../controllers/PeopleController';

const router = Router();

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

export default router;