import {Router} from 'express';
import * as userServie from '../services/user_service.js';

const router = Router();

// Get all users
// /api/users

router.get('/', async (req, res) => {
    try {
        const users = await userServie.getAllUsers();
        res.json(users);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
})

export default router;