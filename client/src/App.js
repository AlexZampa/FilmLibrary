import './App.css';
import { Film } from './filmLibrary'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DefaultRoute, FilmRoute, EditRoute, FilmPage, LoginRoute } from './components/filmRoutes';
import { useState, useEffect } from 'react';
import API from './API';


function App() {
  const [films, setFilms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [back, setBack] = useState("/");
  const[show, setShow] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.getUserInfo();
        setLoggedIn(true);
        setShow(true);
      } catch (err) {
        setLoggedIn(false);
        setShow(true);
      }
    };
    checkAuth();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn)
      getFilm();
  }, [loggedIn]);

  const getFilm = async (filterid) => {
    if (filterid) {
      try {
        const films = await API.getFilterFilms(filterid);
        setFilms(films);
      } catch (err) {
        if (err.err === 401)
          setLoggedIn(false);
      }
    }
    else {
      try {
        const films = await API.getAllFilms();
        setFilms(films);
      } catch (err) {
        if (err.err === 401)
          setLoggedIn(false);
      }
    }
  };

  // update film
  const updateFilm = async (film, filter, editType) => {
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

    switch (editType) {
      case 'favorite':
        try {
          await API.updateFavorite(film);
          await getFilm(filter);
        } catch (err) {
          getFilm(filter);
          toast.error('update failed');
        }
        break;
      case 'rating':
        try {
          await API.updateFilm(film);
          await getFilm(filter);
        } catch (err) {
          toast.error('update failed');
        }
        break;
      default:
        try {
          await API.updateFilm(film);
          toast.success("Film updated!");
        } catch (err) {
          toast.error('update failed');
        }
    }
  };


  // delete film
  const deleteFilm = (filmID, filterid) => {
    API.deleteFilm(filmID).then(() => {

      getFilm(filterid);
      setFilms((oldFilms) => {
        return oldFilms.map(f => {
          if (f.id === filmID)
            return { ...f, status: 'deleted' };
          else
            return f;
        })
      });
      toast.success("Film deleted!");
    }).catch((err) => { toast.error('Impossible to delete'); });
  };

  // add film
  const addFilm = (film) => {
    film.status = 'added';
    API.addFilm(film).then(() => {
      setFilms((oldFilms) => [...oldFilms, film]);
      toast.success("Film added!");
    }).catch((err) => {
      if (err.message)
        toast.error(err.message);
      else {
        toast.error('Generic Error');
      }
    });
  };

  // Login
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      toast.success(`Welcome, ${user.name}!`, { position: "top-center" });
    } catch (err) {
      toast.error(err, { position: "top-center" });
    }
  };

  // login
  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setFilms([]);
  };

  return (
    show &&
    <BrowserRouter>
      <ToastContainer position="top-right" theme="light" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover={false} limit={3} transition={Slide} />
      <Routes>
        <Route path='/login' element={
          loggedIn ? <Navigate replace to='/' /> : <LoginRoute login={handleLogin} />
        } />
        <Route path='/' element={<FilmRoute logout={handleLogout} />} >

          <Route index element={
            loggedIn ? <FilmPage getFilm={getFilm} setFilms={setFilms} films={films} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} /> : <Navigate replace to='/login' />} />
        </Route>

        <Route path='*' element={<DefaultRoute />} />

        <Route path="/add" element={
          loggedIn ? <EditRoute films={films} addFilm={addFilm} updateFilm={updateFilm} back={back} logut={handleLogout} /> : <Navigate replace to='/login' />} />

        <Route path="/edit" element={
          loggedIn ? <EditRoute updateFilm={updateFilm} addFilm={addFilm} back={back} logout={handleLogout} /> : <Navigate replace to='/login' />} />
        <Route path='/filter' element={
          loggedIn ? <FilmRoute logout={handleLogout} /> : <Navigate replace to='/login' />}>
          <Route index element={<h2>Please, specify a filter</h2>} />
          <Route path=':filterid' element={<FilmPage getFilm={getFilm} films={films} setFilms={setFilms} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
