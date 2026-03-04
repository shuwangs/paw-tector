import pool from '../db/db.js';

export const getAllUsers = async () => {
    const {rows} = await pool.query(`
        SELECT id, user_name, user_email
        FROM 
        USERS`
    )
    return rows;
}