# TIC3001 Task 3
- Name: Ke Yule
- Student Number: A0211495H E0493826
- Github: https://github.com/keyule/3001-Task3

*View the markdown version for better formatting at:*   
*https://github.com/keyule/3001-Task3/blob/main/Report/report.md* 

## Task 3 - Authentication & Authorization

> *Note: I basically just copied the youtube tutorial provided, but added a few things*

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

