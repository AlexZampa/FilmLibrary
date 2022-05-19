import { Film } from "./filmLibrary";

const getAllFilms = async () => {
  const response = await fetch('http://localhost:3001/api/films');
  const filmJson = await response.json();
  if(response.ok) {
    return filmJson.map(f => new Film(f.id,f.title, f.favorite, f.watchdate, f.rating));
  }
  else
    throw filmJson;
};

const getFilterFilms = async (filterId) => {
  const response = await fetch(`http://localhost:3001/api/films/filter/${filterId}`);
  const filmJson = await response.json();
  if(response.ok) {
    return filmJson.map(f => new Film(f.id,f.title, f.favorite, f.watchdate, f.rating));
  }
  else
    throw filmJson;
};



const API = {getAllFilms, getFilterFilms};
export default API;
