'use strict';

const dayjs = require('dayjs');

function Film(id, title, isFavorite = false, watchDate = '', rating = 0) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    this.watchDate = watchDate && dayjs(watchDate);
}

const filters = {
                 "all" : (films) => { return films }, 
                 "favorites" : (films) => { return films.filter(f => f.favorite); }, 
                 "best-rated" : (films) => { return films.filter(f => f.rating === 5); },
                 "seen-last-month" : (films) => { return films.filter(f => f.watchDate !== '' && f.watchDate.isAfter( dayjs().subtract(30, 'day'))); },
                 "unseen" : (films) => { return films.filter(f => f.watchDate === ''); },
                };

module.exports = {Film, filters};