'use strict';

const {Film} = require('./Film');
const DBmanager = require('./DBmanager');

const db = new DBmanager();

exports.addFilm = async (id, title, favorite, watchdate, rating, user) => {
    try{
        let sql = "SELECT * FROM films f WHERE f.id=?"
        let result = await db.get(sql, [id], true);
        if(result){
            throw {err: 422, msg: "film already exists"};
        }
        sql = "INSERT INTO films (id, title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?, ?)"
        result = await db.query(sql, [id, title, favorite, watchdate, rating, user]);
        return result;
    } catch(err){
        throw err;
    }
};

exports.getAllFilm = async () => {
    try{
        const sql = "SELECT * FROM films";
        const res = await db.get(sql, []);
        return res.map(r => new Film(r.id, r.title, r.favorite, r.watchdate ? r.watchdate : undefined, r.rating ? r.rating : 0));
    } catch(err){
        throw err;
    }
};
    

exports.getFilm = async (id) => {
    try{
        const sql = "SELECT * FROM films f WHERE f.id=?"
        const result = await db.get(sql, [id], true);
        if(!result){
            throw {err: 404, msg: "no film associated to filmid"}
        }
        return new Film(result.id, result.title, result.favorite, result.watchdate ? result.watchdate : undefined, result.rating ? result.rating : 0);
    } catch(err){
        throw err;
    }
};

// update an existing film
exports.updateFilm = async (film, id) => {
    //check if film exists

    try {
        await this.getFilm(id);
        
    } catch (err) {
        throw err;
    }

    try{
        const sql = 'UPDATE films SET title=?, favorite=?, watchdate=DATE(?), rating = ? WHERE id=?';
        console.log(film.newTitle);

        db.query(sql, [film.newTitle, film.newFavorite, film.newWatchdate,film.newRating, id]);
    }
    catch(err){
        throw err;
    }
  };


  //update status
  exports.updateFilmfav = async (id,fav) => {
    //check if film exists

    try {
        await this.getFilm(id);
        
    } catch (err) {
        throw err;
    }

    try{
        const sql = 'UPDATE films SET favorite=? WHERE id=?';
        db.query(sql, [fav,id])
    }
    catch(err){
        throw err;
    }
  };
  
  
// delete an existing film
exports.deleteFilm = async (filmid) => {
    try{
        const sql = 'DELETE FROM films WHERE id=?';
        db.query(sql, [filmid]);
    }
    catch(err){
        throw err;
    }
};
