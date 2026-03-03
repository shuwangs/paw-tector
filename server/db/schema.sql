DROP TABLE IF EXISTS sightings CASCADE;
DROP TABLE IF EXISTS individuals CASCADE;
DROP TABLE IF EXISTS animal_types CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS health_status_type CASCADE;
DROP TYPE IF EXISTS age_group_type CASCADE;

-- ENUM type
CREATE TYPE health_status_type AS ENUM ('healthy', 'injured', 'sick', 'unknown');
CREATE TYPE age_group_type AS ENUM ('baby', 'young', 'adult', 'senior', 'unknown');

-- users TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255)  NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- animal_types TABLE
CREATE TABLE animal_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- individual TABLE
CREATE TABLE individuals (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(100) NOT NULL,
    type_id INTEGER NOT NULL REFERENCES animal_types(id),
    breed_name VARCHAR(100),
    color VARCHAR(50),
    description TEXT,
    age_group age_group_type NOT NULL DEFAULT 'unknown',
    is_sterilized BOOLEAN NOT NULL DEFAULT false,
    is_stray BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- sightings TABLE
CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
    individual_id INTEGER NOT NULL REFERENCES individuals(id) ON DELETE RESTRICT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    -- address
    address TEXT NOT NULL,
    zipcode VARCHAR(20) NOT NULL,
    state VARCHAR(50) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),

    -- details
    health_status health_status_type NOT NULL default 'unknown',
    need_help BOOLEAN NOT NULL DEFAULT false,
    note TEXT,
    image_url TEXT,
    sighted_at TIMESTAMP NOT NULL DEFAULT NOW()
);

COMMIT;