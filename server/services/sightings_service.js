import pool from '../db/db.js';

export const getAllSightings = async (page = 1, limit = 12) => {
    const offset = (page - 1) * limit;
    const { rows } = await pool.query( `
        SELECT s.id, s.user_id, s.address, s.zipcode, s.state, s.latitude, s.longitude, s.health_status,
        s.need_help, s.note, s.image_url, s.sighted_at, i.nickname, i.type_id, i.breed_name, i.age_group, t.name as animal_type
        FROM sightings s 
        JOIN individuals i ON s.individual_id = i.id
        JOIN animal_types t ON i.type_id = t.id
        ORDER BY s.sighted_at DESC
        LIMIT $1 OFFSET $2`,
        [limit, offset ]
    )
    const totalCount = await pool.query(`
        SELECT COUNT (*) FROM sightings as totalPage`);
    return {
        data: rows,
        totalCount: totalCount.rows[0].count,
        page: page, 
        limit: limit
    };
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

export const searchSightings = async ({searchText, health_status, animal_type, start_date, end_date, page =1, limit = 12}) => {
    console.log("Searching in db...");
    const offset = (page-1) * limit;
    let query=`
        SELECT s.id, s.user_id, s.address, s.zipcode, s.state, s.latitude, s.longitude, s.health_status,
        s.need_help, s.note, s.image_url, s.sighted_at, i.nickname, i.type_id, i.breed_name, i.age_group, t.name as animal_type
        FROM sightings s 
        JOIN individuals i ON s.individual_id = i.id
        JOIN animal_types t ON i.type_id = t.id`
    
    const conditions = [];
    const values = [];
    
    if(searchText !== null && searchText !== undefined && searchText.trim() !== ""){
        const keyword = searchText.trim();
        values.push(keyword);
        const idx = values.length;
        conditions.push(`LOWER(s.address) LIKE LOWER($${idx }) 
            OR LOWER(i.nickname) LIKE LOWER($${idx })`)
    }
    if(health_status !== null && health_status !== undefined && health_status.trim() !== "") {
        values.push(health_status);
        const idx = values.length;
        conditions.push(`s.health_status = $${idx}`)
    }
    if(animal_type !== null && animal_type !== undefined && animal_type.trim() !== "") {
        values.push(animal_type);
        const idx = values.length;
        conditions.push(`animal_type = $${idx}`)
    }
    if (start_date !== null && start_date !== undefined && start_date.trim() !== "") {
        values.push(start_date.trim());
        const idx = values.length;
        conditions.push(`s.sighted_at >= $${idx}`);
    }
    if (end_date !== null && end_date !== undefined && end_date.trim() !== "") {
        values.push(`${end_date.trim()} 23:59:59`);
        const idx = values.length;
        conditions.push(`s.sighted_at <= $${idx}`);
    }
    if(conditions.length > 0){
        query += ` WHERE ${conditions.join(" AND ")}`;
    }
    query += ` ORDER BY s.sighted_at DESC`;
    values.push(limit);
    values.push(offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
    console.log(query);

    console.log(values);
    const { rows } = await pool.query(query, values);
    console.log("searching result: ", rows);
    return rows;
    
}