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

router.get('/:userId/tracked-animals', async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const tracked_animals = await userServie.getUserTrackedAnimal(userId);
        console.log("user: ", req.params.userId ," tracked animals are: ", tracked_animals);
        res.json(tracked_animals);

    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

router.delete('/:userId/tracked-animals/:individualId', async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const animalId = Number(req.params.individualId);
        const deletedCount = await userServie.deleteUserTrackedAnimal(userId, animalId);
        res.json({
            message: "Tracked animal deleted",
            deleted: deletedCount
        });
        
    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

router.post('/:userId/tracked-animals', async (req, res) => {
    const userId = Number(req.params.userId);
        console.log(userId);
        console.log(req.body);

    try {
        const result = await userServie.createAnimalWithSighting(userId, req.body);
        console.log(result);
        res.status(201).json(result);

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;