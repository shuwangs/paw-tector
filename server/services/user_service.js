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
        s.need_help, at.name AS animal_type,i.nickname, i.breed_name, i.color, i.age_group
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
        DELETE FROM sightings
        WHERE user_id = $1 AND individual_id = $2
        `, [user_id, animal_id])

    return rowCount;
}


export const createAnimalWithSighting = async (user_id, form) => {
    console.log("calling create animal with sightings")
    const  {
        nickname,
        species,
        breed,
        color,
        age_group,
        is_sterilized,
        is_stray,
        // Sighting 
        location,
        health_status,
        sighted_at,
        notes
    } = form;
    // console.log( nickname);
    const client = await pool.connect();
    
    try{
        // Start the whole transaction;
        await client.query("BEGIN");

        // 1. Get animal type ID
        const typeRes = await client.query(`
            SELECT id
            FROM animal_types
            WHERE name = $1`, [species]
        );
        // console.log( typeRes);

        if (typeRes.rows.length === 0) {
            throw new Error("Invalid animal type");
        }

        const animalId = typeRes.rows[0].id;
        // console.log( animalId);

        // console.log("animal_id is: ", animalId)
        // 2 insert into individual table
        const individualRes = await client.query(
            `
            INSERT INTO individuals
            (nickname, type_id, breed_name, color, age_group, is_sterilized,is_stray)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
            `,
            [nickname, animalId, breed, color, age_group, is_sterilized, is_stray]
        );
        //  console.log("animal_id is: ", individualRes)

        // Get individual ID 
        const individualId = individualRes.rows[0].id;
        // console.log("individualId is: ", individualId)

        //Insert into sightings
        const sightingsRes = await client.query(
            `
            INSERT INTO sightings
            (individual_id, user_id, address, health_status, sighted_at, note)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [individualId, user_id, location, health_status, sighted_at, notes]
        );
        await client.query("COMMIT");
        return individualRes.rows[0];

    } catch(err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
    
}


export const addNewSightingToExistingAnimal = async (user_id, form) => {
    const { individual_id, address, health_status, sighted_at, notes } = form;
    // console.log("I am at the db chekcing individual id: ", individual_id)
    // console.log(form);
    // console.log(user_id);

    const { rows } = await pool.query(
        `
        INSERT INTO sightings (
        user_id,
        individual_id,
        address,
        health_status,
        sighted_at,
        note
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
    [user_id, individual_id, address, health_status, sighted_at, notes]
  );
    // console.log("I am at the db chekcing after insert rows: ", rows)

  return rows[0];

}

export const getUserStats = async (user_id) =>{
    console.log("I am at the db chekcing stats id: ", user_id)

    const {rows} = await pool.query(
        `SELECT
        COUNT (*) as total_sightings,
        COUNT (DISTINCT address) as locations ,
        COUNT (DISTINCT individual_id) as animals_tracked 
        FROM sightings WHERE user_id = $1
        `,
        [user_id]
    )
    console.log("I am at the db get user stats after insert rows: ", rows)

    return rows[0];
}