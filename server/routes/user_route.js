import {Router} from 'express';
import * as userService from '../services/user_service.js';

const router = Router();

// Get all users
// /api/users

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
})

router.get('/:userId/tracked-animals', async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const tracked_animals = await userService.getUserTrackedAnimal(userId);
        // console.log("user: ", req.params.userId ," tracked animals are: ", tracked_animals);
        res.json(tracked_animals);

    } catch(err) {
        res.status(500).json({error: err.message});
    }
})

router.delete('/:userId/tracked-animals/:individualId', async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const animalId = Number(req.params.individualId);
        const deletedCount = await userService.deleteUserTrackedAnimal(userId, animalId);
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
        // console.log(userId);

    try {
        const result = await userService.createAnimalWithSighting(userId, req.body);
        // console.log(result);
        res.status(201).json(result);

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/:userId/sightings', async (req, res)=> {
    const userId = Number(req.params.userId);
    try {
        const result = await userService.addNewSightingToExistingAnimal(userId, req.body);
        // console.log(result);
        res.status(201).json(result);

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/:userId/stats', async (req, res)=> {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user id" });
    }
    try {
        const result = await userService.getUserStats(userId);
        // console.log(result);
        res.status(200).json(result);

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
})


router.put('/:userId/tracked-animals/:individualId', async (req, res) => {
    try{
        const userId = Number(req.params.userId);
        const animalId = Number(req.params.individualId);
        const animalData = req.body;
        // console.log(userId, animalId, animalData)
        const updated = await userService.updateUserTrackedAnimal(userId, animalId,animalData);
        res.json({
            message: "Tracked animal deleted",
            updated: updated
        });
        
    } catch(err) {
        res.status(500).json({error: err.message});
    }
})
export default router;