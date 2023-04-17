# Task 3: Authentication & Authorization

Implement authentication and authorization features for a simple backend through a REST API. 

## Report

* [Report](Report/report.md)

## Running

1. `docker-compose up --build -d`
2. AuthServer sits on port 4000 
3. Post/Admin server sits on port 3000


## End points

**Auth Server: Port 4000**  

| End Point | Type | Description |
| ----------- |-------------| ----------- |
| /users | GET | Returns all users |
| /register | POST | Creates a new user |
| /login | POST | Returns a JWT token and refresh token after login |
| /token | POST | Returns a new token |
| /logout | DELETE | Deletes the refresh token |  

**Server: Port 3000**  

| End Point | Type | Description |
| ----------- |-------------| ----------- |
| /posts | GET | Returns all posts of logged in user |
| /admin | GET | Admin Page for role: admin |