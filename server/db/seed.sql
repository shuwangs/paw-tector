
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
('Other');


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

-- More individuals
INSERT INTO individuals (nickname, type_id, breed_name, color, description, age_group, is_sterilized, is_stray)
VALUES
('Milo', 1, 'Tabby', 'Brown', 'Curious cat often seen near cafes.', 'adult', true, true),
('Luna', 1, NULL, 'Gray', 'Quiet gray cat resting near apartments.', 'young', false, true),
('Charlie', 2, 'Labrador', 'Black', 'Friendly dog wandering near parks.', 'adult', false, true),
('Max', 2, NULL, 'Brown', 'Energetic dog spotted running near playground.', 'young', false, true),
('Clover', 3, NULL, 'White/Brown', 'Small rabbit hiding near bushes.', 'young', false, true),
('Sky', 5, NULL, 'Blue/Gray', 'Bird frequently seen on power lines.', 'adult', false, true),
('Pebble', 4, NULL, 'Gray', 'Raccoon digging through trash bins.', 'adult', false, true),
('Flash', 4, NULL, 'Dark Gray', 'Quick raccoon running across alleys.', 'young', false, true);



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
  image_url,
  sighted_at
)
VALUES
-- Blacksightings
(1, 2, 'Near Whole Foods entrance', '20007', 'DC', 38.9058, -77.0633, 'healthy', false, 'Ate kibble and drank water.', NULL, '2026-03-01'),
(1, 2, 'Corner of Wisconsin Ave NW & P St NW', '20007', 'DC', 38.9096, -77.0646, 'unknown', false, 'Saw the same orange cat crossing the street.', NULL, '2026-02-01'),

-- Shadow sightings
(2, 1, 'Behind CVS parking lot', '20002', 'DC', 38.9070, -76.9926, 'injured', true, 'Limping slightly; stayed under a car.', NULL , '2026-03-21'),
(2, 1, 'Alley near apartment dumpsters', '20002', 'DC', 38.9052, -76.9950, 'injured', true, 'Still limping; may need vet check.', NULL, '2026-03-02'),

-- Buddy sightings
(3, 1, 'Rock Creek Park entrance', '20008', 'DC', 38.9382, -77.0502, 'healthy', false, 'Friendly but kept distance.', NULL, '2026-04-11'),

-- Snow sightings
(4, 2, 'Near Metro Station escalator', '20005', 'DC', 38.9037, -77.0390, 'sick', true, 'Looked dehydrated; panting heavily.', NULL, '2026-04-01'),

-- Bandit sightings
(5, 3, 'Behind Italian restaurant (dumpster area)', '20003', 'DC', 38.8810, -76.9966, 'healthy', false, 'Raccoon searching for food; ran away quickly.', NULL, '2026-01-11'),

-- Rocket sightings
(6, 1, 'Residential street trash bins', '20004', 'DC', 38.8951, -77.0364, 'unknown', false, 'Very fast; only briefly observed.', NULL, '2026-01-01');

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
  image_url,
  sighted_at
)
VALUES
(7,1,'Near Georgetown Waterfront','20007','DC',38.9047,-77.0669,'healthy',false,'Resting near benches.',NULL,'2026-03-02'),
(7,1,'Behind coffee shop','20007','DC',38.9055,-77.0639,'unknown',false,'Seen looking for food.',NULL,'2026-03-03'),
(7,1,'Near coffee shop','20007','DC',NULL,NULL,'unknown',false,'Seen looking for food.',NULL,'2026-03-04'),
(7,1,'Near coffee shop','20007','DC',NULL,NULL,'unknown',false,'Seen looking for food.',NULL,'2026-03-05'),

(8,1,'Apartment parking lot','20009','DC',38.9190,-77.0365,'healthy',false,'Quiet gray cat sleeping.',NULL,'2026-03-06'),
(8,1,'Near bike racks','20009','DC',38.9180,-77.0350,'unknown',false,'Quickly ran away.',NULL,'2026-03-07'),

