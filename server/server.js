'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator');
const expressValidator = require('express-validator');
const FilmDAO = require('./FilmDAO');
const { filters } = require('./Film');
const cors = require('cors');

const PORT = 3001;
const app = new express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.post('/api/films',
    [check('id').isInt({ min: 1 }), check("title").isString(), check("favorite").isBoolean(), check("watchDate").isDate(), check("rating").isInt()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(422).json({ msg: "validation of request body failed", errors: errors.array() });
            }
            const result = await FilmDAO.addFilm(req.body.id, req.body.title, req.body.favorite, req.body.watchDate, req.body.rating, 1);
            res.status(201).end()
        } catch (err) {
            console.log(err);
            if (err.err === 422) {
                return res.status(422).send(err.msg);
            }
            return res.status(503).end();
        }
    }
);

//Retrieve a film by ID
app.get('/api/films/:filmid', [check('filmid').isInt({ min: 1 })],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(422).json({ msg: "validation of request failed", errors: errors.array() });
            }
            const result = await FilmDAO.getFilm(req.params.filmid);
            return res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
            switch (err.err) {
                case 404:
                    return res.status(404).json({ msg: err.msg });
                    break;
                default:
                    return res.status(500).end();
                    break;
            }
        }
    }
);


app.get('/api/films',
    async (req, res) => {
        try {
            const films = await FilmDAO.getAllFilm();
            films.forEach(f => f.watchDate ? f.watchDate = f.watchDate.format('YYYY/MM/DD') : undefined);
            return res.status(200).json(films);

        } catch (err) {
            console.log(err);
            return res.status(500).end();

        }
    }
);


app.get('/api/films/filter/:filterid',
    async (req, res) => {
        try {
            if (filters[req.params.filterid]) {
                const films = await FilmDAO.getAllFilm();
                const filteredFilms = filters[req.params.filterid](films);
                filteredFilms.forEach(f => f.watchDate ? f.watchDate = f.watchDate.format('YYYY-MM-DD') : undefined);
                return res.status(200).json(filteredFilms);
            }
            return res.status(422).json({ msg: "invalid filterid" });
        } catch (err) {
            console.log(err);
            return res.status(500).end();
        }
    }
);


//UPDATE FILM
app.put('/api/films/:filmid',
    [check('filmid').isInt({ min: 1 }),
    check("newTitle").exists().isString(),
    check("newFavorite").exists().isBoolean(),
    check("newWatchdate").optional().isDate(),
    check("newRating").exists().isInt()], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ msg: "validation of request body failed", errors: errors.array() });
            }
            const id = req.params.filmid;
            const filmtoUpdate = req.body;


            await FilmDAO.updateFilm(filmtoUpdate, id);
            res.status(200).end();
        }
        catch (err) {
            console.error(err);
            switch (err.err) {
                case 404:
                    return res.status(400).json({ msg: err.msg });
                    break;
                default:
                    return res.status(500).end();
                    break;
            }
        }

    });

//UPDATE FAVORITE
app.put('/api/films/:filmid/favorite', [check("favorite").exists().isBoolean()], async (req, res) => {
    try {
        if (Number.isNaN(Number(req.params.filmid))) {
            return res.status(422).json({ msg: "validation of filmid failed" });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "validation of request body failed", errors: errors.array() });
        }
        const id = req.params.filmid;
        const fav = req.body.favorite;
        await FilmDAO.updateFilmfav(id, fav);
        res.status(200).end();
    }
    catch (err) {
        console.error(err);
        switch (err.err) {
            case 404:
                return res.status(400).json({ msg: err.msg });
                break;
            default:
                return res.status(500).end();
                break;
        }
    }
});

//DELETE FILM
app.delete('/api/films/:filmid', [check('filmid').isInt({ min: 1 })],
    async (req, res) => {
        const id = req.params.filmid;
        try {
            const result = await FilmDAO.getFilm(id);
            await FilmDAO.deleteFilm(id);
            res.status(204).end();
        }
        catch (err) {
            console.error(err);
            switch (err.err) {
                case 404:
                    return res.status(404).json({ msg: err.msg });
                    break;
                default:
                    return res.status(500).end();
                    break;
            }
        }

    });



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));