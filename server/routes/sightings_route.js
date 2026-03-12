
import {Router} from "express";

import * as sightingsService from '../services/sightings_service.js';

const router = Router();

// Get api/sightings

router.get('/', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const sightings = await sightingsService.getAllSightings(page, limit);
        res.json(sightings);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})
router.get('/stats', async (req, res) => {

    try {
        const stats = await sightingsService.getSightingsStats();
        res.json(stats);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

router.get('/search', async (req, res) => {
    const searchParams = req.query;

    try {
        const {searchText, health_status, animal_type, start_date, end_date} = req.query;
        const result = await sightingsService.searchSightings({searchText, health_status, animal_type, start_date, end_date});
        res.json(result);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})


export default router;