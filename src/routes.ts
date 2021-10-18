import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAutheticated } from "./middlewares/ensureAutheticated";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentsController();

const listUserSendComplimentsController =
new ListUserSendComplimentsController();
const listUserReceiverComplimentsController =
new ListUserReceiverComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAutheticated, ensureAdmin, createTagController.handle);
router.post('/session', authenticateUserController.handle);
router.post('/compliments', ensureAutheticated, createComplimentController.handle)

router.get('/users/compliments/send', ensureAutheticated, listUserSendComplimentsController.handle);
router.get('/users/compliments/receiver', ensureAutheticated, listUserReceiverComplimentsController.handle);
router.get('/tags', ensureAutheticated, listTagsController.handle);
router.get('/users', ensureAutheticated, listUsersController.handle);

export { router };
