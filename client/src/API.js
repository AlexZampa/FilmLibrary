import { Film } from "./filmLibrary";

const SERVER_URL = "http://localhost:3001";

const getAllFilms = async () => {
  try{
    const response = await fetch(SERVER_URL + '/api/films');
    const filmJson = await response.json();
    if(response.ok) {
      return filmJson.map(f => new Film(f.id,f.title, f.favorite, f.watchdate, f.rating));
    }
    else
      throw filmJson;
  }catch(err){
    throw new Error('Cannot communicate with the server');
  }
};

const getFilterFilms = async (filterId) => {
  try{
    const response = await fetch(SERVER_URL + `/api/films/filter/${filterId}`);
    const filmJson = await response.json();
    if(response.ok) {
      return filmJson.map(f => new Film(f.id,f.title, f.favorite, f.watchdate, f.rating));
    }
    else
      throw filmJson;
  } catch(err){
    throw new Error('Cannot communicate with the server');
  }
};



const addFilm = async (film) => {
  try{

    film.watchDate = film.watchDate.format('YYYY/MM/DD');
    const response = await fetch(SERVER_URL + '/api/films', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(film)
    });
    if(!response.ok) {
      const errMessage = await response.json(); 
      throw errMessage;
    }
    else return null;
  } catch(err){
    throw new Error('Cannot communicate with the server');
  }
};


const updateFilm = async (film) => {
  try{
    const response = await fetch(SERVER_URL + `/api/films/${film.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newTitle: film.title, newFavorite: film.favorite, newWatchDate: film.watchDate, newRating: film.rating})
    });
    if(!response.ok) {
      const errMessage = await response.json(); 
      throw errMessage;
    }
    else return null;
  } catch(err) {
    throw new Error('Cannot communicate with the server');
  }
};



const deleteFilm = async (filmID) => {
  try{
    const response = await fetch(SERVER_URL + `/api/films/${filmID}`, { method: 'DELETE' });
    if(!response.ok) {
      const errMessage = await response.json(); 
      throw errMessage;
    }
    return null;
  }catch(err){
    throw new Error('Cannot communicate with the server');
  }
};



const API = {getAllFilms, getFilterFilms, addFilm, deleteFilm, updateFilm};
export default API;
