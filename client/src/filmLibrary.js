import dayjs from 'dayjs'

function Film(id, title, isFavorite = false, watchDate = '', rating = 0) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    this.watchDate = watchDate && dayjs(watchDate);
}

function FilmLibrary() {
    this.list = [];

    this.init= () => {
        this.list.push( new Film(1, "Pulp Fiction", true, "2022-04-10", 5));
        this.list.push ( new Film(2, "21 Grams", true, "2022-03-17", 4));
        this.list.push ( new Film(3, "Star Wars", false));
        this.list.push ( new Film(4, "Matrix", true));
        this.list.push ( new Film(5, "Shrek", false, "2021-03-21", 3));
        }
  
    this.getAll = () => {
        return this.list;
    }

}

export {FilmLibrary, Film};