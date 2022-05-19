import './App.css';
import {FilmLibrary, Film} from './filmLibrary'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultRoute, FilmRoute, EditRoute, FilmPage } from './components/filmRoutes';
import { useState } from 'react';


function App() {
  const [films, setFilms] = useState([]);
  const [back, setBack] = useState("/");


  const updateFilm = (film) => {
    setFilms(oldFilms => {
      return oldFilms.map(f => {
        if(film.id === f.id)
          return new Film(film.id, film.title, film.favorite, film.watchDate, film.rating);
        else 
          return f;
      });
    });
  };

  const deleteFilm = (filmID) => {
      setFilms((films) => films.filter(f => f.id !== filmID));
  };

  const addFilm = (film) => {
      setFilms((oldFilms) => [...oldFilms, film]);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <FilmRoute films={films} deleteFilm={deleteFilm}/> } >
          <Route index element={ <FilmPage setFilms={setFilms} films={films} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack}/> } />
        </Route>
        <Route path='*' element={ <DefaultRoute/> } />
        <Route path="/add" element={ <EditRoute films={films} addFilm={addFilm} updateFilm={updateFilm} back={back}/> } />
        <Route path="/edit" element={ <EditRoute updateFilm={updateFilm} addFilm={addFilm} back={back}/> } />
        <Route path='/filter' element={ <FilmRoute films={films} deleteFilm={deleteFilm} />}>
          <Route index element={<h2>Please, specify a filter</h2>}/>
          <Route path=':filterid' element={ <FilmPage films={films} setFilms={setFilms} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack}/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
