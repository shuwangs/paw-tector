# paw-tector
Paw-tector is a community-based web application that allows volunteers to record stray animal sightings and track their health status over time.
The goal is to support local shelters and TNR (Trap-Neuter-Return) programs by identifying frequently sighted animals and hotspot areas.

## Demo will be here.

## 🚀 Features

### 🐾 Track Animals

- Create a new tracked animal
    
- Attach an **initial sighting** when creating an animal
    
- Edit and update animal information
    
- Delete tracked animals
    
### 👀 Sightings

- Add sightings to **existing animals**
    
- Track when and where animals were seen
    
- Record health status and notes
    
- View a full **sighting timeline** for each animal
    
### 🔎 Search & Filters

Users can search animal records using:

- substring search (nickname, etc.)
    
- animal type
    
- health status
    
- date range


Search results support **pagination**.

### 📊 User Statistics

Each volunteer can view:

- number of animals tracked
    
- number of sightings recorded
    
- number of locations contributed
    

### 🐱 Animal Profile Page

Each animal has a dedicated profile page displaying:

- animal information
    
- sighting history
    
- related statistics

## 🛠 Tech Stack

- Frontend: React, JavaScript, CSS
- Backend: Node.js, Express
- Database: PostgreSQL
- Other: REST API, useReducer state management

- Pagination queries

## Architecture Design

### 🗂 Database design (ERD)
Paw-tector uses a relational PostgreSQL database to model users, animals, and community sightings.
![ERD](./docs/erd.png)

## How to start
### Clone respository
```bash
git clone https://github.com/shuwangs/paw-tector.git
cd pawtector
```

### Install dependencies
```bash
# backend dependencies
cd server
npm install

# frontend dependencies
cd client
npm install

```

### Setup database
Make Sure you have postgresql installed. If not: 
```bash
brew install postgresql
brew services start postgresql
```

You can initilize the database below:
#### Run schema + seed manually
```bash
# Drop database if it exists
dropdb --if-exists pawtector

# Create database
createdb pawtector

# Create schema and tables
psql -d pawtector -f server/db/schema.sql

# Insert seed data
psql -d pawtector -f server/db/seed.sql
```

### Environment Variable
Create a .env file inside the `server` folder:
```bash
DATABASE_URL=postgresql://localhost:5432/pawtector
PORT=3001
```

### Start the App
```bash
# Start backend
cd server
npm install
npm run dev

# Start frontend
cd ../client
npm install
npm run dev
```

## 🧪 Future Improvements

Potential future features:

- user authentication

- map visualization of sightings

- image upload for animals

- automated testing

- rate limiting

## 📚 What I Learned

This project helped me practice:

- building a full-stack PERN application

- designing RESTful APIs

- structuring React apps using Context API

- managing relational data with PostgreSQL

- implementing search + pagination


## ⭐ Acknowledgements

Built as part of the Techtonica Full-Stack Software Engineering Program.