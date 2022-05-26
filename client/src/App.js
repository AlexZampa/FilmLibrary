import './App.css';
import { Film } from './filmLibrary'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Slide } from "react-toastify";
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
    }
  };

  // update film
  const updateFilm = (film, inlineEdit, filter) => {
    setFilms(oldFilms => {
      return oldFilms.map(f => {
        if (film.id === f.id) {
          const newFilm = new Film(film.id, film.title, film.favorite, film.watchDate, film.rating);
          newFilm.status = 'edited';
          return newFilm;
        }
        else
          return f;
      });
    });
    
    if(inlineEdit){ 
      API.updateFavorite(film).then(() => {
        getFilm(filter);
      }).catch((err) => { toast.error(err.message); });
    }
    else{ 
      API.updateFilm(film).then(() => {
        toast.success("Film updated!");
      }).catch((err) => { toast.error(err.message); }); 
    }
  };

  // delete film
  const deleteFilm = (filmID, filterid) => {
    setFilms((oldFilms) => {
      return oldFilms.map(f => {
        if (f.id === filmID)
          return { ...f, status: 'deleted' };
        else
          return f;
      })
    });
    API.deleteFilm(filmID).then(() => {
      getFilm(filterid);
      toast.success("Film deleted!");
    }).catch((err) => { toast.error(err.message); });
  };

  // add film
  const addFilm = (film) => {
    film.status = 'added';
    setFilms((oldFilms) => [...oldFilms, film]);
    API.addFilm(film).then(() => {
      toast.success("Film added!");
    }).catch((err) => { toast.error(err.message); });
  };

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="light" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover={false} limit={3} transition={Slide}/>
        <Routes>
          <Route path='/' element={<FilmRoute/>} >
            <Route index element={<FilmPage getFilm={getFilm} setFilms={setFilms} films={films} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} />} />
          </Route>
          <Route path='*' element={<DefaultRoute />} />
          <Route path="/add" element={<EditRoute films={films} addFilm={addFilm} updateFilm={updateFilm} back={back}/>} />
          <Route path="/edit" element={<EditRoute updateFilm={updateFilm} addFilm={addFilm} back={back} />} />
          <Route path='/filter' element={<FilmRoute/>}>
            <Route index element={<h2>Please, specify a filter</h2>} />
            <Route path=':filterid' element={<FilmPage getFilm={getFilm} films={films} setFilms={setFilms} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
