import { Router } from 'express';
const router = Router();
import manageSeo from '../../controllers/user/ManageSeo.js';

router.get('/seo', manageSeo.getSeos)
    .get('/seo/:path', manageSeo.getSeoByPath)

export default router;