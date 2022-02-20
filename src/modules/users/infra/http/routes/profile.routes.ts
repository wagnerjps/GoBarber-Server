// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Router } from 'express';

import ensureAuthorizated from '../middleware/ensureAuthorizated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthorizated);

profileRouter.get('/', profileController.show);

profileRouter.put('/', profileController.update);

export default profileRouter;
