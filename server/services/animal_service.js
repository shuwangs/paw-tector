import pool from '../db/db.js';

export const fetchAnimalData = async(individualId) =>{
    console.log(individualId);
    const individualInfo = await pool.query(
        `
        SELECT 
            id as animal_id, nickname, type_id, breed_name, color, description,
            age_group, is_sterilized, is_stray
        FROM 
        individuals
        WHERE id = $1
        `, [individualId]);
    const animalSightingRecords = await pool.query(
        `SELECT
        id as sighting_id, user_id, address, zipcode, state, health_status, sighted_at
        FROM sightings
        WHERE individual_id = $1
        `, [individualId]
    );
    console.log(animalSightingRecords);
    const formatedData = {
        animalInfo: individualInfo.rows,
        sightedHistory: animalSightingRecords.rows
    }

    return formatedData;
}

export const getAnimalStats = async(individualId) =>{
    
    const {rows} = pool.query(
        `SELECT
        (SELECT COUNT(*) AS sightings_count),
        (SELECT MIN(sighted_at) AS first_sighting,
        (SLECT MAX(sighted_at) AS last_sighting)
        FROM sightings
        WHERE individual_id = $1
        `, [individualId]
    );

    console.log("individual animal stats: ", rows);
    return rows
}