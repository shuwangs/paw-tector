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
- [] fetch users, choose who users.
- [X] fetch /api/users/1/sightings: GET /api/users/1/sightings
- [ ] add sightings flow: if no animal display add new Animal, if animallist is not empty ask new add animal or and sightings for existing animals 
- [ ] add sighting form
- [ ] Post to db /api/users/1/sightings
- [ ] update UI list
- [X] delete animal record
- [ ] update animal record

4. Use Context 
- [ ] Current User Context
  - [ ] state: currentUser（{ id: 1, user_name: "Tester1" } ）
  - [ ] My Records take current user id from context, like  ChooseUserPage：GET /api/users
  - [ ] click → setCurrentUser
- [ ] discovery page context 

5. optional
- [ ] paging
- [ ] discovery map view
- [ ] Home page stats  GET /api/stats
- [ ] My record page count of my sightings