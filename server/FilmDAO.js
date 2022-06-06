'use strict';

const {Film} = require('./Film');
const DBmanager = require('./DBmanager');

const db = new DBmanager();


exports.addFilm = async (id, title, favorite, watchdate, rating, user) => {
    try{
        let sql = "SELECT * FROM films f WHERE f.id=?";
        let result = await db.get(sql, [id], true);
        console.log(result)
        if(result){
            throw {err: 422, msg: "film ID already exists"};
        }
        sql = "INSERT INTO films (id, title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?, ?)"
        result = await db.query(sql, [id, title, favorite, watchdate ? watchdate : null, rating, user]);
        return result;
    } catch(err){
        throw err;
    }
};

exports.getAllFilm = async (user) => {
    try{
        const sql = "SELECT * FROM films WHERE user = ?";
        const res = await db.get(sql, [user]);
        return res.map(r => new Film(r.id, r.title, r.favorite, r.watchdate ? r.watchdate : undefined, r.rating ? r.rating : 0));
    } catch(err){
        throw err;
    }
};
    

exports.getFilm = async (id, user) => {
    try{
        const sql = "SELECT * FROM films f WHERE f.id=? AND user = ?"
        const result = await db.get(sql, [id, user], true);
        if(!result){
            throw {err: 404, msg: "no film associated to filmid"}
        }
        return new Film(result.id, result.title, result.favorite, result.watchdate ? result.watchdate : undefined, result.rating ? result.rating : 0);
    } catch(err){
        throw err;
    }
};

// update an existing film
exports.updateFilm = async (film, id, user) => {
    try {
        await this.getFilm(id, user);
        
    } catch (err) {
        throw {err:404, msg: 'Film ID already Exist'};
    }
    try{
        const sql = 'UPDATE films SET title=?, favorite=?, watchdate=?, rating = ? WHERE id=? AND user = ?';
        db.query(sql, [film.newTitle, film.newFavorite, film.newWatchDate ? film.newWatchDate : null, film.newRating, id, user]);
    }
    catch(err){
        throw err;
    }
  };


  //update status
  exports.updateFilmfav = async (id, fav, user) => {
    try {
        await this.getFilm(id, user);
    } catch (err) {
        throw err;
    }
    try{
        const sql = 'UPDATE films SET favorite=? WHERE id = ? AND user = ?';
        db.query(sql, [fav, id, user])
    }
    catch(err){
        throw err;
    }
  };
  
  
// delete an existing film
exports.deleteFilm = async (filmid, user) => {
    try{
        const sql = 'DELETE FROM films WHERE id=? AND user = ?';
        db.query(sql, [filmid, user]);
    }
    catch(err){
        throw err;
    }
};
