import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentsController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAutheticated } from "./middlewares/ensureAuheticated";


const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentsController();

router.post('/users', createUserController.handle);
router.post('/tags', ensureAutheticated, ensureAdmin, createTagController.handle);
router.post('/session', authenticateUserController.handle);
router.post('/compliments', ensureAutheticated, createComplimentController.handle)

export { router };
