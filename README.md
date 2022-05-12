# BigLab 2 - Class: 2022 [WA1-AJ/WA1-KZ]

## Team name: CyberMinds

Team members:
* s295555 ZANFARDINO DIEGO
* s301587 TROVERO FABIO  
* s301132 ZAMPARUTTI ALESSANDRO

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering BigLabs and exam sessions.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

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
        "watchdate" : "2022-03-11",
        "rating" : 5
    },
    {
        "id" : 2,
        "title" : "21 Grams",
        "favorite" : false,
        "watchdate" : "2022-03-17",
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
        "watchdate" : "2022-03-11",
        "rating" : 5
    },
    {
        "id" : 2,
        "title" : "21 Grams",
        "favorite" : true,
        "watchdate" : "2022-03-17",
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
        "watchdate" : "2022-03-17",
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
Request body: _watchdate_ can be null
```
    {
        "title" : "a new film",
        "favorite" : false,
        "watchdate" : "2021-02-15",
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
        "newWatchdate" : "2021-02-20",
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


