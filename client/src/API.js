import { Film } from "./filmLibrary";

const SERVER_URL = "http://localhost:3001";

const getAllFilms = async () => {
  try{
    const response = await fetch(SERVER_URL + '/api/films');
    const filmJson = await response.json();
    if(response.ok) {
      return filmJson.map(f => new Film(f.id,f.title, f.favorite, f.watchDate, f.rating));
    }
    else
      throw filmJson;
  }catch(err){
    throw new Error(err.msg);
  }
};

const getFilterFilms = async (filterId) => {
  try{
    const response = await fetch(SERVER_URL + `/api/films/filter/${filterId}`);
    const filmJson = await response.json();
    if(response.ok) {
      return filmJson.map(f => new Film(f.id,f.title, f.favorite, f.watchDate, f.rating));
    }
    else
      throw filmJson;
  } catch(err){
    throw new Error(err.msg);
  }
};


const addFilm = async (film) => {
  try{
    film.watchDate = film.watchDate ? film.watchDate.format('YYYY/MM/DD') : "";
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
    throw new Error(err.msg);
  }
};


const updateFilm = async (film) => {
  try{
    const response = await fetch(SERVER_URL + `/api/films/${film.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({newTitle: film.title, newFavorite: film.favorite, newWatchDate: film.watchDate ? film.watchDate.format('YYYY/MM/DD') : "", newRating: film.rating})
    });
    if(!response.ok) {
      const errMessage = await response.json(); 
      throw errMessage;
    }
    else return null;
  } catch(err) {
    throw new Error(err.msg);
  }
};


const updateFavorite = async (film) => {
  try{
    const response = await fetch(SERVER_URL + `/api/films/${film.id}/favorite`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({favorite: film.favorite})
    });
    if(!response.ok) {
      const errMessage = await response.json(); 
      throw errMessage;
    }
    else return null;
  } catch(err) {
    throw new Error(err.msg);
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
    throw new Error(err.msg);
  }
};


const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user; 
  }
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}




const API = {getAllFilms, getFilterFilms, addFilm, deleteFilm, updateFilm, updateFavorite, getUserInfo,logIn,logOut};
export default API;
