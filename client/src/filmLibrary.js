import dayjs from 'dayjs'

function Film(id, title, isFavorite = false, watchDate = '', rating = 0) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    this.watchDate = watchDate && dayjs(watchDate);
}


export {Film};