# Film Library

## Registered Users

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |
| testuser@polito.it | password | Frank |

## List of APIs offered by the server

### __Retrieve all films__

GET `/api/films`

Description: Get all the films available in the database

Request URL: `http://localhost:port/api/films`
Request body: _None_

Successfull Response Header: `200 OK` (success)
Response body:
```
[
    {
        "id" : 1,
        "title" : "Pulp Fiction",
        "favorite" : true,
        "watchDate" : "2022-03-11",
        "rating" : 5
    },
    {
        "id" : 2,
        "title" : "21 Grams",
        "favorite" : false,
        "watchDate" : "2022-03-17",
        "rating" : 4
    },
    ...
]
```
Error Response Header: 
- `500 Internal Server Error` (generic error)


### __Retrieve a List of filtered films__

GET `/api/films/filter/:filterid`

Description: Get all the films available in the database that fulfill a given filter identified by its filterID
             filterid can be [`all`, `favorites`, `seen-last-month`, `unseen`, `best-rated`]  
Request URL: `http://localhost:port/api/films/filter/filter-favorite`
Request body: _None_

Successfull Response Header: `200 OK` (success)
Response body:
```
[
    {
        "id" : 1,
        "title" : "Pulp Fiction",
        "favorite" : true,
        "watchDate" : "2022-03-11",
        "rating" : 5
    },
    {
        "id" : 2,
        "title" : "21 Grams",
        "favorite" : true,
        "watchDate" : "2022-03-17",
        "rating" : 4
    },
    ...
]
```
Error Response Header: 
- `422 Unprocessable Entity` (validation of filterid failed)
- `500 Internal Server Error` (generic error)


### __Retrieve a film by ID__

GET `/api/films/:filmid`

Description: Get a film identified by its id

Request URL: `http://localhost:port/api/films/2`
Request body: _None_

Successfull Response Header: `200 OK` (success)
Response body:
```
    {
        "id" : 2,
        "title" : "21 Grams",
        "favorite" : true,
        "watchDate" : "2022-03-17",
        "rating" : 4
    }
```
Error Response Header: 
- `404 Not Found` (no film associated to filmid)
- `422 Unprocessable Entity` (validation of filmid failed)
- `500 Internal Server Error` (generic error)


### __Create a new film__

POST `/api/films`

Description: Create a new film

Request URL: `http://localhost:port/api/films`
Request body: _watchDate_ can be null
```
    {
        "id" : 1
        "title" : "a new film",
        "favorite" : false,
        "watchDate" : "2021-02-15",
        "rating" : 3
    }
```

Successfull Response Header: `201 Created` (success)
Response body: _None_

Error Response Header: 
- `422 Unprocessable Entity` (validation of request body failed)
- `503 Service Unavailable` (generic error)


### __Update an existing film__

PUT `/api/films/:filmid`

Description: Update an existing film

Request URL: `http://localhost:port/api/films/2`
Request body:
```
    {
        "newTitle" : "different title",
        "newFavorite" : true,
        "newWatchDate" : "2021-02-20",
        "newRating" : 4
    }
```

Successfull Response Header: `200 OK` (success)
Response body: _None_

Error Response Header: 
- `404 Not Found` (no film associated to filmid)
- `422 Unprocessable Entity` (validation of request body or filmid failed)
- `503 Service Unavailable` (generic error)


### __Mark a film as favorite__

PUT `/api/films/:filmid/favorite`

Description: Mark as favorite/unfavorite an existing film

Request URL: `http://localhost:port/api/films/3/favorite`
Request body:
```
    {
        "favorite" : false
    }
```

Successfull Response Header: `200 OK` (success)
Response body: _None_

Error Response Header: 
- `404 Not Found` (no film associated to filmid)
- `422 Unprocessable Entity` (validation of request body or filmid failed)
- `503 Service Unavailable` (generic error)


### __Delete a film__

DELETE `/api/films/:filmid`

Description: Delete an existing film

Request URL: `http://localhost:port/api/films/1`
Request body: _None_

Successfull Response Header: `204 No Content` (success)
Response body: _None_

Error Response Header: 
- `404 Not Found` (no film associated to filmid)
- `422 Unprocessable Entity` (validation of filmid failed)
- `503 Service Unavailable` (generic error)


