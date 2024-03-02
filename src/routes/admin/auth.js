import express from 'express';
const router = express.Router();
import AdminAuthController from '../../controllers/admin/auth.js';

// create login routes
router
    .post('/createAdmin', AdminAuthController.createAdmin)
    .post('/login', AdminAuthController.login)
    .delete('/deleteUser/:userId', AdminAuthController.deleteUser)
    

export default router;