(9,2,'Park walking trail','20010','DC',38.9325,-77.0310,'healthy',false,'Friendly but cautious.',NULL,'2026-03-08'),
(9,1,'Near playground','20010','DC',38.9318,-77.0300,'healthy',false,'Dog sniffing around trash can.',NULL,'2026-03-09'),

(10,3,'Basketball court','20011','DC',38.9572,-77.0240,'healthy',false,'Running around kids playing.',NULL,'2026-03-10'),
(10,2,'Near community garden','20011','DC',38.9560,-77.0230,'unknown',false,'Looked energetic.',NULL,'2026-03-11'),

(11,1,'Near bushes by library','20002','DC',38.9072,-76.9900,'healthy',false,'Small rabbit hopping.',NULL,'2026-03-12'),
(11,2,'Behind apartment complex','20002','DC',38.9065,-76.9910,'unknown',false,'Hiding in grass.',NULL,'2026-03-13'),

(12,1,'Power lines near school','20003','DC',38.8835,-76.9980,'healthy',false,'Bird perched quietly.',NULL,'2026-03-14'),
(12,3,'Tree near sidewalk','20003','DC',38.8840,-76.9970,'healthy',false,'Flying between trees.',NULL,'2026-03-15'),

(13,2,'Dumpster near restaurant','20004','DC',38.8955,-77.0350,'healthy',false,'Looking for leftovers.',NULL,'2026-03-16'),
(13,1,'Alley trash bins','20004','DC',38.8948,-77.0340,'unknown',false,'Raccoon digging through trash.',NULL,'2026-03-17'),

(14,3,'Backyard fence','20005','DC',38.9032,-77.0380,'healthy',false,'Quick raccoon sighting.',NULL,'2026-03-18'),
(14,1,'Street trash cans','20005','DC',38.9028,-77.0370,'unknown',false,'Ran away quickly.',NULL,'2026-03-19'),

(1,2,'Near grocery parking lot','20007','DC',38.9050,-77.0625,'healthy',false,'Orange cat wandering.',NULL,'2026-03-20'),
(1,3,'Apartment entrance','20007','DC',38.9060,-77.0630,'healthy',false,'Eating leftovers.',NULL,'2026-03-21'),

(2,1,'Behind convenience store','20002','DC',38.9065,-76.9940,'injured',true,'Still limping slightly.',NULL,'2026-03-22'),
(2,2,'Parking garage entrance','20002','DC',38.9070,-76.9935,'injured',true,'Stayed under car.',NULL,'2026-03-23'),

(3,3,'Park entrance path','20008','DC',38.9385,-77.0510,'healthy',false,'Friendly dog sniffing ground.',NULL,'2026-03-24'),
(3,2,'Near jogging trail','20008','DC',38.9390,-77.0500,'healthy',false,'Walking calmly.',NULL,'2026-03-25'),

(4,1,'Metro bus stop','20005','DC',38.9040,-77.0385,'sick',true,'Dog looked tired.',NULL,'2026-03-26'),
(4,3,'Street corner','20005','DC',38.9045,-77.0395,'sick',true,'Panting heavily.',NULL,'2026-03-27'),

(5,2,'Restaurant back alley','20003','DC',38.8815,-76.9960,'healthy',false,'Searching for scraps.',NULL,'2026-03-28'),
(5,1,'Trash area behind shops','20003','DC',38.8820,-76.9955,'healthy',false,'Quick raccoon sighting.',NULL,'2026-03-29'),

(6,3,'Near office building bins','20004','DC',38.8958,-77.0360,'unknown',false,'Only seen briefly.',NULL,'2026-03-30'),
(6,2,'Side street trash cans','20004','DC',38.8960,-77.0355,'unknown',false,'Fast movement.',NULL,'2026-03-31');

COMMIT;