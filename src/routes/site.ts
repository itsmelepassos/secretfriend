import { Router } from "express";
import * as  PingController from '../controllers/PingController';

import * as EventController from '../controllers/EventController';
import * as PeopleController from '../controllers/PeopleController';

const router = Router();

router.get('/ping', PingController.ping);

router.get('/events/:id', EventController.getEvent);
router.get('/events/:id_event/search', PeopleController.searchPerson);

export default router;