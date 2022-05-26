import './App.css';
import { FilmLibrary, Film } from './filmLibrary'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultRoute, FilmRoute, EditRoute, FilmPage } from './components/filmRoutes';
import { useState } from 'react';
import API from './API';


function App() {
  const [films, setFilms] = useState([]);
  const [back, setBack] = useState("/");

  const getFilm = async (filterid) => {
    if (filterid) {
      const films = await API.getFilterFilms(filterid);
      setFilms(films);
    }
    else {
      const films = await API.getAllFilms();
      setFilms(films);
      console.log(films)
    }
  };

  const updateFilm = (film) => {
    setFilms(oldFilms => {
      return oldFilms.map(f => {
        if (film.id === f.id){
          const newFilm = new Film(film.id, film.title, film.favorite, film.watchDate, film.rating);
          newFilm.status = 'edited';
          return newFilm;
        }
        else
          return f;
      });
    });
    API.updateFilm(film).then(() => getFilm(back === "/" ? undefined : back)).catch((err) => console.log(err));
  };

  const deleteFilm = (filmID, filterid) => {
    setFilms((oldFilms) => {
      return oldFilms.map(f => {
        if(f.id === filmID)
          return {...f, status: 'deleted'};
        else
          return f;
      }) 
    });
    API.deleteFilm(filmID).then(() => getFilm(filterid)).catch((err) => console.log(err));
  };

  const addFilm = (film) => {
    film.status = 'added';
    setFilms((oldFilms) => [...oldFilms, film]);
    API.addFilm(film).catch((err) => console.log(err));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FilmRoute films={films} deleteFilm={deleteFilm} />} >
          <Route index element={<FilmPage getFilm={getFilm} setFilms={setFilms} films={films} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} />} />
        </Route>
        <Route path='*' element={<DefaultRoute />} />
        <Route path="/add" element={<EditRoute films={films} addFilm={addFilm} updateFilm={updateFilm} back={back} />} />
        <Route path="/edit" element={<EditRoute updateFilm={updateFilm} addFilm={addFilm} back={back} />} />
        <Route path='/filter' element={<FilmRoute films={films} deleteFilm={deleteFilm} />}>
          <Route index element={<h2>Please, specify a filter</h2>} />
          <Route path=':filterid' element={<FilmPage getFilm={getFilm} films={films} setFilms={setFilms} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
