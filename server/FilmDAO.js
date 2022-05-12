'use strict';

const {Film} = require('./Film');
const DBmanager = require('./DBmanager');

const db = new DBmanager();

exports.addFilm = async (title, favorite, watchdate, rating, user) => {
    try{
        const sql = "INSERT INTO films (title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?)"
        const result = await db.query(sql, [title, favorite, watchdate, rating, user]);
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


