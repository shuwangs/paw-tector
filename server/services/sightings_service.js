import pool from '../db/db.js';

export const getAllSightings = async () => {
    const { rows } = await pool.query( `
        SELECT s.id, s.user_id, s.address, s.zipcode, s.state, s.latitude, s.longitude, s.health_status,
        s.need_help, s.note, s.image_url, s.sighted_at,i.nickname, i.type_id, i.breed_name, i.age_group
        FROM sightings s 
        JOIN individuals i ON s.individual_id = i.id
        JOIN animal_types t ON i.type_id = t.id
        ORDER BY s.sighted_at DESC`
    )
    return rows;
}

export const getSightingsStats = async () => {
    // console.log("testing: reached getSightingsStats in sightings service")
    const {rows} = await pool.query(
    `
    SELECT
    (SELECT COUNT(DISTINCT individual_id) FROM sightings) AS animals_tracked,
    (SELECT COUNT(*) FROM sightings) AS total_sightings,
    (SELECT COUNT(*) FROM users) AS total_volunteers,
    (SELECT COUNT(DISTINCT address) FROM sightings) AS locations;
    `
    )
    // console.log(rows);
    return rows [0];
}