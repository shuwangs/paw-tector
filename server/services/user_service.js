import pool from '../db/db.js';

export const getAllUsers = async () => {
    const {rows} = await pool.query(`
        SELECT id, user_name, user_email
        FROM 
        USERS`
    )
    return rows;
}

export const getUserTrackedAnimal = async (userId) => {
    const {rows} = await pool.query(`
        SELECT DISTINCT ON(s.individual_id)
        s.user_id, s.individual_id, s.sighted_at, s.health_status,
        s.need_help, at.name AS animal_type,i.nickname AS name, i.breed_name, i.color, i.age_group
        FROM sightings s
        JOIN individuals i ON s.individual_id = i.id
        JOIN animal_types at ON i.type_id = at.id
        WHERE s.user_id = $1
        ORDER BY s.individual_id, s.sighted_at DESC
        `, [userId])

    return rows;
}

export const deleteUserTrackedAnimal = async (user_id, animal_id) => {
    const {rowCount} = await pool.query(`
        DELETE FROM sighings
        WHERE user_id = $1 AND animal_id = $2
        `, [user_id, animal_id])

    return rowCount;
}
