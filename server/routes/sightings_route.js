
import {Router} from "express";

import * as sightingsService from '../services/sightings_service.js';

const router = Router();

// Get api/sightings

router.get('/', async (req, res) => {
    // res.send("Hello from Router");
    try {
        const sightings = await sightingsService.getAllSightings();
        res.json(sightings);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})


export default router;