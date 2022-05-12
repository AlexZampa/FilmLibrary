'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator');
const expressValidator = require('express-validator');
const FilmDAO = require('./FilmDAO');

const PORT = 3001;
const app = new express();
app.use(express.json());

app.post('/api/films',
    [check("title").isString(), check("favorite").isBoolean(), check("watchdate").isDate()], check("rating").isInt(), 
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({ msg: "validation of request body failed", errors : errors.array()});
            }
            const result = await FilmDAO.addFilm(req.body.title, req.body.favorite, req.body.watchdate, req.body.rating, 1);
            return res.status(201).end();
        } catch (err) {
            console.log(err);
            return res.status(503).end();
        }
    }
);

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));