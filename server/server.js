'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator');
const expressValidator = require('express-validator');
const FilmDAO = require('./FilmDAO');
const {filters} = require('./Film');

const PORT = 3001;
const app = new express();
app.use(express.json());


app.post('/api/films',
    [check("title").isString(), check("favorite").isBoolean(), check("watchdate").isDate(), check("rating").isInt()],
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

//Retrieve a film by ID
app.get('/api/films/:filmid',
    async (req, res) => {
        try {
            if(Number.isNaN(Number(req.params.filmid))){
                return res.status(422).json({msg:"validation of filmid failed"});
            }
            const result = await FilmDAO.getFilm(req.params.filmid);
            delete result.id;
            result.watchDate ? result.watchDate=result.watchDate.format("YYYY-MM-DD") : undefined;
            return res.status(200).json(result);
            }
         catch (err) {
            console.log(err);
            switch (err.err) {
                case 404:
                    return res.status(500).json({msg: err.msg});
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
            films.forEach(f => f.watchDate ? f.watchDate = f.watchDate.format('YYYY-MM-DD') : undefined);
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
            if(filters[req.params.filterid]){
                const films = await FilmDAO.getAllFilm();
                const filteredFilms = filters[req.params.filterid](films);
                filteredFilms.forEach(f => f.watchDate ? f.watchDate = f.watchDate.format('YYYY-MM-DD') : undefined);
                return res.status(200).json(filteredFilms);
            }
            return res.status(422).json({msg : "invalid filterid"});
        } catch (err) {
            console.log(err);
            return res.status(500).end();
        }
    }
);


//UPDATE FILM

app.put('/api/films/:filmid',[check("newTitle").exists().isString(), check("newFavorite").exists().isBoolean(), check("newWatchdate").exists().isDate(), check("newRating").exists().isInt()], async (req, res) => {
    try {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({ msg: "validation of request body failed", errors : errors.array()});
            }
        const id = req.params.filmid;
        const filmtoUpdate = req.body;
        console.log(id);
        console.log(filmtoUpdate);

        await FilmDAO.updateFilm(filmtoUpdate,id);
        res.status(200).end();
      }
      catch(err) {
        console.error(err);
        res.status(503).json({error: "Database error while updating."});
      }
    
  });

  //UPDATE FAVORITE

  app.put('/api/films/:filmid/favorite',[check("favorite").exists().isBoolean()], async (req, res) => {
      try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ msg: "validation of request body failed", errors : errors.array()});
        }
        const id = req.params.filmid;
        const fav = req.body.favorite;
        await FilmDAO.updateFilmfav(id,fav);
        res.status(200).end();
      }
      catch(err) {
        console.error(err);
        res.status(503).json({error: "Database error while updating."});
      }
  });

  //DELETE FILM

  app.delete('/api/films/:filmid', async (req, res) => {
    const id = req.params.filmid;
        try {
        await FilmDAO.deleteFilm(id);
        res.status(200).end();
      }
      catch(err) {
        console.error(err);
        res.status(503).json({error: "Database error while updating."});
      }
    
  });



app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));