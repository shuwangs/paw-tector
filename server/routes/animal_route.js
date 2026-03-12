import {Router} from 'express';
import * as animalService from '../services/animal_service.js';

const router = Router();

router.get('/:individualId', async (req, res ) => {
    console.log("fetching an animal");
    const animal_id = Number(req.params.individualId);
    if((Number.isNaN(animal_id))) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid individual ID format'
        })
    }
    try{
        const animalData = await animalService.fetchAnimalData(animal_id);  

        if (!animalData) {
            return res.status(404).json({
                status: "fail",
                message: "Animal not found"
            });
        }

        res.status(200).json(animalData)
    } catch(err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch animal data"
        });
    }

})

router.get('/:individualId/stats', async (req, res ) => {

    const animal_id = Number(req.params.individualId);
    if((Number.isNaN(animal_id))) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid individual ID format'
        })
    }

    try{
        const stats = await animalService.getAnimalStats(animal_id);  

        if (!stats) {
            return res.status(404).json({
                status: "fail",
                message: "Animal not found"
            });
        }

        res.status(200).json(stats)
    } catch(err) {
            console.error(err.message);
            res.status(500).json({
                status: "error",
                message: "Failed to fetch animal data"
        });
    }

})

export default router;