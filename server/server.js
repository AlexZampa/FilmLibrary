'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator');
const expressValidator = require('express-validator');
const FilmDAO = require('./FilmDAO');
const { filters } = require('./Film');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const userDao = require('./UserDAO');

const PORT = 3001;
const app = new express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(cors(corsOptions));

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await userDao.getUser(username, password)
    if(!user)
      return cb(null, false, 'Incorrect username or password.');
      
    return cb(null, user);
  }));
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (user, cb) { // this user is id + email + name
    return cb(null, user);
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
  });
  
  const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({error: 'Not authorized'});
  }
  
  app.use(session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.authenticate('session'));
  
  

//CREATE FILM
app.post('/api/films',
    [check('id').isInt({ min: 1 }), 
    check("title").isString(), 
    check("favorite").isBoolean(), 
    check("watchDate").optional({checkFalsy: true}).isDate(), 
    check("rating").isInt(),isLoggedIn],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(422).json({ msg: "film data invalid" });
            }
            const result = await FilmDAO.addFilm(req.body.id, req.body.title, req.body.favorite, req.body.watchDate, req.body.rating, 1);
            return res.status(201).end();
        } catch (err) {
            console.log(err);
            if (err.err === 422) {
                return res.status(422).json({ msg: err.msg });
            }
            return res.status(503).end();
        }
    }
);

//GET FILM BY ID
app.get('/api/films/:filmid', [check('filmid').isInt({ min: 1 }),isLoggedIn],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(422).json({ msg: "film data invalid" });
            }
            const result = await FilmDAO.getFilm(req.params.filmid, 1);
            return res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
            switch (err.err) {
                case 404:
                    return res.status(404).json({ msg: err.msg });
                default:
                    return res.status(500).end();
            }
        }
    }
);

// GET ALL FILMS
app.get('/api/films',isLoggedIn,
    async (req, res) => {
        try {
            const films = await FilmDAO.getAllFilm(1);
            films.forEach(f => f.watchDate ? f.watchDate = f.watchDate.format('YYYY/MM/DD') : undefined);
            return res.status(200).json(films);
        } catch (err) {
            console.log(err);
            return res.status(500).end();
        }
    }
);

// GET FILTERED FILMS
app.get('/api/films/filter/:filterid',isLoggedIn,
    async (req, res) => {
        try {
            if (filters[req.params.filterid]) {
                const films = await FilmDAO.getAllFilm(1);
                const filteredFilms = filters[req.params.filterid](films);
                filteredFilms.forEach(f => f.watchDate ? f.watchDate = f.watchDate.format('YYYY-MM-DD') : undefined);
                return res.status(200).json(filteredFilms);
            }
            return res.status(422).json({ msg: "invalid filter" });
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
    check("newWatchdate").optional({checkFalsy: true}).isDate(),
    check("newRating").exists().isInt(),isLoggedIn],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ msg: "film data invalid" });
            }
            const id = req.params.filmid;
            const filmtoUpdate = req.body;
            
            await FilmDAO.updateFilm(filmtoUpdate, id, 1);
            return res.status(200).end();
        }
        catch (err) {
            console.error(err);
            switch (err.err) {
                case 404:
                    return res.status(400).json({ msg: err.msg });
                default:
                    return res.status(500).end();
            }
        }
    });


//UPDATE FAVORITE
app.put('/api/films/:filmid/favorite', [
    check('filmid').isInt({ min: 1 }),
    check("favorite").exists().isBoolean(), isLoggedIn],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ msg: "film data invalid" });
            }
            const id = req.params.filmid;
            const fav = req.body.favorite;
            await FilmDAO.updateFilmfav(id, fav, 1);
            res.status(200).end();
        }
        catch (err) {
            console.error(err);
            switch (err.err) {
                case 404:
                    return res.status(400).json({ msg: err.msg });
                default:
                    return res.status(500).end();
            }
        }
    });


//DELETE FILM
app.delete('/api/films/:filmid', [check('filmid').isInt({ min: 1 }),isLoggedIn],
    async (req, res) => {
        const id = req.params.filmid;
        try {
            const result = await FilmDAO.getFilm(id, 1);
            await FilmDAO.deleteFilm(id, 1);
            res.status(204).end();
        }
        catch (err) {
            console.error(err);
            switch (err.err) {
                case 404:
                    return res.status(404).json({ msg: err.msg });
                default:
                    return res.status(500).end();
            }
        }

    });

//API ON USERLOGIN 
app.post('/api/sessions', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err)
        return next(err);
        if (!user) {
          // display wrong login messages
          return res.status(401).send(info);
        }
        // success, perform the login
        req.login(user, (err) => {
          if (err)
            return next(err);
          
          // req.user contains the authenticated user, we send all the user info back
          return res.status(201).json(req.user);
        });
    })(req, res, next);
  });



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));