1. the backend:
- [X] db schema
- [X] seed.sql
- [X] get /api/sightings
- [X] db backend connection
- [X] test with postman
  
2. discover page
- [X] fetch /api/sightings
- [X] display it with .map():  nickname, animal type, address, health_status / need_help, sighted_at

3. My record page
- [ ] fetch users, choose who users.
- [X] fetch /api/users/1/sightings: GET /api/users/1/sightings
- [X] add sightings flow: if no animal display add new Animal, if animallist is not empty ask new add animal or and sightings for existing animals 
- [X] add sighting form
- [X] Post to db /api/users/1/sightings
- [X] update UI list
- [X] delete animal record
- [X] update animal record

3.2 individual  profile
- [ ] count of how many times each individual has been sighted
- [ ] first sighting date
- [ ] most recent sighting date

4. Use Context 
- [X] Current User Context
  - [X] state: currentUser（{ id: 1, user_name: "Tester1" } ）
  - [X] My Records take current user id from context, like  ChooseUserPage：GET /api/users
  - [X] click → setCurrentUser
- [X] discovery page context 

5. testing
- [ ] add testing
- [ ] frontend form validation
- [ ] required fields
- [ ] email type validation
- [ ] date/time validation
- [X] backend request validation
- [ ] invalid user id
- [X] invalid individual id
- [ ] invalid health status
- [ ] missing required fields
- [ ] show user-visible error messages in UI
- [ ] show empty/loading/error states for fetches

6. optional
- [ ] Let users search for sightings within a certain date range
- [ ] paging
- [ ] discovery map view
- [X] Home page stats  GET /api/stats
- [X] My record page count of my sightings