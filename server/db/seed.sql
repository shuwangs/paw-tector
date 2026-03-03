
BEGIN;

TRUNCATE TABLE sightings, individuals, animal_types, users
RESTART IDENTITY
CASCADE;

-- users
 
INSERT INTO users (user_name, user_email) 
VALUES
('Bobo', 'bobo@gmail.com'),
('tester1', 'tester1@example.com'),
('tester2', 'tester2@example.com');

-- animal-types
INSERT INTO animal_types (name) 
VALUES 
('Cat'),
('Dog'),
('Rabbit'),
('Raccoon'),
('Bird'),
('Others');


-- individuals 
INSERT INTO individuals (nickname, type_id, breed_name, color, description, age_group, is_sterilized, is_stray)
VALUES
('Black', 1, 'Ragdoll', 'Orange', 'Friendly long-haired cat often seen near the grocery store.', 'young', false, true),
('Shadow', 1, NULL, 'Black', 'Shy cat with a small white patch on chest; avoids people.', 'adult', true, true);

INSERT INTO individuals (nickname, type_id, breed_name, color, description, age_group, is_sterilized, is_stray)
VALUES
('Buddy', 2, 'Golden Retriever', 'Golden', 'Wanders near the park entrance; appears calm.', 'adult', false, true),
('Snow', 2, NULL, 'White', 'Medium dog with a blue collar; cautious but not aggressive.', 'young', false, true);

-- Raccoons
INSERT INTO individuals (nickname, type_id, breed_name, color, description, age_group, is_sterilized, is_stray)
VALUES
('Bandit', 4, NULL, 'Gray', 'Often seen near dumpsters behind restaurants at night.', 'adult', false, true),
('Rocket', 4, NULL, 'Gray/Black', 'Fast raccoon spotted near residential trash bins.', 'young', false, true);

INSERT INTO sightings (
  individual_id,
  user_id,
  address,
  zipcode,
  state,
  latitude,
  longitude,
  health_status,
  need_help,
  note,
  image_url
)
VALUES
-- Blacksightings
(1, 1, 'Near Whole Foods entrance', '20007', 'DC', 38.9058, -77.0633, 'healthy', false, 'Ate kibble and drank water.', NULL),
(1, 2, 'Corner of Wisconsin Ave NW & P St NW', '20007', 'DC', 38.9096, -77.0646, 'unknown', false, 'Saw the same orange cat crossing the street.', NULL),

-- Shadow sightings
(2, 3, 'Behind CVS parking lot', '20002', 'DC', 38.9070, -76.9926, 'injured', true, 'Limping slightly; stayed under a car.', NULL),
(2, 1, 'Alley near apartment dumpsters', '20002', 'DC', 38.9052, -76.9950, 'injured', true, 'Still limping; may need vet check.', NULL),

-- Buddy sightings
(3, 1, 'Rock Creek Park entrance', '20008', 'DC', 38.9382, -77.0502, 'healthy', false, 'Friendly but kept distance.', NULL),

-- Snow sightings
(4, 2, 'Near Metro Station escalator', '20005', 'DC', 38.9037, -77.0390, 'sick', true, 'Looked dehydrated; panting heavily.', NULL),

-- Bandit sightings
(5, 3, 'Behind Italian restaurant (dumpster area)', '20003', 'DC', 38.8810, -76.9966, 'healthy', false, 'Raccoon searching for food; ran away quickly.', NULL),

-- Rocket sightings
(6, 1, 'Residential street trash bins', '20004', 'DC', 38.8951, -77.0364, 'unknown', false, 'Very fast; only briefly observed.', NULL);