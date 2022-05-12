'use strict';

const Film = require('./Film');
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
    


