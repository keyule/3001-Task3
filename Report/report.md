# TIC3001 Task 3
- Name: Ke Yule
- Student Number: A0211495H E0493826
- Github: https://github.com/keyule/3001-Task3

*View the markdown version for better formatting at:*   
*https://github.com/keyule/3001-Task3/blob/main/Report/report.md* 

## Task 3 - Authentication & Authorization

> *Note: I pretty much just copied the youtube tutorial provided, but added a few things*

### Set up

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

**Other Information**
An Admin account already exists:
``` json
  {
    username: "test",
    password: "$2b$10$ogIIWcYWXJ2h19EDa0tkh.YT9hqFEuh9Y0mOnh6gljNxpC.9ZnqKS",
    role: "admin"
  }
```
There are two posts created: 
``` javascript
const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]
```

### Demo

**Visiting /posts without logging in or without a token**
``` 
GET http://localhost:3000/posts 
```
``` HTTP
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 12
ETag: W/"c-dAuDFQrdjS3hezqxDTNgW7AOlYk"
Date: Mon, 17 Apr 2023 00:41:36 GMT
Connection: close

Unauthorized
```

**Visiting /admin without logging in or without a token**
``` 
GET http://localhost:3000/admin 
```
``` HTTP
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 12
ETag: W/"c-dAuDFQrdjS3hezqxDTNgW7AOlYk"
Date: Mon, 17 Apr 2023 00:50:04 GMT
Connection: close

Unauthorized
```

**Registering**
``` json
POST http://localhost:4000/register 
Content-Type: application/json
{
    "username": "Jim", "password": "password"
}
```
``` HTTP
HTTP/1.1 201 Created
X-Powered-By: Express
Date: Mon, 17 Apr 2023 00:57:17 GMT
Connection: close
Content-Length: 0
```

**Logging in**
``` json
POST http://localhost:4000/login 
Content-Type: application/json
{
    "username": "Jim", "password": "password"
}
```
``` HTTP
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 344
ETag: W/"158-FnS38v2wtrQ3cDakn8BDlXr5U64"
Date: Mon, 17 Apr 2023 00:59:06 GMT
Connection: close

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjgxNjkzMTQ2LCJleHAiOjE2ODE2OTMyMDZ9.SWBwp79hrdEBVRuRlYG78-DhTeu98D7V2BC6Ooj_pfk",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjgxNjkzMTQ2fQ.RQOcov3Zcn5FlOoaD4YzT--g00anz6dTiSiSAypSdJo"
}
```

**Visiting /posts after login**
``` json
GET http://localhost:3000/posts 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjgxNjkzMTQ2LCJleHAiOjE2ODE2OTMyMDZ9.SWBwp79hrdEBVRuRlYG78-DhTeu98D7V2BC6Ooj_pfk
```
``` HTTP
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37
ETag: W/"25-+oLv3OVWqMVRmz334tj9PEFk5V4"
Date: Mon, 17 Apr 2023 01:00:02 GMT
Connection: close

[
  {
    "username": "Jim",
    "title": "Post 2"
  }
]
```

**Visiting /admin after login**
``` json
GET http://localhost:3000/admin 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjgxNjkzMTQ2LCJleHAiOjE2ODE2OTMyMDZ9.SWBwp79hrdEBVRuRlYG78-DhTeu98D7V2BC6Ooj_pfk
```
``` HTTP
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 9
ETag: W/"9-PatfYBLj4Um1qTm5zrukoLhNyPU"
Date: Mon, 17 Apr 2023 01:00:14 GMT
Connection: close

Forbidden
```

**Visting /posts after logging in as admin (Returns ALL posts)**
``` json
GET http://localhost:3000/posts 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MTY5MzQ2NiwiZXhwIjoxNjgxNjkzNTI2fQ.psxWvWym47ld3MLMdez3MAYgFlO8RON-H-QvqHopmhc
```
``` HTTP
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 74
ETag: W/"4a-1R4wY2kF/sIFyvoxeh6FQWeGVfI"
Date: Mon, 17 Apr 2023 01:04:44 GMT
Connection: close

[
  {
    "username": "Kyle",
    "title": "Post 1"
  },
  {
    "username": "Jim",
    "title": "Post 2"
  }
]
```

**Visting /admin after logging in as admin**
``` json
GET http://localhost:3000/admin 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MTY5MzQ2NiwiZXhwIjoxNjgxNjkzNTI2fQ.psxWvWym47ld3MLMdez3MAYgFlO8RON-H-QvqHopmhc
```
``` HTTP
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 10
ETag: W/"a-3WyjDh8DbzNxVPewAMCEfnC3Qfc"
Date: Mon, 17 Apr 2023 01:04:49 GMT
Connection: close

Admin Page
```


## Appendix

### Other Requests

**Refreshing token**
``` json
POST http://localhost:4000/token 
Content-Type: application/json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwicm9sZSI6ImJhc2ljIiwiaWF0IjoxNjgxNjkzMTQ2fQ.RQOcov3Zcn5FlOoaD4YzT--g00anz6dTiSiSAypSdJo"
}
```
``` HTTP
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 163
ETag: W/"a3-zbNfK/Rz4efzxMqO1Va4nrvk1Jo"
Date: Mon, 17 Apr 2023 01:08:40 GMT
Connection: close

{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwiaWF0IjoxNjgxNjkzNzIwLCJleHAiOjE2ODE2OTM3ODB9.AAwCKiz9piCgYv6WBNELEXTppzTNaTNFyrNSbVRtRM4"
}
```

**Logging out (Deleting refresh token)**
```json
DELETE http://localhost:4000/logout 
Content-Type: application/json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltIiwiaWF0IjoxNjgxNTkyMDI0fQ.XvJZ1lcR3cXV5A4vXdZa9Q6riEmqCY2louocp7qZWzg"
}
```
``` HTTP
HTTP/1.1 204 No Content
X-Powered-By: Express
ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
Date: Mon, 17 Apr 2023 01:10:03 GMT
Connection: close
```

### docker-compose.yml
``` yml
version: '3.9'
services:
  server:
    restart: on-failure
    build: ./server
    ports:
      - '3000:3000'
  authserver:
    restart: on-failure
    build: ./authserver
    ports:
      - '4000:4000'
```
