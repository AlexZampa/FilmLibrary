'use strict';


const DBmanager = require('./DBmanager');

const db = new DBmanager();
const crypto = require('crypto');

const salt = 'provadisalt'

exports.getUser = async (email, password) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    try{
        let row = await db.get(sql, [email],true);
        if(!row){throw 422}

        const user = {id: row.id, username: row.email, name: row.name};
        crypto.scrypt(password, salt, 32, function(err, hashedPassword) {
          if (err) reject(err);
          if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
           {return false;} 
          else
          { 
              return user;
          }
        });

    }
    catch(err){
        throw err;
    }
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) { 
        reject(err); 
      }
      else if (row === undefined) { 
        resolve({error: 'User not found!'}); 
      }
      else {
        const user = {id: row.id, username: row.email, name: row.name};
        resolve(user);
      }
    });
  });
};